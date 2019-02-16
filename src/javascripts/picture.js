var id = document.location.href.split('/pictures/')[1].split('#')[0];

$(document).ready(()=> {
    $('#modalDelete').click(() => {
        var data = {id: id};
        sendAjax('/pictures/deletePicture', data, "POST");
        setTimeout(function() {document.location.href='/pictures';}, 400);
    });
    $('#__save').click(() => {
        var data = {
            id: id,
            name: $('#changeName').val(),
            author: $('#changeAuthor').val(),
            date: $('#changeYear').val(),
            description: $('#changeDes').val(),
            inAuction: null,
            beginning_price: $('#changePrice_').val(),
            min_step: $('#changeMin_').val(),
            max_step:$('#changeMax_').val()
        };
        sendAjax('/pictures/renamePicture', data, "PUT");
        $('#td1').text($('#changeName').val());
        $('#td2').text($('#changeAuthor').val());
        $('#td3').text($('#changeYear').val());
        $('#td4').text($('#changeDes').val());
        if ($('#changePrice_').val() != "") {
            $('#td5').text('Да');
            $('#td6').text($('#changePrice_').val());
            $('#td7').text($('#changeMin_').val());
            $('#td8').text($('#changeMax_').val());
        }
    });
    $('#save').click(() => {
        var data = {
            id: id,
            inAuction: true,
            beginning_price: $('#changePrice').val(),
            min_step: $('#changeMin').val(),
            max_step: $('#changeMax').val(),
        };
        sendAjax('/pictures/addInAuction', data, "PUT");
        $('#addAuction').text('Удалить из аукциона');
        $('#addAuction').attr({form:'removePicFromAuc', href:'#modalRemovePic'});
        $("#tab tr:last").after('<tr id="tr5">' + '<td>' + 'В аукционе?'  + '<td id="td5">' + 'Да' + '</tr>' + '<tr id="tr6">'
            + '<td>' + 'Начальная цена' + '<td id="td6">' + $('#changePrice').val() + '</tr>' + '<tr id="tr7">'
            + '<td>' + 'Мин. шаг' + '<td id="td7">' + $('#changeMin').val() + '</tr>' + '<tr id="tr8">'
            + '<td>' + 'Макс. шаг' + '<td id="td8">' + $('#changeMax').val() + '</tr>');
    });
    $('#removePicButton').click(() => {
        var data = {id:id}
        sendAjax('/pictures/removeFromAuction', data, "PUT");
        $('#tr5').remove();
        $('#tr6').remove();
        $('#tr7').remove();
        $('#tr8').remove();
        $('#addAuction').text('Поставить в аукцион');
        $('#addAuction').attr({form:'addPicToAuc', href:'#modalAddPic'});
    });
});

function sendAjax(url, data, type){
    $.ajax({
        url:url,
        type:type, //метод отправки
        data: data
    });
}

