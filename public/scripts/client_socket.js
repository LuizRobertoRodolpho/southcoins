var socket = io();

socket.on('pingback', function(data) {
    console.log('cycleCompleted');
});

socket.on('broadcast', function(orderbook) {
    orderBookViewModel.setItems(orderbook);
    //orderBookViewModel.addItem(data.PRICE, data.COUNT, data.AMOUNT);
});