'use strict';

export default class CreateEventController {

  /* @ngInject */
  constructor($state, Events) {
    this._$state = $state;
    this._Events = Events;
    this.event = {participants: [{email: '', share: 1}]};
  }

  addParticipant() {
    this.event.participants.push({email: '', share: 1});
  }

  createEvent(event) {
    delete this.errors;
    this._Events.create(event)
        .then(data => this._$state.go('event.expenses', {id: data.id}))
        .catch(errors => this.errors = errors);
  }

  removeParticipant(index) {
    this.event.participants.splice(index, 1);
  }
}
