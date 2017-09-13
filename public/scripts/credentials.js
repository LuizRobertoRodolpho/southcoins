function checkStorage() {
    if (typeof (Storage) !== "undefined") {
        var credential = JSON.parse(localStorage.getItem("credential_bitfinex"));
        if (credential !== null && credential !== undefined) {
            credentialsViewModel.Key = credential.Key;
            credentialsViewModel.Secret = credential.Secret;
            //$("input[name=region][value=" + filter.REGIONID + "]").prop('checked', true);
        } else {
            localStorage.setItem("credential_bitfinex", JSON.stringify(credentialsViewModel._data));
            //connectBitfinex();
        }

        if (credentialsViewModel.Key != undefined && credentialsViewModel.Key != '')
            socket.emit('activate', { id: credentialsViewModel.Key });

        //getByRegion(uid);
    } else {
        window.alert('Sorry! No Web Storage support...');
    }
    
    //socket.emit('hi', { UID: uid });
}

function connectBitfinex() {
    localStorage.setItem("credential_bitfinex", JSON.stringify(credentialsViewModel._data));
    socket.emit('activate', credentialsViewModel._data);
}

$(document).ready(function () {
    checkStorage();
});