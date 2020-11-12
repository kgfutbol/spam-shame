console.log("Background Execution");
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'insert')
    {
        let insertRequest = insert_data(request.payload);

        insertRequest.then(resp => {
            chrome.runtime.sendMessage({
                message: 'insert success',
                payload: resp
            });
        });

    } else if (request.message === 'get') {
        let getRequest = get_data(request.payload);

        getRequest.then(resp => {
            chrome.runtime.sendMessage({
                message: 'get success',
                payload: resp
            });
        });

    } else if (request.message === 'update') {
        let updateRequest = update_data(request.payload);

        updateRequest.then(resp => {
            chrome.runtime.sendMessage({
                message: 'update success',
                payload: resp
            });
        });

    } else if (request.message === 'delete') {
        let deleteRequest = delete_data(request.payload);

        deleteRequest.then(resp => {
            chrome.runtime.sendMessage({
                message: 'delete success',
                payload: resp
            });
        });
    }

});

let exampleData = [
    {
        "email" : "k.evingermain@gmail.com",
        "account" : "facebook"
    },
    {
        "email" : "k.e.vingermain@gmail.com",
        "account" : "twitter"
    },
    {
        "email" : "k.ev.ingermain@gmail.com",
        "account" : "amazon"
    }
]

let db = null;

function create_database() {
    const request = window.indexedDB.open('UserDatabase');

    request.onerror = function(event) {
        console.log("failed to open DB");
    }

    request.onupgradeneeded = function(event) {
        db = event.target.result;

        let emailStorage = db.createObjectStore('user', {
            keyPath: 'email'
        });
        emailStorage.transaction.oncomplete = function(event) {
            console.log("DB created")
        }
    }

    request.onsuccess = function(event) {
        db = event.target.result;

        console.log("DB Open")
    }
}

function delete_database() {
    const request = window.indexedDB.deleteDatabase('UserDatabase');

    request.onerror = function(event) {
        console.log("failed to delete DB");
    }

    request.onsuccess = function(event) {
        console.log("DB Deleted")
    }

}

function insert_data (data)
{
    if (db) {
        const insert_transaction = db.transaction("user", "readwrite");
        const objectStore = insert_transaction.objectStore("user");

        return new Promise((resolve, reject) => {
            insert_transaction.onerror = function(event) {
                console.log("Problem Inserting Data");
                resolve(false);
            }

            insert_transaction.onsuccess = function(event) {
                console.log("Successfully adding data")
                resolve(true);
            }

            data.forEach(email => {
                let request = objectStore.add(email);

                request.onerror = function(event) {
                    console.log("Failed to add data");
                }

                request.onsuccess = function(event) {
                    console.log("Successfully added data")
                }
            });
        });

    }
}

function get_data(email) {
    if (db) {
        const get_transaction = db.transaction("user", "readonly");
        const objectStore = get_transaction.objectStore("user");

        return new Promise((resolve, reject) => {
            get_transaction.onerror = function(event) {
                console.log("Problem Getting Data");
            }

            get_transaction.onsuccess = function(event) {
                console.log("Successfully Retrieved Data")
                resolve(event.target.result);
            }

            let request = objectStore.get(email);

            request.onerror = function(event) {
                console.log("Failed to get data");
            }

            request.onsuccess = function(event) {
                console.log("Successfully Retrieved data");
            }
        });
    }
}

function update_data(data) {
    if(db) {
        const put_transaction = db.transaction("user", "readwrite");
        const objectStore = put_transaction.objectStore("user");

        return new Promise((resolve, reject) => {
            put_transaction.onerror = function(event) {
                console.log("Problem Getting Data");
                resolve(false);
            }

            put_transaction.onsuccess = function(event) {
                console.log("Successfully Updated Data")
                resolve(true);
            }

            objectStore.put(data);
        });
    }
}

function delete_data (email) {
    if(db) {
        const delete_transaction = db.transaction("user", "readwrite");
        const objectStore = delete_transaction.objectStore("user");

        return new Promise((resolve, reject) => {
            delete_transaction.onerror = function(event) {
                console.log("Problem Deleting Data");
                resolve(false);
            }

            delete_transaction.onsuccess = function(event) {
                console.log("Successfully Deleted Data");
                resolve(true);
            }

            objectStore.delete(email);

        });
    }
}

create_database();