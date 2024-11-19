// Espera o carregamento completo do DOM antes de executar o código
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona o formulário e "escuta" o evento 'submit'
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault(); // Faz com que a página não recarregue

        // Coleta de dados do formulário
        const formData = {
            username: document.querySelector('#username').value,
            email: document.querySelector('#email').value,
            dia: document.querySelector('#dia').value,
            mes: document.querySelector('#mes').value,
            ano: document.querySelector('#ano').value,
            password: document.querySelector('#password').value,
            confirmPassword: document.querySelector('#confirm-password').value
        };

        // Enviando dados para o backend Flask
        fetch('/cadastrar', {  // Altere '/cadastrar' para o endpoint correto
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData) // Converte o objeto formData para JSON
        })
        .then(response => {
            if (response.ok) {
                // Redireciona para a página de filiação
                window.location.href = '/templates/tela_filiacao.html'; 
            } else {
                alert('Falha no cadastro. Tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    });
});