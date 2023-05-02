import { module, test } from 'qunit';

import { setupTest } from 'open-learner-model/tests/helpers';

module('Unit | Transform | output', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let transform = this.owner.lookup('transform:output');
    assert.ok(transform);
  });
});
