import Route from '@ember/routing/route';
import { v4 as uuid } from 'uuid';

const GRID_MOCK = {
  topics: [
    {
      id: uuid(),
      title: 'De Morgan',
      progress: {
        personal: 80,
        group: 70,
      },
      buggyAnswers: {
        personal: 0,
      },
    },
    {
      id: uuid(),
      title: 'Associativity',
      progress: {
        personal: 40,
        group: 20,
      },
      buggyAnswers: {
        personal: 3,
      },
    },
    {
      id: uuid(),
      title: 'Double negation',
      progress: {
        personal: 20,
        group: 50,
      },
      buggyAnswers: {
        personal: 4,
      },
    },
    {
      id: uuid(),
      title: 'Distribution',
      progress: {
        personal: 80,
        group: 50,
      },
      buggyAnswers: {
        personal: 3,
      },
    },
    {
      id: uuid(),
      title: 'Commutativity',
      progress: {
        personal: 100,
        group: 80,
      },
      buggyAnswers: {
        personal: 0,
      },
    },
    {
      id: uuid(),
      title: 'Implication definition',
      progress: {
        personal: 30,
        group: 20,
      },
      buggyAnswers: {
        personal: 0,
      },
    },
    {
      id: uuid(),
      title: 'Absorption',
      progress: {
        personal: 0,
        group: 10,
      },
      buggyAnswers: {
        personal: 0,
      },
    },
    {
      id: uuid(),
      title: 'Idempotency',
      progress: {
        personal: 0,
        group: 30,
      },
      buggyAnswers: {
        personal: 0,
      },
    },
    {
      id: uuid(),
      title: 'Equivalence definition',
      progress: {
        personal: 20,
        group: 20,
      },
      buggyAnswers: {
        personal: 1,
      },
    },
    {
      id: uuid(),
      title: 'T-rule complement',
      progress: {
        personal: 0,
        group: 0,
      },
      buggyAnswers: {
        personal: 1,
      },
    },
    {
      id: uuid(),
      title: 'T-rule conjunction',
      progress: {
        personal: 80,
        group: 100,
      },
      buggyAnswers: {
        personal: 2,
      },
    },
    {
      id: uuid(),
      title: 'T-rule disjunction',
      progress: {
        personal: 100,
        group: 20,
      },
      buggyAnswers: {
        personal: 0,
      },
    },
    {
      id: uuid(),
      title: 'T-rule not F',
      progress: {
        personal: 100,
        group: 60,
      },
      buggyAnswers: {
        personal: 0,
      },
    },
    {
      id: uuid(),
      title: 'F-rule complement',
      progress: {
        personal: 0,
        group: 20,
      },
      buggyAnswers: {
        personal: 4,
      },
    },
    {
      id: uuid(),
      title: 'F-rule conjunction',
      progress: {
        personal: 10,
        group: 20,
      },
      buggyAnswers: {
        personal: 0,
      },
    },
    {
      id: uuid(),
      title: 'F-rule disjunction',
      progress: {
        personal: 30,
        group: 90,
      },
      buggyAnswers: {
        personal: 3,
      },
    },
    {
      id: uuid(),
      title: 'F-rule not T',
      progress: {
        personal: 20,
        group: 80,
      },
      buggyAnswers: {
        personal: 4,
      },
    },
  ],
};

const LEARNER_DATA_MOCK = {
  name: 'Rick',
  progress: 80,
  grid: GRID_MOCK,
};

export default class IndexRoute extends Route {
  model() {
    return LEARNER_DATA_MOCK;
  }
}
