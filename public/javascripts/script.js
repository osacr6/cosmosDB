// https://datatables.net/manual/index
$(document).ready(function() {
  $('#videoJuegosTable').DataTable({
    pagingType: 'full_numbers',
    language: {
      processing: "Cargando",
      search: "Buscar",
      lengthMenu: "mostar _MENU_ datos",
      info: "_START_ de _END_ de un de total _TOTAL_ datos",
      infoEmpty: "no hay registros",
      infoFiltered: "(filtado de _MAX_ datos)",
      loadingRecords: "Cargando Datos",
      zeroRecords: "no se encontraron datos",
      paginate: {
        first: "Primera pagina",
        previous: "Anterior",
        next: "Siguiente",
        last: "Ultima Pagina"
      },
      aria: {
        sortAscending: ": Ordenar Ascendente",
        sortDescending: ": Ordenar Descendente"
      }
    }
  });

  $.typeahead({
    input: ".ubicaciones-typeahead",
    order: "asc",
    display: "Nombre",
    hint: true,
    minLength: 0,
    searchOnFocus: true,
    generateOnLoad: true,
    template: '<span data-ubicaciones="{{Nombre}}">{{Nombre}}</span>',
    source: {
      data: () => {
        return $.getJSON('/ubicaciones/list', function(data) {
            return data;
        });
      }
    },
    callback: {
      onClickBefore: function(node, a, item, event) {
        $('[name=ubicacionId]').val(item.id);
      }
    }
  });

  $.typeahead({
    input: ".videoJuego-typeahead",
    order: "asc",
    display: "Nombre",
    hint: true,
    minLength: 0,
    searchOnFocus: true,
    generateOnLoad: true,
    template: '<span data-videoJuego="{{Nombre}}">{{Nombre}}</span>',
    source: {
      data: () => {
        return $.getJSON('/videoJuegos/list', function(data) {
            return data;
        });
      }
    },
    callback: {
      onClickBefore: function(node, a, item, event) {
        $('[name=videoJuegoId]').val(item.id);
      }
    }
  });


});