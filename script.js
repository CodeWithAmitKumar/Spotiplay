const switchEl = document.getElementById('switch');
const bodyEl = document.body;

switchEl.addEventListener('change', function() {
  if (this.checked) {
    bodyEl.classList.add('dark-theme');
  } else {
    bodyEl.classList.remove('dark-theme');
  }
});
switchEl.checked = false;

function resetProgressBar() {
  // Set the progress bar to start at 0 when the page loads
  document.getElementById("myProgressBar").value = 0;
}
