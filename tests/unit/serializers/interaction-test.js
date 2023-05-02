import { module, test } from 'qunit';

import { setupTest } from 'open-learner-model/tests/helpers';

module('Unit | Serializer | interaction', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('interaction');

    assert.ok(serializer);
  });

  test('it serializes records', function (assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('interaction', {});

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
