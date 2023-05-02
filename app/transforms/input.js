import Transform from '@ember-data/serializer/transform';

export default class InputTransform extends Transform {
  deserialize(serialized) {
    return JSON.parse(serialized);
  }
}
