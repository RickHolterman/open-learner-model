import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { SORT_TYPE, SORT_METHOD } from '../utils/sorting';
import { isEmpty } from '@ember/utils';
import { v4 as uuid } from 'uuid';
import { SERVICE_TYPES } from '../utils/service-types';
import { KNOWLEDGE_COMPONENTS } from '../utils/knowledge-components';
import HISTORIC_DATA_LOW_SCORING_PRELOADED from '../temp/historic-data-low-scoring-preloaded';
import HISTORIC_DATA_MEDIUM_SCORING_PRELOADED from '../temp/historic-data-medium-scoring-preloaded';
import HISTORIC_DATA_HIGH_SCORING_PRELOADED from '../temp/historic-data-high-scoring-preloaded';
import { RULES, RULE_NAMES } from '../utils/rules';

const DEFAULT_SORT_TYPE = SORT_TYPE.ALPHABETICAL;
const DEFAULT_PERSONAL_PROGRESS_ACTIVE = true;
const DEFAULT_GROUP_PROGRESS_ACTIVE = false;
const DEFAULT_BUGGY_ANSWERS_ACTIVE = false;
const DEFAULT_TOPIC_EXPOSURE_ACTIVE = false;
const DEFAULT_SIDE_PANEL_DETAILS_OPEN = ['progress'];
const DEFAULT_USER_ID = 'medium-scoring';

export default class IndexController extends Controller {
  @tracked data = null;
  @tracked startDate = null;
  @tracked endDate = null;
  @tracked dates = null;
  @tracked selectedDateIndex = 1000;
  @tracked maxSelectedDateIndex = null;
  @tracked isSidePanelActive = false;
  @tracked activeId = null;
  @tracked activeTitle = null;
  @tracked isFiltersActive = false;
  @tracked userId = DEFAULT_USER_ID;
  @tracked selectedSortType = DEFAULT_SORT_TYPE;
  @tracked isPersonalProgressActive = DEFAULT_PERSONAL_PROGRESS_ACTIVE;
  @tracked isGroupProgressActive = DEFAULT_GROUP_PROGRESS_ACTIVE;
  @tracked isBuggyAnswersActive = DEFAULT_BUGGY_ANSWERS_ACTIVE;
  @tracked isTopicExposureActive = DEFAULT_TOPIC_EXPOSURE_ACTIVE;
  @tracked sidePanelDetailsOpen = DEFAULT_SIDE_PANEL_DETAILS_OPEN;

  get selectedSortMethod() {
    return SORT_METHOD[this.selectedSortType];
  }

  get historicData() {
    switch (this.userId) {
      case 'low-scoring':
        return HISTORIC_DATA_LOW_SCORING_PRELOADED;
      case 'medium-scoring':
        return HISTORIC_DATA_MEDIUM_SCORING_PRELOADED;
      case 'high-scoring':
        return HISTORIC_DATA_HIGH_SCORING_PRELOADED;
      default:
        return null;
    }
  }

  get interactions() {
    let interactions = this.model.interactions;

    // TODO: The following code is used to mock interaction dates, and should be removed in a production environment.
    let startTime = null;
    let user = null;
    let time = null;

    let inverseInteractions = [...interactions].reverse();
    let interactionsWithMockedDates = inverseInteractions.map((interaction) => {
      if (startTime === null) {
        startTime = new Date();
        startTime.setHours(12, 0, 0, 0);
      }

      if (user === null) {
        user = interaction.userid;
      }

      if (interaction.userid !== user) {
        startTime = new Date();
        startTime.setHours(12, 0, 0, 0);
        time = startTime;
        user = interaction.userid;
      }

      if (time === null) {
        time = startTime;
      } else {
        time = subtractHours(time, 6);
      }

      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let hours = time.getHours();
      let minutes = time.getMinutes();
      let seconds = time.getSeconds();
      let milliseconds = time.getMilliseconds();
      let timeParsed = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

      interaction.time = timeParsed;

      return interaction;
    });

    interactions = interactionsWithMockedDates.reverse();

    function subtractHours(date, hours) {
      date.setHours(date.getHours() - hours);

      return date;
    }
    // End of interactions dates mock.

    return interactions;
  }

  @action onResetTimelineClick() {
    this.selectedDateIndex = this.maxSelectedDateIndex;
    this.data = this.historicData[this.selectedDateIndex];
  }

  @action handleProgressSliderInput(e) {
    this.selectedDateIndex = e.target.value;
    this.data = this.historicData[this.selectedDateIndex];
  }

  @action drawHistoricalData(canvas) {
    const ctx = canvas.getContext('2d');
    const offsetY = 18;
    const canvasContainer = document.querySelector(
      '#js-historic-progress-section'
    );
    const dataPoints = document.querySelectorAll('.js-data-point');
    const canvasWidth = Math.min(canvasContainer.clientWidth - 96, 1120);

    canvas.width = canvasWidth;

    ctx.beginPath();
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 3;

    dataPoints.forEach((point) => {
      const x = point.parentElement.offsetLeft;
      const y = point.offsetTop + offsetY;

      ctx.lineTo(x, y);
    });

    ctx.stroke();
  }

  // @action handleProgressSliderChange(e) {
  //   this.data = HISTORIC_DATA_PRELOADED[this.selectedDateIndex];
  // }

  get selectedDate() {
    return this.dates[this.selectedDateIndex].split(' ')[0];
  }

  get isShowingHistoricData() {
    return parseInt(this.selectedDateIndex) !== this.dates.length - 1;
  }

  @action
  async setupPage() {
    this.startDate = this.interactions.find(
      (item) => item.userid === this.userId
    ).time;
    this.endDate = this.interactions.findLast(
      (item) => item.userid === this.userId
    ).time;

    this.dates = await [
      ...new Set(
        this.interactions
          .filter((item) => item.userid === this.userId)
          .map((item) => {
            return item.time.split(' ')[0];
          })
      ),
    ];

    if (
      isEmpty(this.selectedDateIndex) === true ||
      this.selectedDateIndex >= this.dates.length
    ) {
      this.selectedDateIndex = this.dates.length - 1;
    }

    this.maxSelectedDateIndex = this.dates.length - 1;

    this.data = this.historicData[this.selectedDateIndex];

    // this.data = await this.wrangleData(null, {
    //   // date: new Date(),
    //   date: this.dates[this.selectedDateIndex],
    // });

    // TODO: Remove this function for wrangling historic data.
    // let historicData = this.dates.map((date, index) => {
    //   return this.wrangleData(null, { date });
    // });

    // console.log(historicData);
  }

  formatDate = (date) => {
    if (isEmpty(date) === true) {
      return '';
    }

    let ymd = date.split('-');

    return `${ymd[2]}-${ymd[1]}-${ymd[0]}`;
  };

  mod = (whole, part) => whole % part;

  @action
  wrangleData(element, options) {
    if (isEmpty(this.model) === true) {
      return null;
    }

    const INTERACTIONS_CAP = 5;

    let interactions = this.interactions;

    let groupData = this.model.students.map((student) => {
      let userId = student.userid;

      let knowledgeComponents = KNOWLEDGE_COMPONENTS.map(
        (knowledgeComponent) => {
          let cappedDiagnoseInteractions = queryInteractions({
            interactions,
            length: 5,
            timestamp:
              isEmpty(options.date) === true
                ? new Date()
                : new Date(options.date),
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

            let ruleId = interaction.input?.rule;

            if (isEmpty(ruleId) === true) {
              ruleId = interaction.ruleid;
            }

            let ruleKey = null;

            Object.entries(RULES).forEach(([key, ruleIds]) => {
              if (ruleIds.includes(ruleId)) {
                ruleKey = key;
              }
            });

            let rule = RULE_NAMES[ruleKey];

            return {
              initialFormula: formatLogicalFormula(initialFormula),
              providedAnswer: formatLogicalFormula(providedAnswer),
              expectedAnswer: formatLogicalFormula(expectedAnswer),
              rule,
            };
          });

          return {
            id: uuid(),
            userId,
            title: knowledgeComponent.title,
            description: knowledgeComponent.description,
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

    let currentUserTotalLevel = calculatePersonalTotal(currentUserLearnerData);

    return {
      learnerData: {
        grid: {
          topics: combinedData,
        },
        currentUserTotalLevel,
      },
      interactions: null,
    };
  }

  queryParams = [
    {
      selectedSortType: 'sort',
      isPersonalProgressActive: 'personal-progress',
      isGroupProgressActive: 'group-progress',
      isBuggyAnswersActive: 'buggy-answers',
      isTopicExposureActive: 'topic-exposure',
      userId: 'user-id',
      selectedDateIndex: 'history',
    },
  ];

  @action
  openSidePanel(id, title, progressType) {
    this.activeId = id;
    this.activeTitle = title;
    this.isSidePanelActive = true;
    this.updateSidePanelDetailsOpen(progressType);
  }

  @action
  updateSidePanelDetailsOpen(progressType) {
    if (progressType === 'personal' || progressType === 'group') {
      const detailElements = document.querySelectorAll('details');
      this.sidePanelDetailsOpen = [];

      if (detailElements?.length >= 1) {
        detailElements.forEach((detailElement) => {
          if (detailElement.open === true) {
            this.sidePanelDetailsOpen.push(detailElement.dataset.sectionType);
          }
        });
      }

      if (this.sidePanelDetailsOpen.includes('improvement-details')) {
        this.sidePanelDetailsOpen = ['progress', 'improvement-details'];
      } else {
        this.sidePanelDetailsOpen = ['progress'];
      }
    } else if (progressType === 'mistakes') {
      this.sidePanelDetailsOpen = ['mistakes'];
    }
  }

  @action
  closeSidePanel(id) {
    // this.activeId = null;
    this.isSidePanelActive = false;
  }

  @action
  toggleFiltersIsActive() {
    this.isFiltersActive = !this.isFiltersActive;
  }

  @action
  changeSortOptions(selectedOption) {
    this.selectedSortType = selectedOption;
  }

  @action
  resetFilters() {
    this.selectedSortType = DEFAULT_SORT_TYPE;
    this.isPersonalProgressActive = DEFAULT_PERSONAL_PROGRESS_ACTIVE;
    this.isGroupProgressActive = DEFAULT_GROUP_PROGRESS_ACTIVE;
    this.isBuggyAnswersActive = DEFAULT_BUGGY_ANSWERS_ACTIVE;
    this.isTopicExposureActive = DEFAULT_TOPIC_EXPOSURE_ACTIVE;
  }

  @action
  togglePersonalProgressActive() {
    this.isPersonalProgressActive = !this.isPersonalProgressActive;
  }

  @action
  toggleGroupProgressActive() {
    this.isGroupProgressActive = !this.isGroupProgressActive;
  }

  @action
  toggleBuggyAnswersActive() {
    this.isBuggyAnswersActive = !this.isBuggyAnswersActive;
  }

  @action
  toggleTopicExposureActive() {
    this.isTopicExposureActive = !this.isTopicExposureActive;
  }

  get hasActiveFilters() {
    return (
      this.selectedSortType !== DEFAULT_SORT_TYPE ||
      this.isPersonalProgressActive !== DEFAULT_PERSONAL_PROGRESS_ACTIVE ||
      this.isGroupProgressActive !== DEFAULT_GROUP_PROGRESS_ACTIVE ||
      this.isBuggyAnswersActive !== DEFAULT_BUGGY_ANSWERS_ACTIVE ||
      this.isTopicExposureActive !== DEFAULT_TOPIC_EXPOSURE_ACTIVE
    );
  }

  get activeKnowledgeComponent() {
    return this.data.learnerData.grid.topics.find((topic) => {
      return topic.title === this.activeTitle;
    });
  }

  get isSidePanelOpen() {
    return this.activeId !== null;
  }

  get topics() {
    return this.data.learnerData.grid.topics.sort(this.selectedSortMethod);
  }
}

// Utilities.
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

let calculatePersonalTotal = function (currentUserLearnerData) {
  let progressLevels = currentUserLearnerData.map((knowledgeComponent) => {
    return knowledgeComponent.progress.personal.totalLevel;
  });

  return Math.round(
    progressLevels.reduce((sum, part) => sum + part, 0) /
      currentUserLearnerData.length
  );
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

let calculateTotalKnowledgeLevel = function (parts, multiplier) {
  let sum = parts.reduce((sum, current) => sum + current, 0);
  let median = sum / parts.length;
  let multiplicationFactor = multiplier / 100;
  let total = median * multiplicationFactor;

  return Math.round(total);
};

let percentage = function (part, whole) {
  if (part <= 0 || whole <= 0) {
    return 0;
  }

  return Math.round((100 / whole) * part);
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
      .sort((a, b) => b.timeParsed - a.timeParsed)
      // Apply filter by timestamp.
      .filter((item) => {
        return item.timeParsed <= timestamp;
      })
      // Apply filter by min. timestamp.
      .filter((item) =>
        minTimestamp !== null ? item.timeParsed >= minTimestamp : true
      )
      // Apply filter by max. timestamp.
      .filter((item) =>
        maxTimestamp !== null ? item.timeParsed <= maxTimestamp : true
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
        return plusOneLast[plusOneLast.length - 1].timeParsed;
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

let formatLogicalFormula = function (formula) {
  if (typeof formula === 'object') {
    return 'Object type';
  }

  return formula?.replace(/([∨∧→↔])/g, ' $1 ');
};
