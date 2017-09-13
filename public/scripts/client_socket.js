var socket = io();

socket.on('pingback', function(data) {
    console.log('cycleCompleted');
});