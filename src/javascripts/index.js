$(document).ready(function(){
    require('../stylesheets/chat.css');
    //require.context("../images", true, /.*\.(jpg|jpeg|gif|png)$/);

    $('#status').text(' ');

    $('#btn-request').hide();
    $('#btn-buy').hide();
    $("#res-msg-inp, #img-info-auction, #resizableFrame").draggable({
        cursor: "move"
    });

    $("#resizableFrame").resizable({
        maxHeight: 700,
        maxWidth: 750,
        minHeight: 200,
        minWidth: 200
    });

    chat();

    $('#send').on('click', send);

    $('#btn-request').on('click', function () {
        let price = $('#pictureprice').text().split(' ')[1];
        let my_money = $('#money').text().split(' ')[1];
        if (Number(price) < Number(my_money)) {
            let message = 'Подал заявку';
            if (isFirstRequest) message = 'Подал заявку первым';
            socket.json.emit('msg', {name: $('#username').text(), value: message});
            $('#status').text('Вы в аукционе').show();
            $('#btn-request').hide();
            if (isFirstRequest) my_bet = price;
            socket.json.emit('setcurrentbet', {money: my_bet});
        } else {
            alert('Недостаточно средств.');
        }
    });


    $('#btn-increase').on('click', function () {
        let delta = $("input:radio:checked").val();
        let my_money = $('#money').text().split(' ')[1];
        let new_bet = Number(current_bet) + Number(delta);
        if (Number(my_money) >= new_bet) {
            my_bet = new_bet;
            socket.json.emit('msg', {name: $('#username').text(), value: 'Предложил цену: ' + my_bet});
            socket.json.emit('setcurrentbet', {money: my_bet});
        } else {
            alert('Недостаточно средств.');
        }
    });


    var socket;

    var isRight = true;
    function chat() {
        socket = io.connect('http://localhost:4445');
        socket.on('connect', function () {
            socket.json.emit('hello', {'name': $('#username').text()});
            socket.on('msg', function (msg) {
                if (isRight) {
                    $('#users').append(`<div class="container"><p style="word-wrap: break-word;">${msg.message}</p>
                                        <span class="time-right">${msg.time}</span></div>`)
                    isRight = false;
                } else {
                    $('#users').append(`<div class="container darker"><p style="word-wrap: break-word;">
                                        ${msg.message}</p><span class="time-left">${msg.time}</span></div>`)
                    isRight = true;
                }
            });
            socket.on('startauction', function (msg) {
                $('#img-info-auction, #btn-request').show();
                $('#info').text(msg.info);
            });
            socket.on('changepicture', function (msg) {
                updateBuy(msg.ind);
                $('#pic-name').text(msg.name);
                $('#pic-author').text(msg.author);
                $('#pic-img, #pic-img-big').prop('src', msg.imgsrc);
                $('#disc').text(msg.disc);
                $('#pictureprice').text('Цена: ' + msg.price);
                $('#minstep').removeAttr('value');
                $('#maxstep').removeAttr('value');
                $('#minstep').val(msg.min);
                $('#maxstep').val(msg.max);
                $('#minsteplabel').text('Мин. ставка: ' + msg.min);
                $('#maxsteplabel').text('Макс. ставка: ' + msg.max);
            });
            socket.on('auctionstep', (msg) => {
                if ($('#status').text() == ' ') {
                    $('#status').text('');
                } else {
                    $('#currentbet').text('Текущая ставка: ' + current_bet);
                    $('#yourmoney').text('Ваша ставка: ' + my_bet);
                    $('#auctionbox').show();
                }


                $('#info').text(msg.info);
                $('#btn-request').hide();
            });
            socket.on('researchstep', (msg) => {
                isFirstRequest = true;
                current_bet = 0;
                my_bet = 0;
                $('#auctionbox').hide();
                $('#status').text(' ').hide();
                $('#info').text(msg.info);
                $('#btn-request').show();
            });
            socket.on('refreshtimer', function (msg) {
                clearInterval(inter);
                sec="0";
                refresh(msg.time);
                if ($('#status').text() == '') {
                    $('#status').text('Вы вне аукциона').show();
                    $('#btn-request').hide();
                }
            });
            socket.on('setcurrentbet', (msg) => {
                if (msg.money != 0) {
                    isFirstRequest = false;
                    current_bet = msg.money;
                    $('#currentbet').text('Текущая ставка: ' + current_bet);
                    $('#yourmoney').text('Ваша ставка: ' + my_bet);
                }
            });
            socket.on('stopauction', (msg) => {
                updateBuy(msg.ind);
                $('#img-info-auction, #btn-request').hide();
                $('#auctionbox').hide();
            });
        });
        function updateBuy(ind) {
            if (my_bet !== 0 && current_bet === my_bet) {
                let my_money = Number($('#money').text().split(' ')[1]);
                $('#money').text(`Средства: ${my_money - my_bet}`);
                socket.json.emit('updatemoney', {name: $('#username').text(), money: my_money - my_bet});

                let name = $('#pic-name').text();
                let author = $('#pic-author').text();
                let price = $('#pictureprice').text();
                $('#buys').append(`
                    <tr>
                        <td>${name}</td><td>${author}</td><td>${price}</td><td>${my_bet}</td>
                    </tr>`);
                $('#btn-buy').show();
                socket.json.emit('updatepictureinfo', {name: $('#username').text(), price: my_bet, id: ind - 1});
                socket.json.emit('msg', {name: $('#username').text(), value: `Купил картину ${name} за ` + my_bet});
            }
        }
    }


    function send() {
        if (socket) {
            socket.json.emit('msg', {name: $('#username').text(), value: $('#msg').val()});
        }
    }
    var isFirstRequest = true;
    var current_bet = 0;
    var my_bet = 0;

    var sec=0;
    var inter;
    function refresh(min)
    {
        if(--sec == -1){
            sec = 59;
            min = min - 1;
        }
        let time=(min <= 9 ? "0"+min : min) + ":" + (sec <= 9 ? "0" + sec : sec);
        if(document.getElementById){timer.innerHTML=time;}
        inter = setTimeout(function() {refresh(min);}, 1000);
        if(min=='00' && sec=='00'){
            sec="0";
            clearInterval(inter);
        }
    }
});

