// addData.js
let apiResult; // Variable to store the result

const bookItem = document.querySelector('.bookItem');
const slotsContainer = document.querySelector('.slots'); // Parent container for book items

const requestOptions = {
    method: "GET",
    redirect: "follow"
};

fetch("https://indigoapi.henryannan.com/availableFuture", requestOptions)
    .then((response) => response.json()) // Parse the response as JSON
    .then((result) => {
        apiResult = result;
        for (let i = 0; i < result.length; i++) {
            let clone = bookItem.cloneNode(true); // Clone the bookItem element
            clone.innerText = result[i].date + " - " + result[i].time + " Availability"; // Update the text
            clone.id = result[i].id; // Update the id
            slotsContainer.appendChild(clone); // Append the cloned element to the parent container

            // Add event listener to the cloned element
            clone.addEventListener('click', function(event) {
                dialog.showModal();
                id = event.target.id;
                text = event.target.innerText;
                date.innerText = text;
            });
        }
    })
    .catch((error) => console.error(error));