'use strict';

export default class ShowEventController {

  /* @ngInject */
  constructor($state, $modal, notificationService, event) {
    this._$state = $state;
    this._$modal = $modal;
    this._notificationService = notificationService;
    this.event = event;

    this._addParticipantModalOptions = {
      templateUrl: '/templates/modal/add_participant',
      controller: 'AddParticipantController',
      controllerAs: 'model'
    };
  }

  addParticipant() {
    let modalInstance = this._$modal.open(this._addParticipantModalOptions);
    modalInstance.result.then(participant => {
      if (participant) {
        this.event.participants.push(participant);
        this._$state.reload(this._$state.current);
        this._notificationService.success('PARTICIPANT_ADDED_SUCCESS');
      }
    });
  }
}
