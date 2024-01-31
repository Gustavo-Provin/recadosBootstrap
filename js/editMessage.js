const formEditMessage = document.getElementById('form-edit-message')
const titleInput = document.getElementById('title-edit')
const descriptionInput = document.getElementById('description-edit')

let messageId = ""

function setMessageId() {
  messageId = localStorage.getItem("messageToUpdate");
}

async function populateEditForm() {
  try {
    setMessageId()
    const response = await api.get(`/notes/list/${messageId}`);
    const message = response.data;

    titleInput.value = message.title;
    descriptionInput.value = message.description;

  } catch (error) {
    console.log('Erro ao buscar recado', error);
  }
}

formEditMessage.addEventListener('submit', (event) => {
  event.preventDefault()

  const titleValue = titleInput.value
  const descriptionValue = descriptionInput.value

  if(titleValue && descriptionValue) {
    const editMessage = {
      title: titleValue,
      description: descriptionValue
    }
    updateMessage(messageId, editMessage)
  }
})

async function updateMessage(messageId, editMessage) {
  console.log(messageId)
  try {
    const response = await api.put(`/notes/${messageId}`, editMessage)

    if (response.status === 200) {
      setAlert("Recado atulizado com sucesso!", 'success');
      fetchMessages(currentPage);
    }

  } catch (error) {
    console.log('Erro ao atualizar recado.')
  }
}