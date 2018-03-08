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

    $.post(url + '/validateUser', {pwd:pwd}, function () {
      if (data.loggedIn) {
        window.location.href = url + '/pacientes.html'
      }
    })
      .fail(displayError);
  });



  // mostrar pacientes
  $('[mostrarPacientes]').click(function () {
    event.preventDefault();
    $.get(url + '/pacient', function (data) {
      $('#listaDePacientes').append('<table class="paciente">' +
        '<tr>' +
        '<th>Nombre</th>' +
        '<th>Apellido</th>' +
        '<th>Total sesiones</th>' +
        '<th>Sesiones restantes</th>' +
        '<th>Dia de sesión</th>' +
        '<th></th>' +
        '</tr>');

      data.map(function (e) {
        $('#listaDePacientes').append(
          '<tr>' +
          '<td>'+ e.name + '</td>' +
          '<td>'+ e.lastName + '</td>' +
          '<td>'+ e.totalSessions + '</td>' +
          '<td>'+ e.pendingSessions + '</td>' +
          '<td>'+ e.sessionDay + '</td>' +
          '<td><button cargarSesion>Agregar sesion</button></td>' +
          ' </tr>')
      });

      $('#listaDePacientes').append('</table>')

    })
      .fail(displayError)


  });

  // mostrar pacientes del dia
  $('[mostrarPacientesDelDia]').click(function () {

  });

  // cargar paciente
  $('[cargarPaciente]').click(function () {
    $('#cargarPaciente').slideToggle('slow')
  });
  
  $('#cargarPacienteForm').submit(function (event) {
    event.preventDefault();
    $.post(url + '/pacient', function (data) {
      // agergar paciente al DOM?
      addPacient()
    })
      .fail(displayError)
  });

  // cargar sesion
  $('[cargarSesion]').click(function () {

  })

});