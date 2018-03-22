$(document).ready(function () {
  const url = 'http://localhost:5000';
  const displayError = function () {
    $('#error').slideToggle('slow', function () {
      setTimeout(function () {
        $('#error').slideToggle('slow')
      }, 500)
    })
  };

  const toLoggIn = function () {
    return window.location.href = url
  };

  const token = document.cookie.token;
  var validUser = false;


  const validateUser = function (token) {
    $.post(url + '/validateUser', {token:token}, function (data) {
      if (data.loggedIn) {
        validUser = true;
      } else {
        toLoggIn()
      }
    })
      .fail(displayError)
  };

  if (token) {
    validateUser(token);
  } else {
    toLoggIn()
  }

  if (validUser) {
    var pacientes = [];

    const dibujarPacientes = function (pacientes) {

      $('#listaDePacientes').append('<table class="paciente">' +
        '<tr>' +
        '<th>Nombre</th>' +
        '<th>Apellido</th>' +
        '<th>Total sesiones</th>' +
        '<th>Sesiones restantes</th>' +
        '<th>Dia de sesión</th>' +
        '<th></th>' +
        '</tr>');

      pacientes.map(function (e) {
        $('#listaDePacientes').append(
          '<tr>' +
          '<td>'+ e.name + '</td>' +
          '<td>'+ e.lastName + '</td>' +
          '<td>'+ e.totalSessions + '</td>' +
          '<td>'+ e.pendingSessions + '</td>' +
          '<td>'+ e.day + '</td>' +
          '<td><button cargarSesion>Agregar sesion</button></td>' +
          ' </tr>')
      });

      $('#listaDePacientes').append('</table>')

    };


    $.get(url + '/pacient', function (data) {
      pacientes = data;
      dibujarPacientes(pacientes)
    })
      .fail(displayError)


    $('[mostrarPacientes]').click(function (event) {
      event.preventDefault();
      dibujarPacientes(pacientes)
    });

    // mostrar pacientes del dia
    $('[mostrarPacientesDelDia]').click(function (event) {
      event.preventDefault();

      dibujarPacientes(pacientes
        .filter(function (paciente) {
          const day = paciente.day;
          const today = new Date();
          const todayDay = today.getDay();
          return day == todayDay;
        }))
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
  } else {
    validateUser(token)
  }


});