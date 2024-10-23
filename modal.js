// modal.js
const dialog = document.getElementById('dialog');
const close = document.getElementById('close');
const bookItems = document.querySelectorAll('.bookItem');
const date = document.getElementById('date-display');
const book = document.getElementById('book');

const apiURL = 'https://indigoapi.henryannan.com/addBooking'; // Ensure the endpoint is correct

let text;
let id;

bookItems.forEach(item => {
    item.addEventListener('click', function(event) {
        dialog.showModal();
        id = event.target.id;
        text = event.target.innerText;
        date.innerText = text;
    });
});

close.addEventListener('click', function(event) {
    dialog.close(); // Use close() to hide the dialog
});

book.addEventListener('click', function () {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let treatment = document.getElementById('treatment').value;
    console.log("V2 Code")

    if (!name || !email || !treatment) {
        alert("Please fill out all fields before booking.");
        return;
    }

    const raw = JSON.stringify({
        "id": id,
        "name": name,
        "email": email,
        "treatment": treatment,
        "booked": true
    });

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: raw,
        redirect: "follow"
    };

    fetch(apiURL, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((result) => console.log(result))
        .catch((error) => console.error('Error:', error));

        alert("Your booking has been successfully made")
});