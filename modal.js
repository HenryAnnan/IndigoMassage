// modal.js
const dialog = document.getElementById('dialog');
const close = document.getElementById('close');
const bookItems = document.querySelectorAll('.bookItem');
const date = document.getElementById('date-display');
const form = document.getElementById('booking-form'); // Assuming the form has an id of 'booking-form'

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

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let treatment = document.getElementById('treatment').value.trim();

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
        .then((result) => {
            console.log(result);
            alert("Booking made successfully");
            dialog.close()
            location.reload()
        })
        .catch((error) => console.error('Error:', error));
});