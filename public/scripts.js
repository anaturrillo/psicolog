$(document).ready(function () {
  $.get( 'http://localhost:5000/getPepe', function( data ) {
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

  });

  // cargar sesion
  $('[cargarSesion]').click(function () {

  })

});