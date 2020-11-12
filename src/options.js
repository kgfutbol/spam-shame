function insert_data(data) {
    chrome.runtime.sendMessage({
        message: 'insert',
        payload: data
    });
}

function get_data(data) {
    chrome.runtime.sendMessage({
        message: 'get',
        payload: data
    });
}

function update_data(data) {
    chrome.runtime.sendMessage({
        message: 'update',
        payload: data
    });
}

function delete_data(data) {
    chrome.runtime.sendMessage({
        message: 'delete',
        payload: data
    });
}

document.addEventListener("DOMContentLoaded", function () {

});