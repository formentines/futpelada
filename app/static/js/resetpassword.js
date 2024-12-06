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