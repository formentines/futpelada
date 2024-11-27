// Função para validar email e senha
function validarFormulario() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido.');
        return false;
    }

    if (senha.length < 6) {
        alert('A senha deve ter no mínimo 6 caracteres.');
        return false;
    }

    return true;
}

// Função para exibir ou ocultar a senha
function toggleSenha() {
    const senhaInput = document.getElementById('senha');
    const toggleButton = document.getElementById('togglePassword');

    if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        toggleButton.src = '/app/static/images/olho_mostrar.png'; // Ícone de olho aberto
        toggleButton.alt = 'Ocultar Senha'; // Alterar o texto alternativo
    } else {
        senhaInput.type = 'password';
        toggleButton.src = '/app/static/images/olho_ocultar.png'; // Ícone de olho fechado
        toggleButton.alt = 'Mostrar Senha'; // Alterar o texto alternativo
    }
}

// Função para enviar o formulário com Ajax
function enviarFormulario(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    if (!validarFormulario()) {
        return; // Se a validação falhar, não envia o formulário
    }

    const form = document.querySelector('form');
    const formData = new FormData(form);

    // Envia o formulário para o backend (Flask) via Ajax
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Login realizado com sucesso!');
            // Redirecionar ou fazer alguma ação após o login bem-sucedido
        } else {
            alert('Erro no login: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Erro no envio:', error);
        alert('Ocorreu um erro no envio do formulário.');
    });
}

// Adiciona os event listeners
document.getElementById('togglePassword').addEventListener('click', toggleSenha);
document.querySelector('form').addEventListener('submit', enviarFormulario);