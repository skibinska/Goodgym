/* global index anime */

window.home = (function () {
  'use strict';

  var waypointsFromDatabase = [];
  function addToWaypoints (points) {
    waypointsFromDatabase = points;
  }

  var destination;
  function setDestination (place) {
    destination = place;
  }

  var waypoints;
  function setWaypoints (points) {
    waypoints = points;
  }

  function removePoints () {
    waypointsFromDatabase = [];
    destination = null;
  }

  var taskInfo = [].slice.call(document.querySelectorAll('textarea'));

  window.addEventListener('load', function () {
    var registerButton = document.getElementsByClassName('_yoti-verify-button')[0];
    registerButton.href = window.location.origin + '/qr' + window.location.pathname;
    index.getRun();
  });

  var saveButton = document.getElementsByClassName('button-container__save-button')[0];
  saveButton.addEventListener('click', saveToDatabase);

  var sendEmailButton = document.getElementsByClassName('button-container__send-email-button')[0];
  sendEmailButton.addEventListener('click', function () {
    triggerVerification(
      document.querySelector('.button-container__send-email-button'),
      document.querySelector('.button-container__qr-verification-button'),
      document.getElementsByClassName('checkmark')[1]
    );
    var emailBody = {
      emailAddress: document.getElementsByClassName('email-container__email-input')[0].value,
      qrAddress: window.location.origin + '/qr' + window.location.pathname
    };
    index.httpPostRequest(emailBody, '/send-qr-email' + window.location.pathname);
  });

  function saveToDatabase () {
    var runId = window.location.pathname.slice(1);
    waypoints.forEach(function (point) {
      if (waypointsFromDatabase.indexOf(point) === -1) {
        waypointsFromDatabase.push(point);
      }
    });

    var taskObj = {
      mapDetails: waypointsFromDatabase,
      startPoint: taskInfo[1].value,
      endPoint: destination,
      task: taskInfo[0].value,
      location: taskInfo[1].value,
      purpose: taskInfo[2].value,
      contact: taskInfo[3].value,
      risk: taskInfo[4].value,
      email: taskInfo[5].value,
      runId: runId
    };

    index.httpPostRequest(taskObj, '/post-run' + window.location.pathname);
    triggerVerification(
      document.querySelector('.button-container__save-button'),
      document.querySelector('.button-container__save-verification-button'),
      document.getElementsByClassName('checkmark')[0]
    );
  }

  function triggerVerification (element, verifiedButton, checkmark) {
    checkmark.style.visibility = 'hidden';
    verifiedButton.classList.remove('hidden');
    element.classList.add('hidden');
    setTimeout(function () {
      animateCheckmark();
    }, 100);

    setTimeout(function () {
      checkmark.style.visibility = 'visible';
    }, 250);

    setTimeout(function () {
      verifiedButton.classList.add('hidden');
      element.classList.remove('hidden');
    }, 1250);
  }

  function animateCheckmark () {
    anime({
      targets: '#checkmark path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      opacity: {
        value: 1,
        duration: 100
      }
    });
  }

  return {
    taskInfo: taskInfo,
    addToWaypoints: addToWaypoints,
    removePoints: removePoints,
    setDestination: setDestination,
    setWaypoints: setWaypoints
  };
})();
