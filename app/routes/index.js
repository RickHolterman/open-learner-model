import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import { v4 as uuid } from 'uuid';
import { RULES } from '../utils/rules';
import { SERVICE_TYPES } from '../utils/service-types';
import { DIAGNOSE_TYPES } from '../utils/diagnose-types';

let calculateKnowledgeLevel = function (interactions) {
  let numberOfCorrectAnswers = interactions.filter((interaction) => {
    return didProvideCorrectAnswer(interaction) === true;
  }).length;

  return (100 / interactions.length) * numberOfCorrectAnswers;
};

let getLatestXInteractionsAtDate = function ({
  interactions,
  numberOfInteractions = 5,
  timestamp,
  service = ['diagnose', 'onefirst'],
}) {
  let serviceFilteredInteractions = interactions.filter((item) => {
    return service.includes(item.service);
  });

  let latestMaxXInteractionsAtDate = serviceFilteredInteractions.filter(
    (item, index) => {
      if (index >= numberOfInteractions) {
        return false;
      }

      return item.time <= timestamp;
    }
  );

  let latestXInteractionsAtDate = Array.from(
    Array(numberOfInteractions),
    (item, index) => {
      return latestMaxXInteractionsAtDate[index];
    }
  ).fill(null, latestMaxXInteractionsAtDate.length, numberOfInteractions);

  return latestXInteractionsAtDate;
};

let calculateBuggyAnswers = function (interactions) {
  let numberOfBuggyAnswers = interactions.filter((interaction) => {
    return didProvideBuggyAnswer(interaction) === true;
  }).length;

  return numberOfBuggyAnswers;
};

let calculateRequestedHints = function (interactions) {
  let numberOfRequestedHints = interactions.filter((interaction) => {
    return this.didRequestHint(interaction) === true;
  }).length;

  return numberOfRequestedHints;
};

let didProvideCorrectAnswer = function (interaction) {
  if (interaction === null) {
    return false;
  }

  if (isEmpty(interaction.output?.diagnose?.diagnosetype) === false) {
    return (
      interaction.service === 'diagnose' &&
      interaction.output.diagnose.diagnosetype === 'expected'
    );
  }

  return false;
};

let didProvideBuggyAnswer = function (interaction) {
  if (interaction === null) {
    return false;
  }

  if (isEmpty(interaction.output?.diagnose?.diagnosetype) === false) {
    return (
      interaction.service === 'diagnose' &&
      interaction.output.diagnose.diagnosetype === 'buggy'
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

const KNOWLEDGE_COMPONENTS = {
  ['Associativity']: RULES.ASSOCIATIVITY,
  ['Absorption']: RULES.ABSORPTION,
  ['Commutativity']: RULES.COMMUTATIVITY,
  ['De Morgan']: RULES.DE_MORGAN,
  ['Distribution']: RULES.DISTRIBUTION,
  ['Double Negation']: RULES.DOUBLE_NEGATION,
  ['Equivalence definition']: RULES.EQUIVALENCE_DEFINITION,
  ['F-rule complement']: RULES.F_RULE_COMPLEMENT,
  ['F-rule conjunction']: RULES.F_RULE_CONJUNCTION,
  ['F-rule disjunction']: RULES.F_RULE_DISJUNCTION,
  ['F-rule not T']: RULES.F_RULE_NOT_T,
  ['Idempotency']: RULES.IDEMPOTENCY,
  ['Implication definition']: RULES.IMPLICATION_DEFINITION,
  ['T-rule complement']: RULES.T_RULE_COMPLEMENT,
  ['T-rule conjunction']: RULES.T_RULE_CONJUNCTION,
  ['T-rule disjunction']: RULES.T_RULE_DISJUNCTION,
  ['T-rule not F']: RULES.T_RULE_NOT_F,
};

export default class IndexRoute extends Route {
  @service store;

  async model() {
    let interactions = await this.store.findAll('interaction');

    let interactionsPerKnowledgeComponent = Object.entries(
      KNOWLEDGE_COMPONENTS
    ).map(([knowledgeComponentName, knowledgeComponentIds]) => {
      return {
        [knowledgeComponentName]: interactions
          .filter((interaction) => {
            return knowledgeComponentIds.includes(interaction.ruleid);
          })
          .sort((a, b) => {
            return a.time < b.time;
          }),
      };
    });

    let learnerData = interactionsPerKnowledgeComponent.map((item) => {
      let title = Object.keys(item)[0];
      let personalInteractions = Object.values(item)[0];
      let now = new Date();
      let latestFivePersonalInteractionsAtDate = getLatestXInteractionsAtDate({
        interactions: personalInteractions,
        numberOfInteractions: 5,
        service: ['diagnose'],
        timestamp: now,
      });
      let totalDiagnoseInteractions =
        latestFivePersonalInteractionsAtDate.filter(
          (interaction) => interaction !== null
        ).length;

      console.log(latestFivePersonalInteractionsAtDate);

      return {
        id: uuid(),
        title,
        progress: {
          personal: calculateKnowledgeLevel(
            latestFivePersonalInteractionsAtDate
          ),
          group: 20,
          totalDiagnoseInteractions,
        },
        buggyAnswers: {
          personal: calculateBuggyAnswers(latestFivePersonalInteractionsAtDate),
        },
      };
    });

    return {
      learnerData: { grid: { topics: learnerData } },
      interactions: null,
    };
  }
}
