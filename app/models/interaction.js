import Model, { attr } from '@ember-data/model';

export default class InteractionModel extends Model {
  @attr('string') exerciseid;
  @attr('input') input;
  @attr('output') output;
  @attr('string') service;
  @attr('string') sessionid;
  @attr('string') source;
  @attr('string') taskid;
  @attr('string') ruleid;
  @attr('string') time;
  @attr('string') userid;
  @attr('string') version;

  get timeParsed() {
    let split = this.time.split(/[- :.]/);

    let tokenized = [
      parseInt(split[0]),
      parseInt(split[1]) - 1,
      parseInt(split[2]),
      parseInt(split[3]),
      parseInt(split[4]),
      parseInt(split[5]),
      parseInt(parseFloat(`0.${split[6]}`) * 1000),
    ];

    return new Date(...tokenized);
  }
}
