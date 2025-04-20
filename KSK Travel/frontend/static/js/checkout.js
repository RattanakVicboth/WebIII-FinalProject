// checkout.js

document.addEventListener('DOMContentLoaded', function() {
  // Get the Complete Checkout button (ensure it exists in your HTML)
  const completeCheckoutButton = document.querySelector('.btn-orange');
  
  completeCheckoutButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Collect personal details from the form
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const checkin = document.getElementById('checkin').value;      // expecting YYYY-MM-DD
    const checkout = document.getElementById('checkout').value;    // expecting YYYY-MM-DD
    
    // Collect hotel reservation details from the form
    const roomType = document.getElementById('room_type').value;
    const roomNumber = document.getElementById('room_number').value;
    const personNumber = document.getElementById('person_number').value;
    const childNumber = document.getElementById('child_number').value;
    const resFacilities = document.getElementById('res_facilities').value;
    
    // Basic validation: Check required fields
    if (!name || !email || !address || !checkin || !checkout || roomType === "0") {
      alert('Please complete all required fields.');
      return;
    }
    
    // Prepare the full booking data object
    const bookingData = {
      name: name,
      email: email,
      address: address,
      checkin: checkin,
      checkout: checkout,
      room_type: roomType,
      room_number: roomNumber,
      person_number: personNumber,
      child_number: childNumber,
      res_facilities: resFacilities
    };

    // First, check room availability by sending room type and dates to the backend
    fetch('/reservation/check_availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        room_type: roomType,
        checkin: checkin,
        checkout: checkout
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.available === false) {
        // If the room is unavailable, show a message and do not proceed with booking.
        alert('Room unavailable. Please choose a different room type or adjust your dates.');
      } else {
        // Room is available, proceed to send the full booking data to the server.
        fetch('/reservation/hotel_reservation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingData)
        })
        .then(res => res.json())
        .then(resData => {
          if (resData.success) {
            // On successful booking, notify the user and redirect to the service page.
            alert('Booking successful!');
            window.location.href = '/service';
          } else {
            // If the booking fails, display an error message.
            alert('Booking error: ' + resData.message);
          }
        })
        .catch(error => {
          console.error('Error during booking:', error);
          alert('An error occurred during booking. Please try again later.');
        });
      }
    })
    .catch(error => {
      console.error('Error checking availability:', error);
      alert('Failed to check room availability. Please try again later.');
    });
  });
});
