import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { SORT_TYPE, SORT_METHOD } from '../utils/sorting';

const DEFAULT_SORT_TYPE = SORT_TYPE.ALPHABETICAL;
const DEFAULT_PERSONAL_PROGRESS_ACTIVE = true;
const DEFAULT_GROUP_PROGRESS_ACTIVE = false;
const DEFAULT_BUGGY_ANSWERS_ACTIVE = false;
const DEFAULT_SIDE_PANEL_DETAILS_OPEN = 'progress';

export default class IndexController extends Controller {
  @tracked isSidePanelActive = false;
  @tracked activeId = null;
  @tracked isFiltersActive = false;
  @tracked selectedSortType = DEFAULT_SORT_TYPE;
  @tracked isPersonalProgressActive = DEFAULT_PERSONAL_PROGRESS_ACTIVE;
  @tracked isGroupProgressActive = DEFAULT_GROUP_PROGRESS_ACTIVE;
  @tracked isBuggyAnswersActive = DEFAULT_BUGGY_ANSWERS_ACTIVE;
  @tracked sidePanelDetailsOpen = DEFAULT_SIDE_PANEL_DETAILS_OPEN;

  get selectedSortMethod() {
    return SORT_METHOD[this.selectedSortType];
  }

  queryParams = [
    {
      selectedSortType: 'sort',
      isPersonalProgressActive: 'personal-progress',
      isGroupProgressActive: 'group-progress',
      isBuggyAnswersActive: 'buggy-answers',
    },
  ];

  @action
  openSidePanel(id, progressType) {
    this.activeId = id;
    this.isSidePanelActive = true;
    this.updateSidePanelDetailsOpen(progressType);
  }

  @action
  updateSidePanelDetailsOpen(progressType) {
    if (progressType === 'personal' || progressType === 'group') {
      this.sidePanelDetailsOpen = 'progress';
    } else if (progressType === 'mistakes') {
      this.sidePanelDetailsOpen = 'mistakes';
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

  get hasActiveFilters() {
    return (
      this.selectedSortType !== DEFAULT_SORT_TYPE ||
      this.isPersonalProgressActive !== DEFAULT_PERSONAL_PROGRESS_ACTIVE ||
      this.isGroupProgressActive !== DEFAULT_GROUP_PROGRESS_ACTIVE ||
      this.isBuggyAnswersActive !== DEFAULT_BUGGY_ANSWERS_ACTIVE
    );
  }

  get activeKnowledgeComponent() {
    return this.model.learnerData.grid.topics.find((topic) => {
      return topic.id === this.activeId;
    });
  }

  get isSidePanelOpen() {
    return this.activeId !== null;
  }

  get topics() {
    return this.model.learnerData.grid.topics.sort(this.selectedSortMethod);
  }
}
