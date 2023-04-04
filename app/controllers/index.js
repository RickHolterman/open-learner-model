import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { SORT_TYPE, SORT_METHOD } from '../utils/sorting';

const DEFAULT_SORT_TYPE = SORT_TYPE.ALPHABETICAL;
const DEFAULT_PERSONAL_PROGRESS_ACTIVE = true;
const DEFAULT_GROUP_PROGRESS_ACTIVE = false;

export default class IndexController extends Controller {
  @tracked isSidePanelActive = false;
  @tracked activeId = null;
  @tracked isFiltersActive = false;
  @tracked selectedSortType = DEFAULT_SORT_TYPE;
  @tracked isPersonalProgressActive = DEFAULT_PERSONAL_PROGRESS_ACTIVE;
  @tracked isGroupProgressActive = DEFAULT_GROUP_PROGRESS_ACTIVE;

  get selectedSortMethod() {
    return SORT_METHOD[this.selectedSortType];
  }

  queryParams = [
    {
      selectedSortType: 'sort',
      isPersonalProgressActive: 'personal_progress',
      isGroupProgressActive: 'group_progress',
    },
  ];

  @action
  openSidePanel(id) {
    console.log(id);
    this.activeId = id;
    this.isSidePanelActive = true;
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
  }

  @action
  togglePersonalProgressActive() {
    this.isPersonalProgressActive = !this.isPersonalProgressActive;
  }

  @action
  toggleGroupProgressActive() {
    this.isGroupProgressActive = !this.isGroupProgressActive;
  }

  get hasActiveFilters() {
    return (
      this.selectedSortType !== DEFAULT_SORT_TYPE ||
      this.isPersonalProgressActive !== DEFAULT_PERSONAL_PROGRESS_ACTIVE ||
      this.isGroupProgressActive !== DEFAULT_GROUP_PROGRESS_ACTIVE
    );
  }

  get activeKnowledgeComponent() {
    console.log(this.model.grid.topics);
    return this.model.grid.topics.find((topic) => {
      return topic.id === this.activeId;
    });
  }

  get isSidePanelOpen() {
    return this.activeId !== null;
  }

  get topics() {
    return this.model.grid.topics.sort(this.selectedSortMethod);
  }
}
