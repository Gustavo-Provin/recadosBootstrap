const messagesContainer = document.querySelector('.messages-list')

const prevPage = document.getElementById('prevPage')
const nextPage = document.getElementById('nextPage')

let currentPage = 1
let totalPages = 1

async function fetchMessages(page) {
  try {
    const userId = localStorage.getItem('userId')

    if (!userId) {
      alert("Você precisa fazer login para visualizar os recados.")
      return
    }

    const params = {
      page,
      perPage: 3
    }

    const response = await api.get(`/notes/${userId}`, { params })
    const messages = response.data.userMessages


    totalPages = response.data.totalPages

    messagesContainer.innerHTML = ''

    messages.forEach(message => {
      const messageCard = document.createElement('div')
      messageCard.classList.add('card')
      messageCard.classList.add('p-3')
      messageCard.classList.add('row')

      messageCard.innerHTML = `
        <h2 class="fs-5 fw-bold">${message.title}</h2>
        <p class="text-secondary">${message.description}</p>
        <div class="card-icons">
          <i onclick="addAttributeToModal('${message.id}')" class="fas fa-solid fa-trash" data-bs-toggle="modal" data-bs-target="#deleteCardModal" data-id=${message.id}></i>
          <i onclick="addAttributeToModalUpdate('${message.id}')" class="fas fa-regular fa-edit" data-bs-toggle="modal" data-bs-target="#updateCardModal" data-id=${message.id}></i>
        </div>
      `

      messagesContainer.appendChild(messageCard);
    });

    if (messages.length === 0) {
      const h3 = document.createElement('h3');
      h3.textContent = 'Nenhum recado cadastrado.';
      messagesContainer.appendChild(h3);
    }
  } catch (error) {
    console.log('Erro ao buscar mensagens', error)
  }
}

function deleteMessage() {
  deleteMessage();
}

fetchMessages(currentPage);

function addAttributeToModal(id) {
  userMessage.innerHTML = ""
  localStorage.setItem('messageToDelete', id);
}

function addAttributeToModalUpdate(id) {
  userMessage.innerHTML = ""
  localStorage.setItem('messageToUpdate', id);
  populateEditForm()
}


prevPage.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--
    fetchMessages(currentPage)
  }
})

nextPage.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    fetchMessages(currentPage)
  }
})