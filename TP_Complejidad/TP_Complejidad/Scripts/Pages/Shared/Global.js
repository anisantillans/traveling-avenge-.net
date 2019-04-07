/// <reference path="Global.js" />
/// <reference path="Global.js" />

var numero_modal = 1;

$(document).on('click', '[data-type="modal-link"]', function (e) {
    e.preventDefault();

    // Url de vista a cargar
    var sourceUrl = $(this).attr('data-source-url');

    if (sourceUrl.indexOf(tabMinimizedValue) != -1) {
        console.log(tabMinimizedValue);
        return;
    }

    var $modalLoading = $('#default-modal-loading');
    var $modal = $('<div class="modal fade"><div class="modal-dialog"><div class="modal-content"></div></div></div>');
    var $modalContent = $modal.find('.modal-content');

    $modalContent.html($modalLoading.html());

    var $container = $('#default-modal-container');
    $container.append($modal);

    var bootModal = $modal.modal({
        backdrop: "static",
        show: true
    });

    $modal.css('z-index', 1050 + numero_modal * 20 + 10);
    $modal.css('top', ((numero_modal) * 10) + 'px');

    $('.modal-backdrop').last().css('z-index', 1050 + numero_modal * 20);
    numero_modal += 1;

    //.on('shown.bs.modal', function () {
    $modalContent.load(sourceUrl, function (response, status, xhr) {
        if (status == "error") {
            $modalContent.html($('#default-modal-loading-error').html());
        }
        else {
            //$.validator.unobtrusive.parse($modalContent);
            RebindJquery($modalContent);
        }
    });
    // });

    bootModal.on('hidden.bs.modal', function () {
        if (!tabMinimizing) {
            $(this).remove();
            numero_modal -= 1;
        }
        tabMinimizing = false;
    });
});

var tabMinimized = 0;
var tabMinimizing = false;
var tabMinimizedValue = null;

$(document).on('click', '[data-minimize]', function () {
    tabMinimized += 1;
    var target = $(this).data('target');
    tabMinimizing = true;
    tabMinimizedValue = $(document).find('#' + target + ' form').attr('action');
    $(document).find('#' + target).closest('.modal').modal('hide');
    $(document).find('#minimize-container li').removeClass('active');
    $('#minimize-container').append('<li class="active"><a href="#" data-toggle="modal" data-target="' + target + '" style="cursor:pointer;"><i class="fa fa-thumb-tack" aria-hidden="true"></i> Ticket Activo </a></li>');
});

$(document).on('click', '#minimize-container li > a', function () {
    var target = $(this).data('target');
    tabMinimized -= 1;
    tabMinimizedValue = null;
    $(document).find('#' + target).closest('.modal').modal('show');
    $(this).parent().remove();
});

//$('[data-type="cascade-dropdown-list"]').on('change', function (e) {
$(document).on('change', '[data-type="cascade-dropdown-list"]', function (e) {
    
    // Url de datos json
    var sourceUrl = $(this).attr('data-source-url');

    // Nombre del parámetro de filtro
    var dataFilter = $(this).attr('data-filter');

    // Valor seleccionado
    var selectedId = $(this).val();
    if (selectedId != "") {
        // Select a actualizar
        var updateTarget = $(this).attr('data-update-target');

        var postData = {};
        postData[dataFilter] = selectedId;
        var $updateTarget = $(updateTarget);
        $updateTarget.attr('disabled', 'disabled')
        $updateTarget.find('option[value!=""]').remove();

        $.ajax({
            type: 'POST',
            url: sourceUrl,
            data: postData,
            success: function (data) {
                var $updateTarget = $(updateTarget);
                var valueMember = $updateTarget.attr('data-value-member');
                var textMember = $updateTarget.attr('data-text-member');
                $updateTarget.html('');
                $updateTarget.append('<option value="">[- Seleccione -]</option>');
                for (i = 0; i < data.length - data.length; i++) {
                    //$updateTarget.append('<option value="' + data[i][valueMember] + '">' + data[i][textMember] + '</option>');
                    $updateTarget.append($('<option>').text(data[i][textMember]).attr('value', data[i][valueMember]));
                }
                $updateTarget.removeAttr('disabled');
                $updateTarget.trigger('change');
            },
            async: false
        });

        /*
        $.post(sourceUrl, postData, function (data) {
            var $updateTarget = $(updateTarget);
            var valueMember = $updateTarget.attr('data-value-member')
            var textMember = $updateTarget.attr('data-text-member')
            for (i = 0; i < data.length; i++) {
                $updateTarget.append($('<option>').text(data[i][textMember]).attr('value', data[i][valueMember]));
            }
            $updateTarget.removeAttr('disabled');
            $updateTarget.trigger('change');
        });*/
    }
});

function removeAccents(strAccents){
    strAccents = strAccents.split('');
    strAccentsOut = new Array();
    strAccentsLen = strAccents.length;
    var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    var accentsOut = ['A','A','A','A','A','A','a','a','a','a','a','a','O','O','O','O','O','O','O','o','o','o','o','o','o','E','E','E','E','e','e','e','e','e','C','c','D','I','I','I','I','i','i','i','i','U','U','U','U','u','u','u','u','N','n','S','s','Y','y','y','Z','z'];
    for (var y = 0; y < strAccentsLen; y++) {
        if (accents.indexOf(strAccents[y]) != -1) {
            strAccentsOut[y] = accentsOut[accents.indexOf(strAccents[y])];
        }
        else
            strAccentsOut[y] = strAccents[y];
    }
    strAccentsOut = strAccentsOut.join('');
    return strAccentsOut;
}

function AutoTargetAjaxCerrarModal() {
    var element = arguments[3];
    $($(element).data('ajax-update')).closest('.modal').nextAll().modal('hide');

}

function RebindJquery($element) {
    //$.validator.unobtrusive.parse($element);
    //$element.find('.daterangepicker').daterangepicker({ format: "dd/mm/yyyy", autoclose: true }, "setDate", new Date());

    //$element.find('.datepicker').datepicker({
    //    format: 'yyyy/MM/dd',
    //    autoclose: true,
    //    language: 'es'
    //}).on('changeDate', function (ev) {
    //    $(this).datepicker('hide');
    //});
    //$element.find('.datetimepicker').datepicker({
    //    format: "dd/mm/yyyy",
    //    language: "es",
    //    autoclose: true
    //});
    /*$element.find('.timepicker').timepicker({
        minuteStep: 5,
        disableFocus: true,
        defaultTime: false
    });*/

    //$element.find('.table-sortable tbody').sortable({
    //    helper: function (e, tr) {
    //        var $originals = tr.children();
    //        var $helper = tr.clone();
    //        $helper.children().each(function (index) {
    //            $(this).width($originals.eq(index).width());
    //        });
    //        return $helper;
    //    },
    //});

    /*$element.find('.datetimepicker').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: 'es'
    });

    $element.find('.timepicker').timepicker({
        showMeridian: false
    });*/

   //$element.find('.select2, [data-plugin="select2"]').select2({
   //    allowClear: true,
   //    placeholder: "[-Seleccionar-]"
   //});
   //
   //$element.find('[data-toggle="tooltip"]').tooltip();
   //
   //
   //$element.find('[data-mask]').each(function (i, e) {
   //    $(this).mask($(this).data('mask'));
   //});
   //
   //$element.find('#clearAll').click(function (i, e) {
   //    $("input[type=text]").each(function () {
   //        $(this).val('');
   //    });
   //    $(".select2").each(function () {
   //        $(this).val(null).trigger("change");
   //    });
   //    $(this).parent().find('button[type="submit"]').click();
   //});
   //
   //$(function () {
   //    $('[data-type="select-2"]').each(function () {
   //        var urlSource = $(this).data("source")
   //        var id = $(this).attr("id")
   //        $('#' + id).select2({
   //            ajax: {
   //                placeholder: "[- Buscar -]",
   //                quietMillis: 100,
   //                allowClear: true,
   //                url: urlSource,
   //                dataType: 'json',
   //                delay: 250,
   //                type: 'POST',
   //                language: "es",
   //                data: function (params) { return { q: params }; },
   //                results: function (data) { return { results: data }; },
   //                cache: true
   //            },
   //            escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
   //            minimumInputLength: 2
   //        });
   //    });
   //});
}


RebindJquery($(document));

function KeepAlive() {

    http_request = new XMLHttpRequest();
    http_request.open('GET', urlRoute + "/Home/KeepAlive");
    http_request.send(null);
};


$(function () {

    //$('.select2, [data-plugin="select2"]').select2({
    //    allowClear: true,
    //    placeholder: "[-Seleccione-]"
    //});

   //$('.datetimepicker').datepicker({
   //    format: 'dd/mm/yyyy',
   //    autoclose: true,
   //    language: 'es'
   //});

    setInterval(KeepAlive, 30000000);
});


function ShowLightAlert(tipo, mensaje) {
    var textoInicial = "";
    switch (tipo) {
        case "warning": {
            textoInicial = "<i class='fa fa-exclamation-circle'></i><strong> ¡Atención! </strong>"
            break;
        }
        case "danger": {
            textoInicial = "<i class='fa fa-times-circle'></i><strong> ¡Error! </strong>"
            break;
        }
        case "info": {
            textoInicial = "<i class='fa fa-info-circle'></i><strong> Ojo. </strong>"
            break;
        }
        case "success": {
            textoInicial = "<i class='fa fa-check-circle'></i><strong> ¡! </strong>"
            break;
        }
    }

    textoInicial += mensaje;

    $('html,body').animate({ scrollTop: 0 }, 500);
    setTimeout(function () {
        var options = {
            type: tipo,
            //classes: 'alert-dark' // add custom classes
            namespace: 'pa_page_alerts_default'
        };
        PixelAdmin.plugins.alerts.add(textoInicial, options);
    }, 800);
}

function EnviarMensajeGrowl(Tipo, Titulo, Mensaje) {
    switch (Tipo) {
        case 'error': {
            $.growl.error({ title: Titulo, message: Mensaje })
            break;
        }
        case 'notice': {
            $.growl.notice({ title: Titulo, message: Mensaje })
            break;
        }
        case 'warning': {
            $.growl.warning({ title: Titulo, message: Mensaje })
            break;
        }
        case 'info': {
            $.growl.info({ title: Titulo, message: Mensaje, size: 'large' })
            break;
        }
        case 'default': {
            $.growl({ title: Titulo, message: Mensaje, size: 'large' })
            break;
        }
    }
}

function CreateModalLink(url) {
    var $nuevo = $('body').append($('<span data-type="modal-link" class="CreateModalLinkElement" data-source-url="' + url + '">'));
    $('.CreateModalLinkElement').last().click().remove();
}
