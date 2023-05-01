import Component from '@glimmer/component';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default class SidePanelComponent extends Component {
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
      if (detailElement.dataset.sectionType === detailsOpen) {
        detailElement.open = true;
      } else {
        detailElement.removeAttribute('open');
      }
    });
  }
}
