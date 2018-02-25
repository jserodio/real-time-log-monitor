var connection = new WebSocket('wss://myhostname.domain:1337');

connection.onopen = function () {
    $('.card-header').html('<div class="alert alert-success alert-dismissible fade show" role="alert">'+
    '<strong>Success!</strong> Websocked server connected.'+
    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
    '<span aria-hidden="true">&times;</span>'+
    '</button>'+
    '</div>');
};


connection.onerror = function (error) {
    $('.card-header').html('<div class="alert alert-danger alert-dismissible fade show" role="alert">'+
    '<strong>Error!</strong> Websocked connection failed. Please reload.'+
    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
    '<span aria-hidden="true">&times;</span>'+
    '</button>'+
    '</div>');
};

connection.onmessage = function (message) {
    try {
        var json = JSON.parse(message.data);
    } catch (e) {
        console.log('This doesn\'t look like a valid JSON: ', message.data);
        return;
    }
    console.log(json.data);
    $('tbody').prepend('<tr><td>' + json.data + '</td></tr>');
};
