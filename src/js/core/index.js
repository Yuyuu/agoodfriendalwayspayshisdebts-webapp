'use strict';

import angular from 'angular';
import angularSanitize from 'angular-sanitize';
import angularAnimate from 'angular-animate';
import angularMessageFormat from 'angular-message-format';
import uirouter from 'angular-ui-router';
import angularLoadingBar from 'angular-loading-bar';
import angularUiNotification from 'angular-ui-notification';
import 'ng-i18next';
import 'angular-strap';
import 'angular-strap/dist/angular-strap.tpl';
import 'angular-bootstrap';
import '../../../node_modules/font-awesome/fonts/fontawesome-webfont.woff';
import '../../less/style.less';

export default angular.module('app.core', [
  angularSanitize,
  angularAnimate,
  angularMessageFormat,
  uirouter,
  angularLoadingBar,
  angularUiNotification,
  'jm.i18next',
  'mgcrea.ngStrap.tooltip',
  'mgcrea.ngStrap.select',
  'mgcrea.ngStrap.affix',
  'ui.bootstrap.modal',
  'ui.bootstrap.tpls'
])
    .name;
