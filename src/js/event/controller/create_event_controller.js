'use strict';

export default class CreateEventController {
  /* @ngInject */
  constructor($state, Events) {
    this.$state = $state;
    this.Events = Events;
    this.event = {participants: [{email: '', share: 1}]};
  }

  addParticipant() {
    this.event.participants.push({email: '', share: 1});
  }

  createEvent(event) {
    delete this.errors;
    this.Events.create(event)
        .then(data => this.$state.go('event.expenses', {id: data.id}))
        .catch(errors => this.errors = errors);
  }

  removeParticipant(index) {
    this.event.participants.splice(index, 1);
  }
}
