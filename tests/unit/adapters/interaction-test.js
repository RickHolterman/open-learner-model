import { module, test } from 'qunit';

import { setupTest } from 'open-learner-model/tests/helpers';

module('Unit | Adapter | interaction', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let adapter = this.owner.lookup('adapter:interaction');
    assert.ok(adapter);
  });
});
