const formNewMessage = document.getElementById('form-new-message')
const title = document.getElementById('title')
const description = document.getElementById('description')

formNewMessage.addEventListener('submit', (event) => {
  event.preventDefault() 

  const userId = localStorage.getItem('userId');

  if (!userId) {
    alert('Você precisa fazer login para cadastrar um recado.');
  }

  if(title.value && description.value) {

    const newMessage = {
      title: title.value,
      description: description.value,
      userId
    }
    createNewMessage(newMessage)
  }
})

async function createNewMessage(message) {
  try {
    const response = await api.post('/notes', message)

    if (response.status === 201) {
      setAlert("Recado criado com sucesso!", 'success');
      fetchMessages(1);
      title.value = ""
      description.value = ""
    }
  } catch (error) {
    console.log('Erro ao cadastrar recado', error)
  }
}