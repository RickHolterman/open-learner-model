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
}
