import Component from '@glimmer/component';
import { action } from '@ember/object';
import { createPopper } from '@popperjs/core';
import { tracked } from '@glimmer/tracking';

const PROGRESS_TYPE = {
  PERSONAL: 'personal',
  GROUP: 'group',
  MISTAKES: 'mistakes',
};

const COLOR_MAPPING = {
  [PROGRESS_TYPE.PERSONAL]: 'green',
  [PROGRESS_TYPE.GROUP]: 'blue',
};

export default class GridComponent extends Component {
  @tracked
  popperInstances = null;

  @tracked
  activeId = null;

  @tracked
  activeIdSidePanel = null;

  @tracked
  activeProgressType = PROGRESS_TYPE.PERSONAL;

  get activeKnowledgeComponent() {
    return this.args.topics.find((topic) => {
      return topic.id === this.activeId;
    });
  }

  get activeColor() {
    return COLOR_MAPPING[this.activeProgressType];
  }

  @action
  handleCellClick(id, progressType) {
    if (this.args.isSidePanelOpen === true && id === this.activeIdSidePanel) {
      this.args.closeSidePanel(id);
    } else {
      this.activeIdSidePanel = id;
      this.args.openSidePanel(id, progressType);
    }
  }

  @action
  handleCellMouseEnter(id, progressType) {
    const popperInstance = this.findPopperInstanceById(`${id}-${progressType}`);
    const tooltip = document.querySelector('#tooltip');

    tooltip.setAttribute('data-show', '');
    tooltip.firstElementChild.classList.remove('opacity-0');
    popperInstance.update();

    this.activeProgressType = progressType;
    this.activeId = id;
  }

  @action
  handleCellMouseLeave(id, progressType) {
    const popperInstance = this.findPopperInstanceById(`${id}-${progressType}`);
    const tooltip = document.querySelector('#tooltip');

    tooltip.removeAttribute('data-show');
    tooltip.firstElementChild.classList.add('opacity-0');
    popperInstance.update();
  }

  @action
  setupTooltips() {
    const gridCells = document.querySelectorAll(
      '[data-component-name="grid-cell"]'
    );
    const tooltip = document.querySelector('#tooltip');

    const popperInstances = [...gridCells].map((gridCell) => {
      return {
        id: gridCell.id,
        popperInstance: createPopper(gridCell, tooltip, {
          placement: 'bottom',
        }),
      };
    });

    this.popperInstances = popperInstances;
  }

  @action
  findPopperInstanceById(id) {
    return this.popperInstances?.find((instance) => {
      return instance.id === id;
    })?.popperInstance;
  }

  calculateProgress = (options) => (options.part / options.whole) * 100;
}
