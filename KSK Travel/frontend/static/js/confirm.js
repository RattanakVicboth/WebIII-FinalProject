window.addEventListener('DOMContentLoaded', function() {
    // Get stored values from localStorage
    const checkInDate = localStorage.getItem('checkInDate');
    const checkOutDate = localStorage.getItem('checkOutDate');
    const guests = localStorage.getItem('guests');

    // Display values on the confirmation page
    document.querySelector('.check-in-date').textContent = checkInDate || 'Not Provided';
    document.querySelector('.check-out-date').textContent = checkOutDate || 'Not Provided';
    document.querySelector('.guest-number').textContent = guests || 'Not Provided';
});
