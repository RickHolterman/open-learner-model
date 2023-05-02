import Model, { attr } from '@ember-data/model';

export default class InteractionModel extends Model {
  @attr('string') exerciseid;
  @attr('input') input;
  @attr('output') output;
  @attr('string') service;
  @attr('string') sessionid;
  @attr('string') source;
  @attr('string') taskid;
  @attr('date') time;
  @attr('string') userid;
  @attr('string') version;
}
