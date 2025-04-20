// dom controllers
const promoHandler = document.getElementById('promo');
const promoHolder = document.getElementById('promo-holder');
const promoCloser = document.getElementById('promo-closer');

promoHandler.addEventListener('click', () => {
    promoHolder.classList.toggle('active');
    promoHandler.classList.toggle('inactive');
});

promoCloser.addEventListener('click', () => {
    promoHolder.classList.toggle('active');
    promoHandler.classList.toggle('inactive');
});

document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(event) {
        // Prevent form from submitting
        event.preventDefault();

        // Get the input values for check-in, check-out, and guests
        const checkIn = document.querySelector('input[name="check-in"]').value;
        const checkOut = document.querySelector('input[name="check-out"]').value;
        const guests = document.querySelector('input[name="guests"]').value;

        // Store values in localStorage
        localStorage.setItem('checkInDate', checkIn);
        localStorage.setItem('checkOutDate', checkOut);
        localStorage.setItem('guests', guests);

        // Redirect to the reservation or confirm page
        const action = form.getAttribute('action');
        window.location.href = action;
    });
});
document.querySelectorAll('.book-now').forEach(button => {
    button.addEventListener('click', function() {
        window.location.href = 'Table.html';
    });
});
