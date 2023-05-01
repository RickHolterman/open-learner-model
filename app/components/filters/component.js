import Component from '@glimmer/component';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { SORT_TYPE } from '../../utils/sorting';

export default class FiltersComponent extends Component {
  get selectedSortOption() {
    let selectedSortType =
      isEmpty(this.args.selectedSortType) === true
        ? null
        : this.args.selectedSortType;

    return this.sortOptions.find((item) => item.value === selectedSortType);
  }

  @action
  toggleIsActive() {
    if (isEmpty(this.args.toggleIsActive) === true) {
      return;
    }

    this.args.toggleIsActive();
  }

  @action
  onSelectFilter(selectedOption) {
    if (isEmpty(this.args.changeSortOptions) === true) {
      return;
    }

    return this.args.changeSortOptions(selectedOption);
  }

  @action
  onResetClick() {
    if (isEmpty(this.args.reset) === true) {
      return;
    }

    return this.args.reset();
  }

  @action
  togglePersonalProgressActive() {
    if (isEmpty(this.args.togglePersonalProgressActive) === true) {
      return;
    }

    return this.args.togglePersonalProgressActive();
  }

  @action
  toggleGroupProgressActive() {
    if (isEmpty(this.args.toggleGroupProgressActive) === true) {
      return;
    }

    return this.args.toggleGroupProgressActive();
  }

  @action
  toggleBuggyAnswersActive() {
    if (isEmpty(this.args.toggleBuggyAnswersActive) === true) {
      return;
    }

    return this.args.toggleBuggyAnswersActive();
  }

  sortOptions = [
    { value: SORT_TYPE.PERSONAL_ASC, label: 'Personal progress - ascending' },
    { value: SORT_TYPE.PERSONAL_DESC, label: 'Personal progress - descending' },
    { value: SORT_TYPE.GROUP_ASC, label: 'Class average - ascending' },
    { value: SORT_TYPE.GROUP_DESC, label: 'Class average - descending' },
    { value: SORT_TYPE.ALPHABETICAL, label: 'Alphabetical' },
  ];
}
