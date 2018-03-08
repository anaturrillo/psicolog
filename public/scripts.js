$(document).ready(function () {
  const url = 'http://localhost:5000';

  $.get( url + '/getPepe', function( data ) {
    $( ".pacientes" ).html( data );
  });

  // mostrar pacientes
  $('[mostrarPacientes]').click(function () {

  });

  // mostrar pacientes del dia
  $('[mostrarPacientesDelDia]').click(function () {

  });

  // cargar paciente
  $('[cargarPaciente]').click(function () {
    $('#cargarPaciente').slideToggle('slow', function () {
      
    })
  });
  
  $('#cargarPacienteForm').submit(function (event) {
    event.preventDefault();
    $.post(url + '/createPacient', )
  })

  // cargar sesion
  $('[cargarSesion]').click(function () {

  })

});