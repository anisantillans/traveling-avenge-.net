
function arrayObjectIndexOf(myArray, searchTerm, property) {
    for (var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] == searchTerm) return i;
    }
    return -1;
}


function listPedidos() {
    var url = $('#pedido-badge').data('url');
    var reservaId;
    $.ajax({
        type: 'POST',
        url: url,
        success: function (data) {
            $('#pedido-badge, #cantidad-pedido').css('display', '').text(data.length);
            $('#pedido-badge, .cantidad-pedido').css('display', '').text(data.length);
            
            for (var i = 0; i < data.length; i++)
            {
                var textHtml = '<div class="bar-widget" style="overflow: hidden; outline: none;">' +
                                        '<div class="table-box">'+
                                            '<div class="table-detail">'+
                                                '<div class="iconbox bg-custom">'+
                                                    '<i class="fa fa-ticket">'+'</i>'+
                                                '</div>'+
                                            '</div>'+

                                            '<div class="table-detail">'+
                                                '<h4 class="m-t-0 m-b-5">' + '<b>' + data[i].NombreTipoReserva  +'</b>' + '</h4>' +
                                                '<p class="text-muted m-b-0 m-t-0">' + '<small>Estado:' + '<br>'+ data[i].NombreTipoReserva + '</small>' + '</p>' +
                                            '</div>'+
                                            '<div class="table-detail text-right">'+
                                                '<a class="eliminar-reserva" id="" data-reserva = "' + data[i].ReservaId + '">' + '<i class="fa fa-trash">' + '<label id="reservaId" style="display:none">' + data[i].ReservaId + '</label>' + '</i>' + '</a>' +
                                            '</div>' +
                                        '</div>'+
                                    '</div>'
                $('ul #shopping-cart').append(textHtml);
                reservaId = data[i].ReservaId;
                /*$('#eliminar-reserva').on('click', function (e) {
                    
                    e.preventDefault();
                    //var form = $(this).parents('form');
                    swal({
                        title: "Eliminar reserva",
                        text: "¿Desea eliminar la reserva?",
                        type: "info",
                        showCancelButton: true,
                        cancelButtonClass: 'waves-effect waves-light',
                        confirmButtonClass: 'btn-info waves-effect waves-light',
                        confirmButtonText: 'Aceptar'
                    }, function (isConfirm) {
                        if (isConfirm) {// form.submit();
                            
                            window.location = '/Order/DeleteReserva?ReservaId=' + reservaId;
                            //window.location = @Url.Action() + reservaId;
                        }
                    });
                });*/
            }
        },
        error: function () {
            //console.error('error');
        }
    });

    //if (localStorage['detallePedido'] == null)
    //    return;

    //detallePedido = JSON.parse(localStorage.getItem('detallePedido'));

    //if (detallePedido.length == 0)
    //    return;

    /*$('#pedido-badge, #cantidad-pedido').css('display', '').text(detallePedido.length);

    var url = $('#pedido-badge').data('url');

    for (var i = 0; i < detallePedido.length; i++) {

        var model = { EquipoId: detallePedido[i].EquipoId }*/

    //    $.ajax({
    //        type: 'POST',
    //        url: url,
    //        data: model,
    //        success: function (data) {
    //            var index = arrayObjectIndexOf(detallePedido, data.EquipoId, 'EquipoId');

    //            var textHtml = '<li class="available" data-equipo-id="' + data.EquipoId + '"><a>' +
    //            '<div class="notice-icon">' +
    //            '<i class="fa fa-mobile"></i>' +
    //            '</div>' +
    //            '<div>' +
    //            '<span class="name">' +
    //                '<span class="name">' +
    //                    '<strong>' + data.Nombre + '</strong>' +
    //                    '<a href="#" class="remove-pedido text-danger pull-right"><i class="fa fa-trash fa-2x "></i></a>' +
    //                    '<span class="time small" data-cantidad="' + data.EquipoId + '">Cantidad: ' + detallePedido[index].Cantidad + '</span>' +
    //                '</span>' +
    //            '</div>' +
    //            '</a></li>';

    //            $('ul#shopping-cart').append(textHtml);
    //        },
    //        error: function () {
    //            console.error('error');
    //        }
    //    });

    //}
}

function deletePedidos() {
    localStorage.removeItem('detallePedido');

    $('#pedido-badge').css('display', 'none');
    $('ul #shopping-cart').html('');

    var $btn = $('#make-pedido');
    var url = $btn.data('href');
    $btn.attr('href', url);
    $btn.find('span').removeClass('text-success');

    listPedidos();
}

function updateUrl(detallePedido) {
    var $btn = $('#make-pedido');
    var url = $btn.data('href');
    if (detallePedido.length == 0) {
        $btn.attr('href', url);
        $btn.find('span').removeClass('text-success');
    }
    else {
        var strLst = '';
        for (var i = 0; i < detallePedido.length; i++) {
            strLst += detallePedido[i].EquipoId + ',' + detallePedido[i].Cantidad + (detallePedido.length == i + 1 ? '' : ';');
        }
        $btn.attr('href', url + '?l=' + strLst);
        $btn.find('span').addClass('text-success');
    }
}

function deletePedido(equipoId) {
    try {
        if (localStorage['detallePedido'] == null)
            return false;
        var detallePedido = JSON.parse(localStorage.getItem('detallePedido'));
        var detallePedidoResult = [];

        for (var i = 0; i < detallePedido.length; i++) {
            if (detallePedido[i].EquipoId != equipoId) {
                detallePedidoResult.push(detallePedido[i]);
            }
        }
        localStorage.setItem('detallePedido', JSON.stringify(detallePedidoResult));

        return true;
    } catch (e) {
        return false;
    }
}

$(function () {

    listPedidos();

    $(document).on('click', '.new-pedido', function () {
        $('#modal-equipoId, #modal-cantidad').val('');
        var equipoId = $(this).data('equipo-id');
        var nombre = $(this).data('nombre');
        var cantidadMaxima = $(this).data('max');
        $('#modal-pedido-titulo').text(nombre);
        $('#modal-equipoId').val(equipoId);
        $('#modal-cantidad').attr('max', cantidadMaxima)
    });







    $(document).on('click', '.remove-pedido', function () {
        var $li = $(this).closest('li')
        var equipoId = $li.data('equipo-id');
        console.log(equipoId);
        if (deletePedido(equipoId)) {
            $li.remove();
        }

        if (localStorage['detallePedido'] == null)
            return;

        var detallePedido = JSON.parse(localStorage.getItem('detallePedido'));

        if (detallePedido.length == 0) {
            $('#pedido-badge').css('display', 'none')
            $('#cantidad-pedido').css('display', '').text(detallePedido.length);
        } else {
            $('#pedido-badge, #cantidad-pedido').css('display', '').text(detallePedido.length);
        }

        updateUrl(detallePedido);
    });
})

$(document).on('click', '#add-pedido', function (e) {
    var url = $(this).data('url'); //'@Url.Action("GetEquipo", "Json")'
    $('.trDetallePedido').each(function () {

        //variables
        var valSelectProducto, valSelectJuego;

        //elementos de la tabla reserva
        $(this).find('.selectProducto').each(function (i) {
            if (i == 1) {
                valSelectProducto = $(this).val();
                console.log(valSelectProducto);
            }
        });

        $(this).find('.selectJuego').each(function (i) {
            if (i == 1) {
                valSelectJuego = $(this).val();
                console.log(valSelectJuego);
            }
        });

        //objeto a construir
        var datail = {
            ProductoId: valSelectProducto,
            EstacionJuegoId: valSelectJuego
        }

        if (datail == 0 || datail == null) {
        }

        var model = { ProductoId: datail.EquipoId }

        var detallePedido = [];

        if (localStorage['detallePedido'] != null) {
            detallePedido = JSON.parse(localStorage.getItem('detallePedido'));
        }

        localStorage.setItem('detallePedido', JSON.stringify(detallePedido));

        $('#pedido-badge, #cantidad-pedido').css('display', '').text(detallePedido.length);

        $.ajax({
            type: 'POST',
            url: url,
            data: model,
            success: function (data) {
                var textHtml = '<li class="available" data-producto-id="' + datail.ProductoId + '"><a>' +
                '<div class="notice-icon">' +
                '<i class="fa fa-mobile"></i>' +
                '</div>' +
                '<div>' +
                '<span class="name">' +
                '<strong>' + data.ProductoId + '</strong>' +
                '<a href="#" class="remove-pedido text-danger pull-right"><i class="fa fa-trash fa-2x "></i></a>' +
                '<span class="time small" data-cantidad="' + data.ProductoId + '">Juego: ' + datail.EstacionJuegoId + '</span>' +
                '</span>' +
                '</div>' +
                '</a></li>';

                $('ul#shopping-cart').append(textHtml);
            },
            error: function () {
                console.error('error');
            }
        });
    });


    //jalar la lista de los juegos seleccionados --productoid,juegoestacionid,precio
    //var index = arrayObjectIndexOf(detallePedido, datail.EquipoId, 'EquipoId');
    //var existe = false;
    //if (index == -1) {
    //    detallePedido.push(datail);
    //} else {
    //    existe = true;
    //    detallePedido[index].Cantidad = datail.Cantidad;
    //}


    

    

    //$('#modal-pedido').modal('hide');

    updateUrl(detallePedido);
});

/*$('.eliminar-reserva').click(function () {
    var reservaid = $(this).attr('data-reserva');
    
    $.ajax({
        url: '/WebApi/DeleteReserva',
        method: 'POST',
        data: { reservaId: reservaid },
        success: function (status) {
            alert(status);
        }
    });
});*/
/*$(document).ready(function () {
    $('.eliminar-reserva').click(function () {
        var reservaid = $(this).attr('data-reserva');
        
        $.ajax({
            url: 'Url.Action("DeleteReserva","WebApi")',
            method: 'POST',
            data: { reservaId: reservaid },
            success: function (status) { alert(status) }
        });
    });
});*/


    