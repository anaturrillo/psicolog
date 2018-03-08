$(document).ready(function () {
  const url = 'http://localhost:5000';
  const displayError = function () {
    $('#error').slideToggle('slow', function () {
      setTimeout(function () {
        $('#error').slideToggle('slow')
      }, 500)
    })
  };

  const token = document.cookie.token;

  const validateUser = function (token) {
    $.post(url + '/validateUser', {token:token}, function (data) {
      if (data.loggedIn) {
        window.location.href = url + '/pacientes.html'
      }
    })
      .fail(displayError)
  };

  if (token) {
    validateUser(token);
  }

  $('#pwd').change(function (evt) {
    const pwd = MD5(evt.target.value);

    $.post(url + '/validateUser', {pwd:pwd}, function (data) {
      if (data.loggedIn) {
        document.cookie.token = data.token;
        window.location.href = url + '/pacientes.html'
      }
    })
      .fail(displayError);
  });

});