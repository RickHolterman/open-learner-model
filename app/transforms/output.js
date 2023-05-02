import Transform from '@ember-data/serializer/transform';

export default class OutputTransform extends Transform {
  deserialize(serialized) {
    return JSON.parse(serialized);
  }
}
