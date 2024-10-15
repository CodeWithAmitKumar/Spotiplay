const switchEl = document.getElementById('switch');
const bodyEl = document.body;

switchEl.addEventListener('change', function() {
  if (this.checked) {
    bodyEl.classList.add('dark-theme');
  } else {
    bodyEl.classList.remove('dark-theme');
  }
});