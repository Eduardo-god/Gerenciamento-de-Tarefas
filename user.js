document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registrationForm = document.getElementById('registrationForm');
    const messageElement = document.getElementById('message');
    const loginMessageElement = document.getElementById('loginMessage');
  
    // Cadastro de usuário
    if (registrationForm) {
      registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();
  
        const name = document.getElementById('name').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
  
        // Validação de senha
        if (password !== confirmPassword) {
          messageElement.textContent = 'As senhas não coincidem.';
          return;
        }
  
        // Verificar se o usuário já existe
        if (localStorage.getItem(name)) {
          messageElement.textContent = 'Nome de usuário já existe.';
          return;
        }
  
        // Salvar o usuário no LocalStorage
        const user = { name, password };
        localStorage.setItem(name, JSON.stringify(user));
  
        // Mensagem de sucesso
        messageElement.style.color = 'green';
        messageElement.textContent = 'Cadastro realizado com sucesso!';
  
        // Limpar o formulário
        registrationForm.reset();
      });
    }
  
    // Login do usuário
    if (loginForm) {
      loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
  
        const loginName = document.getElementById('loginName').value;
        const loginPassword = document.getElementById('loginPassword').value;
  
        // Verificar se o usuário existe
        const storedUser = localStorage.getItem(loginName);
        if (!storedUser) {
          loginMessageElement.textContent = 'Usuário não encontrado.';
          return;
        }
  
        const user = JSON.parse(storedUser);
  
        // Verificar senha
        if (user.password === loginPassword) {
          loginMessageElement.style.color = 'green';
          loginMessageElement.textContent = 'Login bem-sucedido!';
          // Redirecionar para uma página de boas-vindas ou outra
          window.location.href = 'tarefa.html'; // Exemplo de redirecionamento
        } else {
          loginMessageElement.textContent = 'Senha incorreta.';
        }
      });
    }
  });