// calendar.js

// Function to set the default date values
function setDefaultDates() {
    const today = new Date();
    const onwardDate = new Date();
    onwardDate.setDate(today.getDate() + 2); // Set onward date 2 days later

    const returnDate = new Date();
    returnDate.setDate(today.getDate() + 4); // Set return date 4 days later

    document.getElementById('onward-date').value = onwardDate.getDate();
    document.getElementById('onward-month').textContent = onwardDate.toLocaleString('default', { month: 'short' });
    document.getElementById('onward-day').textContent = onwardDate.toLocaleString('default', { weekday: 'short' });

    document.getElementById('return-date').value = returnDate.getDate();
    document.getElementById('return-month').textContent = returnDate.toLocaleString('default', { month: 'short' });
    document.getElementById('return-day').textContent = returnDate.toLocaleString('default', { weekday: 'short' });
}

// Function to handle user input change for onward date
function updateOnwardDate() {
    const onwardDate = new Date(document.getElementById('onward-date').value);
    document.getElementById('recent-onward-date').textContent = formatDate(onwardDate);
}

// Function to handle user input change for return date
function updateReturnDate() {
    const returnDate = new Date(document.getElementById('return-date').value);
    document.getElementById('recent-return-date').textContent = formatDate(returnDate);
}

// Function to format date to "dd / mm / yyyy" format
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`;
}

// Set default dates when the page loads
function setDefaultDates() {
    const today = new Date();
    const onwardDate = new Date();
    onwardDate.setDate(today.getDate() + 2); // Onward date is 2 days from today
    const returnDate = new Date();
    returnDate.setDate(today.getDate() + 4); // Return date is 4 days from today

    // Set default dates for the date pickers
    document.getElementById('onward-date').valueAsDate = onwardDate;
    document.getElementById('return-date').valueAsDate = returnDate;

    // Update Recent Search with default dates
    document.getElementById('recent-onward-date').textContent = formatDate(onwardDate);
    document.getElementById('recent-return-date').textContent = formatDate(returnDate);
}

window.onload = setDefaultDates;

