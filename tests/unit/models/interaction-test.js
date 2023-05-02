import { module, test } from 'qunit';

import { setupTest } from 'open-learner-model/tests/helpers';

module('Unit | Model | interaction', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('interaction', {});
    assert.ok(model);
  });
});
