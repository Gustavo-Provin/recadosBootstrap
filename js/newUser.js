const formNewUser = document.getElementById('form-new-user');

const nameInput = document.getElementById('nome-user');
const email     = document.getElementById('email-user');
const password1 = document.getElementById('password');
const password2 = document.getElementById('secondPassword');

formNewUser.addEventListener('submit', (e) => {
  e.preventDefault()

  if(password1.value !== password2.value) {
    setAlertModal("Senhas não são iguais", 'danger');
    return;
  }

  if(password1.lenght > 6) {
    setAlertModal("Senha deve ter no minimo 5 carcteres", 'danger');
    return;
  }

  const newUser = {
    name: nameInput.value,
    email: email.value,
    password: password1.value,
  }

  addNewUser(newUser);
  
  e.target.reset();
})

async function addNewUser(newUser) {
  try {
    const response = await api.post('/users/signup', newUser)
    
    if (response.status === 201) {
      document.querySelector('.modal-backdrop').remove();
      createUserCardModal.classList.remove('show');
      setAlert('Usuário criado com sucesso', 'success');
    }
  } catch (error) {
    setAlertModal(error.response.data.message, 'danger');
  }
}