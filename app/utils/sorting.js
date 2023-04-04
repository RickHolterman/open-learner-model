const SORT_TYPE = {
  ALPHABETICAL: 'alphabetical',
  PERSONAL_DESC: 'personal-desc',
  PERSONAL_ASC: 'personal-asc',
  GROUP_DESC: 'group-desc',
  GROUP_ASC: 'group-asc',
};

const SORT_METHOD = {
  [SORT_TYPE.ALPHABETICAL]: (a, b) => {
    if (a.title < b.title) {
      return -1;
    }

    if (a.title > b.title) {
      return 1;
    }

    return 0;
  },
  [SORT_TYPE.PERSONAL_DESC]: (a, b) => {
    if (a.progress.personal > b.progress.personal) {
      return -1;
    }

    if (a.progress.personal < b.progress.personal) {
      return 1;
    }

    return 0;
  },
  [SORT_TYPE.PERSONAL_ASC]: (a, b) => {
    if (a.progress.personal < b.progress.personal) {
      return -1;
    }

    if (a.progress.personal > b.progress.personal) {
      return 1;
    }

    return 0;
  },
  [SORT_TYPE.GROUP_DESC]: (a, b) => {
    if (a.progress.group > b.progress.group) {
      return -1;
    }

    if (a.progress.group < b.progress.group) {
      return 1;
    }

    return 0;
  },
  [SORT_TYPE.GROUP_ASC]: (a, b) => {
    if (a.progress.group < b.progress.group) {
      return -1;
    }

    if (a.progress.group > b.progress.group) {
      return 1;
    }

    return 0;
  },
};

export { SORT_TYPE, SORT_METHOD };
