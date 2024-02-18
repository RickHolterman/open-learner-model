import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;

  async model() {
    let interactions = await this.store.findAll('interaction');
    let students = await this.store.findAll('student');

    return { interactions, students };
  }
}
