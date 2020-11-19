console.log("Background Execution");
chrome.runtime.onInstalled.addListener(function (details) {
    chrome.storage.local.get(["email"], (res) => {
        if (!res.email) chrome.browserAction.setPopup({popup: '../initial.html'});
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'insert') {
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
    } else if (request.message === 'get all') {
        let getAllRequest = get_all_data();
        console.log(getAllRequest);
        getAllRequest.then(resp => {
            chrome.runtime.sendMessage({
                message: 'get all success',
                payload: resp
            });
        });
    }

});

let exampleData = [
    {
        "email": "k.evingermain@gmail.com",
        "website": "facebook"
    },
    {
        "email": "k.e.vingermain@gmail.com",
        "website": "twitter"
    },
    {
        "email": "k.ev.ingermain@gmail.com",
        "website": "amazon"
    }
];

let db = null;

function create_database() {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open('UserDatabase');

        request.onerror = function (event) {
            console.log("failed to open DB");
            resolve(false);
        }

        request.onupgradeneeded = function (event) {
            db = event.target.result;

            let emailStorage = db.createObjectStore('user', {
                keyPath: 'email'
            });
            emailStorage.transaction.oncomplete = function (event) {
                console.log("DB created")
            }
        }

        request.onsuccess = function (event) {
            db = event.target.result;

            console.log("DB Open")
            resolve(true);
        }
    });

}

function delete_database() {
    const request = window.indexedDB.deleteDatabase('UserDatabase');

    request.onerror = function (event) {
        console.log("failed to delete DB");
    }

    request.onsuccess = function (event) {
        console.log("DB Deleted")
    }

}

function insert_data(data) {
    if (db) {
        const insert_transaction = db.transaction("user", "readwrite");
        const objectStore = insert_transaction.objectStore("user");

        return new Promise((resolve, reject) => {
            insert_transaction.onerror = function (event) {
                console.log(event);
                resolve(false);
            }

            insert_transaction.onsuccess = function (event) {
                console.log(event)
                resolve(true);
            }

            data.forEach(email => {
                let request = objectStore.add(email);

                request.onerror = function (event) {
                    console.log("Failed to add data");
                }

                request.onsuccess = function (event) {
                    console.log("Successfully added data")
                }
            });
        });

    }
}

function get_all_data() {
    if (db) {
        const get_transaction = db.transaction("user", "readonly");
        const objectStore = get_transaction.objectStore("user");

        return new Promise((resolve, reject) => {
            get_transaction.onerror = function (event) {
                console.log("Problem Getting Data");
            }

            get_transaction.onsuccess = function (event) {
                console.log("Get All Transaction Complete")
            }

            let request = objectStore.getAll();


            request.onsuccess = function (event) {
                console.log("Successfully Retrieved All data");
                resolve(event.target.result);
            }
        });
    }
}

function get_data(email) {
    if (db) {
        const get_transaction = db.transaction("user", "readonly");
        const objectStore = get_transaction.objectStore("user");

        return new Promise((resolve, reject) => {
            get_transaction.onerror = function (event) {
                console.log("Get All Transaction Complete");
            }

            get_transaction.onsuccess = function (event) {
                console.log("Get Transaction Complete")

            }

            let request = objectStore.get(email);

            request.onsuccess = function (event) {
                console.log("Successfully Retrieved data");
                resolve(event.target.result);
            }
        });
    }
}

function update_data(data) {
    if (db) {
        const put_transaction = db.transaction("user", "readwrite");
        const objectStore = put_transaction.objectStore("user");

        return new Promise((resolve, reject) => {
            put_transaction.onerror = function (event) {
                console.log("Problem Getting Data");
                resolve(false);
            }

            put_transaction.onsuccess = function (event) {
                console.log("Successfully Updated Data")
                resolve(true);
            }

            objectStore.put(data);
        });
    }
}

function delete_data(email) {
    if (db) {
        const delete_transaction = db.transaction("user", "readwrite");
        const objectStore = delete_transaction.objectStore("user");

        return new Promise((resolve, reject) => {
            delete_transaction.onerror = function (event) {
                console.log("Problem Deleting Data");
                resolve(false);
            }

            delete_transaction.onsuccess = function (event) {
                console.log("Successfully Deleted Data");
                resolve(true);
            }

            objectStore.delete(email);

        });
    }
}

create_database().then((DBOpen) => {
    //insert_data(exampleData);
});

//Creates context menu
chrome.contextMenus.create({
    "id": "InsertEmail",
    "title": "InsertEmail",
    "contexts": ["editable"],
    "onclick": contextMenuClick
})

function contextMenuClick() {
    console.log("menu clicked");
    chrome.storage.local.get(["email"], (res) => {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                message: 'insert email',
                payload: res.email
            }, function (response) {
                if (response) {
                    insert_data(response);
                    nextEmail();
                }
            });
        });
    });
}


function setNewDotEmail(newEmail) {
    console.log("setting email");
    chrome.storage.local.set({"email": newEmail}, () => {});
}

function nextEmail() {
    chrome.storage.local.get(['email'], (result) => {
        console.log(result);

        let splitEmail = result.email.split("@");
        let oldFront = splitEmail[0];

        // Increment to next dot email
        let newFront = "";
        let carry = 1;
        for (let i = 0; i < oldFront.length - 1; i++) {
            if (oldFront[i] === ".") continue;

            let prevVal = oldFront[i + 1] === "." ? 1 : 0;
            const total = prevVal + carry;
            newFront += oldFront[i];

            carry = 0;
            if (total === 2) {
                carry = 1;
            } else if (total === 1) {
                newFront += ".";
            }
        }
        newFront += oldFront[oldFront.length - 1];

        const currBack = "@" + splitEmail[1];
        const back =
            carry === 0
                ? currBack
                : currBack === "@googlemail.com"
                ? "@gmail.com"
                : "@googlemail.com";
        setNewDotEmail(newFront + back);
    });
}
