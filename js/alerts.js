
function setAlert(message, type) {

  alertContainer.innerHTML = 
  `<div class="alert alert-${type} alert-dismissible" role="alert">
    <div>${message}</div>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`

  setTimeout(() => {
    alertContainer.innerHTML = ""
  }, 5000)
}

function setAlertModal(message, type) {

  userMessage.innerHTML = 
    `<div class="alert alert-${type} alert-dismissible" role="alert">
      <div>${message}</div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
}

