import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import { v4 as uuid } from 'uuid';
import { SERVICE_TYPES } from '../utils/service-types';
import { DIAGNOSE_TYPES } from '../utils/diagnose-types';
import { KNOWLEDGE_COMPONENTS } from '../utils/knowledge-components';
import { RULES } from '../utils/rules';

let calculateTotalKnowledgeLevel = function (parts, multiplier) {
  let sum = parts.reduce((sum, current) => sum + current, 0);
  let median = sum / parts.length;
  let multiplicationFactor = multiplier / 100;
  let total = median * multiplicationFactor;

  return total;
};

let percentage = function (part, whole) {
  if (part <= 0 || whole <= 0) {
    return 0;
  }

  return (100 / whole) * part;
};

let queryInteractions = function ({
  interactions,
  length = 5,
  timestamp = new Date(),
  maxTimestamp = null,
  minTimestamp = null,
  services = Object.values(SERVICE_TYPES),
  userId = null,
  rules = null,
}) {
  return (
    [...interactions]
      // Sort by date descending.
      .sort((a, b) => b.time - a.time)
      // Apply filter by timestamp.
      .filter((item) => item.time <= timestamp)
      // Apply filter by min. timestamp.
      .filter((item) =>
        minTimestamp !== null ? item.time >= minTimestamp : true
      )
      // Apply filter by max. timestamp.
      .filter((item) =>
        maxTimestamp !== null ? item.time <= maxTimestamp : true
      )
      // Apply filter by service types.
      .filter((item) => services.includes(item.service))
      // Apply filter by interaction types.
      .filter((interaction) =>
        rules !== null
          ? rules.includes(interaction.ruleid) ||
            rules.includes(interaction.input?.rule)
          : true
      )
      // Apply filter by user id.
      .filter((interaction) =>
        userId !== null ? interaction.userid === userId : false
      )
      // Crop off items if exceeding length.
      .filter((item, index) => index < length)
  );
};

let queryRelatedInteractions = function ({
  diagnoseInteractions,
  allInteractions,
  relatedRules,
  userId,
}) {
  let plusOneLast = queryInteractions({
    interactions: allInteractions,
    length:
      diagnoseInteractions.length > 0 ? diagnoseInteractions.length + 1 : 0,
    services: [SERVICE_TYPES.DIAGNOSE],
    rules: (() => {
      let rules = null;

      Object.values(RULES).forEach((ruleIds) => {
        if (ruleIds.includes(relatedRules?.[0])) {
          rules = ruleIds;
        }
      });

      return rules;
    })(),
    userId,
  });

  let interactions = queryInteractions({
    interactions: allInteractions,
    services: [
      SERVICE_TYPES.HINT,
      SERVICE_TYPES.DERIVATION,
      SERVICE_TYPES.DIAGNOSE,
    ],
    length: (() => {
      if (diagnoseInteractions.length > 0) {
        return plusOneLast.length > 0 ? 100 : 0;
      }

      return 100;
    })(),
    minTimestamp: (() => {
      if (diagnoseInteractions.length > 0) {
        return plusOneLast[plusOneLast.length - 1].time;
      }

      return null;
    })(),
    rules: (() => {
      let rules = null;

      Object.values(RULES).forEach((ruleIds) => {
        if (ruleIds.includes(relatedRules?.[0])) {
          rules = ruleIds;
        }
      });

      return rules;
    })(),
    userId,
  });

  return interactions;
};

let queryExpectedAnswer = function (
  buggyInteraction,
  allInteractions,
  userId,
  initialFormula
) {
  let expectedInteraction = allInteractions.find((interaction) => {
    let isExpected = false;

    if (typeof buggyInteraction.input?.context?.term === 'object') {
      isExpected =
        interaction.userid === userId &&
        interaction.input?.context?.term.length ===
          buggyInteraction.input?.context?.term.length &&
        interaction.input?.state?.prefix ===
          buggyInteraction.input?.state?.prefix &&
        interaction.input.state?.session ===
          buggyInteraction.input?.state?.session &&
        (interaction.output?.diagnose?.diagnosetype === 'expected' ||
          interaction.output?.diagnose?.diagnosetype === 'similar');
    } else {
      isExpected =
        interaction.userid === userId &&
        interaction.input?.state?.prefix ===
          buggyInteraction.input?.state?.prefix &&
        interaction.input?.state?.session ===
          buggyInteraction.input?.state?.session &&
        interaction.output?.diagnose?.state?.context?.term !==
          formatLogicalFormula(initialFormula) &&
        (interaction.output?.diagnose?.diagnosetype === 'expected' ||
          interaction.output?.diagnose?.diagnosetype === 'similar' ||
          interaction.service === 'onefirst');
    }

    return isExpected;
  });

  let expectedAnswer =
    expectedInteraction?.service === 'onefirst'
      ? expectedInteraction?.output?.onefirst?.first?.state?.context?.term
      : expectedInteraction?.output?.diagnose?.state?.context?.term;

  return expectedAnswer;
};

let filterBuggyAnsers = function (interactions) {
  return interactions.filter((interaction) => {
    return didProvideBuggyAnswer(interaction) === true;
  });
};

let calculateRequestedHintsAmount = function (interactions) {
  let numberOfrequestedHintsAmount = interactions.filter((interaction) => {
    return didRequestHint(interaction) === true;
  }).length;

  return numberOfrequestedHintsAmount;
};

let didProvideBuggyAnswer = function (interaction) {
  if (interaction === null) {
    return false;
  }

  if (isEmpty(interaction.output?.diagnose?.diagnosetype) === false) {
    return (
      (interaction.service === 'diagnose' &&
        interaction.output?.diagnose?.diagnosetype === 'buggy') ||
      interaction.output?.diagnose?.diagnosetype === 'notequiv'
      // || interaction.output.diagnose.diagnosetype === 'wrongrule'
    );
  }

  return false;
};

let didRequestHint = function (interaction) {
  if (interaction === null) {
    return false;
  }

  return interaction.service === 'onefirst';
};

let countInteractions = function ({ interactions, services }) {
  return [...interactions]
    .filter((interaction) => interaction !== null)
    .filter((interaction) => services.includes(interaction.service)).length;
};

let retrieveCurrentUserId = function () {
  const urlParams = new URLSearchParams(window.location.search);

  return urlParams.get('user-id');
};

export default class IndexRoute extends Route {
  @service store;

  async model() {
    const INTERACTIONS_CAP = 5;

    let interactions = await this.store.findAll('interaction');
    let students = await this.store.findAll('student');

    let groupData = students.map((student) => {
      let userId = student.userid;

      let knowledgeComponents = KNOWLEDGE_COMPONENTS.map(
        (knowledgeComponent) => {
          let now = new Date();
          let cappedDiagnoseInteractions = queryInteractions({
            interactions,
            length: 5,
            timestamp: now,
            services: [SERVICE_TYPES.DIAGNOSE],
            rules: knowledgeComponent.rules,
            userId,
          });
          let buggyAnswers = filterBuggyAnsers(cappedDiagnoseInteractions);

          // Calculate amounts.
          let totalDiagnoseInteractions = countInteractions({
            interactions: cappedDiagnoseInteractions,
            services: [SERVICE_TYPES.DIAGNOSE],
          });
          let relatedInteractions = queryRelatedInteractions({
            relatedRules: knowledgeComponent.rules,
            diagnoseInteractions: cappedDiagnoseInteractions,
            allInteractions: interactions,
            userId,
          });
          let buggyAnswersAmount = buggyAnswers.length;
          let answeringCorrectlyAmount =
            cappedDiagnoseInteractions.length - buggyAnswersAmount;
          let requestedHintsAmount =
            calculateRequestedHintsAmount(relatedInteractions);

          // Calculate percentages.
          let answeringCorrectlyLevel = percentage(
            answeringCorrectlyAmount,
            totalDiagnoseInteractions
          );
          let requestedHintsLevel = percentage(
            totalDiagnoseInteractions - requestedHintsAmount,
            totalDiagnoseInteractions
          );
          let practicingLevel = percentage(
            totalDiagnoseInteractions,
            INTERACTIONS_CAP
          );
          let totalLevel = calculateTotalKnowledgeLevel(
            [answeringCorrectlyLevel, requestedHintsLevel],
            practicingLevel
          );

          // Previous mistakes.
          let errors = buggyAnswers.map((interaction) => {
            let initialFormula = interaction.input?.state?.context?.term;

            if (typeof initialFormula === 'object') {
              let oldGapPosition = interaction.input?.state?.context?.term
                ?.map((term) => term.motivation)
                .indexOf('<GAP>');

              let newGapPosition = interaction.input?.context?.term
                ?.map((term) => term.motivation)
                .indexOf('<GAP>');

              let isTopDownAnswer = newGapPosition > oldGapPosition;

              initialFormula =
                initialFormula[
                  isTopDownAnswer === false
                    ? oldGapPosition + 1
                    : oldGapPosition - 1
                ];
            }

            let providedAnswer = interaction.input?.context?.term;

            if (typeof providedAnswer === 'object') {
              let oldGapPosition = interaction.input?.state?.context?.term
                ?.map((term) => term.motivation)
                .indexOf('<GAP>');

              let newGapPosition = interaction.input?.context?.term
                ?.map((term) => term.motivation)
                .indexOf('<GAP>');

              let isTopDownAnswer = newGapPosition > oldGapPosition;

              providedAnswer =
                providedAnswer[
                  isTopDownAnswer === false
                    ? newGapPosition + 1
                    : newGapPosition - 1
                ];
            }

            let expectedAnswer = queryExpectedAnswer(
              interaction,
              interactions,
              userId,
              initialFormula
            );

            if (typeof expectedAnswer === 'object') {
              let oldGapPosition = interaction.input?.state?.context?.term
                ?.map((term) => term.motivation)
                .indexOf('<GAP>');

              let newGapPosition = interaction.input?.context?.term
                ?.map((term) => term.motivation)
                .indexOf('<GAP>');

              let isTopDownAnswer = newGapPosition > oldGapPosition;

              expectedAnswer =
                expectedAnswer[
                  isTopDownAnswer === false
                    ? newGapPosition + 1
                    : newGapPosition - 1
                ];
            }

            return {
              initialFormula: formatLogicalFormula(initialFormula),
              providedAnswer: formatLogicalFormula(providedAnswer),
              expectedAnswer: formatLogicalFormula(expectedAnswer),
            };
          });

          return {
            id: uuid(),
            userId,
            title: knowledgeComponent.title,
            progress: {
              personal: {
                // Knowledge level percentages.
                answeringCorrectlyLevel,
                requestedHintsLevel,
                practicingLevel,
                totalLevel,
                // Amounts of interactions.
                answeringCorrectlyAmount,
                buggyAnswersAmount,
                requestedHintsAmount,
              },
              totalDiagnoseInteractions,
            },
            interactionsCap: INTERACTIONS_CAP,
            errors,
          };
        }
      );

      return {
        userId,
        knowledgeComponents,
      };
    });

    let currentUserId = retrieveCurrentUserId();
    let currentUserLearnerData = groupData.find(
      (learnerData) => learnerData.userId === currentUserId
    )?.knowledgeComponents;
    let combinedData = currentUserLearnerData;
    combinedData.map((knowledgeComponent) => {
      knowledgeComponent.progress = {
        ...knowledgeComponent.progress,
        group: {
          totalLevel: calculateGroupAverage(
            knowledgeComponent.title,
            groupData
          ),
        },
      };

      return knowledgeComponent;
    });

    return {
      learnerData: { grid: { topics: combinedData } },
      interactions: null,
    };
  }
}

let calculateGroupAverage = function (knowledgeComponentTitle, groupData) {
  let progressLevels = groupData.map((learnerData) => {
    return learnerData.knowledgeComponents.find((knowledgeComponent) => {
      return knowledgeComponent.title === knowledgeComponentTitle;
    })?.progress.personal.totalLevel;
  });

  return Math.round(
    progressLevels.reduce((sum, part) => sum + part, 0) / groupData.length
  );
};

let formatLogicalFormula = function (formula) {
  if (typeof formula === 'object') {
    return 'Object type';
  }

  return formula?.replace(/([∨∧→↔])/g, ' $1 ');
};
