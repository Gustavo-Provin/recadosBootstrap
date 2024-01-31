async function deleteMessage() {
  try {
    const id = localStorage.getItem('messageToDelete');
    const response = await api.delete(`/notes/${id}`);

    if (response.status === 200) {
      buttonsModal.innerHTML = ""
      buttonsModal.innerHTML = 
      `<div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>`;
    }

    setTimeout(() => {
      buttonsModal.innerHTML = ""
      buttonsModal.innerHTML = 
      `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
      <button id="removeCardButton" onclick="deleteMessage()" type="button" class="btn btn-primary">Apagar</button>`;

      location.reload();
    }, 1000);

  } catch (error) {
    userMessage.innerHTML = `<p class="text-danger text-center">Erro ao excluir recado</p>`;
    console.log('Erro ao excluir recado', error)
  }
}