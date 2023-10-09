import Component from '@glimmer/component';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default class SidePanelComponent extends Component {
  get topic() {
    if (isEmpty(this.args.activeKnowledgeComponent) === true) {
      return null;
    }

    return this.args.activeKnowledgeComponent;
  }

  get answeringCorrectlyMessage() {
    if (isEmpty(this.topic) === true) {
      return '';
    }

    if (this.topic.progress.personal.practicingLevel === 0) {
      return `You haven't answered any ${this.topic.title} related questions yet. Provide correct answers in situations that require applying this rule to improve your score.`;
    }

    return `You provided the correct answer
      ${this.topic.progress.personal.answeringCorrectlyAmount}
      ${this.timesStringPluralized}
      out of your ${
        this.topic.progress.totalDiagnoseInteractions <
        this.topic.interactionsCap
          ? 'total of'
          : 'last'
      } ${this.topic.progress.totalDiagnoseInteractions} attempts to apply
      ${this.topic.title}.
      `;
  }

  get requestedHintsMessage() {
    if (isEmpty(this.topic) === true) {
      return '';
    }

    let message = '';

    if (
      this.topic.progress.totalDiagnoseInteractions === 0 &&
      this.topic.progress.personal.requestedHintsAmount > 0
    ) {
      message = `You used
        ${this.topic.progress.personal.requestedHintsAmount}
        ${this.hintsStringPluralized}
        when you needed to apply ${this.topic.title}. `;
    }
    if (
      this.topic.progress.totalDiagnoseInteractions > 0 &&
      this.topic.progress.personal.requestedHintsAmount > 0
    ) {
      message = `
        You used
        ${this.topic.progress.personal.requestedHintsAmount}
        ${this.hintsStringPluralized}
        during your
        ${
          this.topic.progress.totalDiagnoseInteractions <
          this.topic.interactionsCap
            ? ` total of ${this.topic.progress.totalDiagnoseInteractions}`
            : ` last ${this.topic.progress.totalDiagnoseInteractions} `
        }
        attempts to apply ${this.topic.title}. `;
    }
    if (
      this.topic.progress.totalDiagnoseInteractions > 0 &&
      this.topic.progress.personal.requestedHintsAmount === 0
    ) {
      message = `You haven't recently requested any hints in situations where you needed to apply
      ${this.topic.title}. `;
    }
    if (
      this.topic.progress.totalDiagnoseInteractions === 0 &&
      this.topic.progress.personal.requestedHintsAmount === 0
    ) {
      return `Try not using any hints in situations where you need to apply ${this.topic.title} to improve your score. Your score will update as you practice with ${this.topic.title} more. `;
    }

    if (
      this.topic.progress.personal.requestedHintsLevel === 100 &&
      this.topic.progress.totalDiagnoseInteractions >=
        this.topic.interactionsCap
    ) {
      message +=
        'Maintain your score by answering questions without using hints. ';
    }
    if (this.topic.progress.personal.requestedHintsLevel !== 100) {
      message += 'Use less hints to improve your score.';
    }

    return message;
  }

  get timesStringPluralized() {
    return `${pluralize(
      'time',
      this.topic.progress.personal.answeringCorrectlyAmount
    )}`;
  }

  get hintsStringPluralized() {
    return `${pluralize('hint', this.topic.progress.requestedHintsAmount)}`;
  }

  @action
  closeSidePanel() {
    if (isEmpty(this.args.closeSidePanel) === true) {
      return;
    }

    this.args.closeSidePanel();
  }

  calculateProgress = (options) => (options.part / options.whole) * 100;

  @action
  didUpdateDetailsOpen(element, [detailsOpen]) {
    const detailsElements = document.querySelectorAll('details');

    if (detailsElements?.length <= 0) {
      return;
    }

    this.openDetailsElement(detailsElements, detailsOpen);
  }

  @action
  openDetailsElement(detailElements, detailsOpen) {
    detailElements.forEach((detailElement) => {
      if (detailsOpen.includes(detailElement.dataset.sectionType)) {
        detailElement.open = true;
      } else {
        detailElement.removeAttribute('open');
      }
    });
  }
}

let pluralize = function (string, amount) {
  return amount === 0 || amount > 1 ? `${string}s` : string;
};
