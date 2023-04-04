import Component from '@glimmer/component';

export default class DetailPageComponent extends Component {
  get depth() {
    let depth = this.args.depth;

    if (depth === undefined) {
      return 0;
    }

    return ++depth;
  }
}
