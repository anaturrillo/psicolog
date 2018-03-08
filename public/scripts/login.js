$(document).ready(function () {
 

  displayError()
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

    $.post(url + '/validateUser', {pwd:pwd}, function () {
      if (data.loggedIn) {
        window.location.href = url + '/pacientes.html'
      }
    })
      .fail(displayError);
  });

});