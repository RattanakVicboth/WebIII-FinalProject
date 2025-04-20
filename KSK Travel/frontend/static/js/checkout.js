// static/js/checkout.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('checkoutForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Collect personal details
    const name         = document.getElementById('name').value.trim();
    const email        = document.getElementById('email').value.trim();
    const address      = document.getElementById('address').value.trim();
    const checkin      = document.getElementById('checkin').value;
    const checkout     = document.getElementById('checkout').value;

    // Collect reservation details
    const roomType     = document.getElementById('room_type').value;
    const roomNumber   = parseInt(document.getElementById('room_number').value, 10);
    const personNumber = parseInt(document.getElementById('person_number').value, 10);
    const childNumber  = parseInt(document.getElementById('child_number').value, 10);

    // Basic validation
    if (!name || !email || !address || !checkin || !checkout || roomType === "0") {
      alert('Please complete all required fields.');
      return;
    }

    const bookingData = {
      name,
      email,
      address,
      checkin,
      checkout,
      room_type: roomType,
      room_number: roomNumber,
      person_number: personNumber,
      child_number: childNumber,
      res_facilities: 0  // or whatever default/checkbox value
    };

    // 1) Check availability
    fetch('/reservation/check_availability', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        room_type: roomType,   // now a string
        checkin,
        checkout,
        room_number: roomNumber
      })
    })    
    .then(r => r.json())
    .then(data => {
      if (!data.can_book) {
        alert(
          data.available_rooms > 0
            ? `Only ${data.available_rooms} room(s) left.`
            : 'No rooms available for those dates.'
        );
        throw 'no-book';  // bail out
      }
      // 2) Submit booking
      return fetch('/reservation/hotel_reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
    })
    .then(r => r && r.json())
    .then(resData => {
      if (resData && resData.success) {
        alert(`Booking successful! Your ID is ${resData.reservation_id}`);
        window.location.href = '/service';
      } else if (resData) {
        alert('Booking failed: ' + resData.message);
      }
    })
    .catch(err => {
      if (err !== 'no-book') {
        console.error(err);
        alert('An unexpected error occurred.');
      }
    });
  });
});
