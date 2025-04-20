// static/js/cancel.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cancelForm');
    const msgDiv = document.getElementById('cancelMessage');
  
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const resId = document.getElementById('resId').value.trim();
  
      if (!resId) {
        msgDiv.innerHTML = '<div class="alert alert-warning">Please enter a reservation ID.</div>';
        return;
      }
  
      fetch('/reservation/cancel_reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reservation_id: resId })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          msgDiv.innerHTML = '<div class="alert alert-success">Reservation #'+resId+' cancelled successfully.</div>';
        } else {
          msgDiv.innerHTML = `<div class="alert alert-danger">${data.message || 'Unable to cancel.'}</div>`;
        }
      })
      .catch(err => {
        console.error('Cancel error:', err);
        msgDiv.innerHTML = '<div class="alert alert-danger">Server error. Please try again later.</div>';
      });
    });
  });
  