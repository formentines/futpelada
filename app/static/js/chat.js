// Enviar mensagem para o backend
document.querySelector('.chat-input button').addEventListener('click', async () => {
    const chatInput = document.querySelector('.chat-input input');
    const message = chatInput.value.trim();

    if (message !== '') {
        // Enviar mensagem com POST para a API
        const response = await fetch('https://seu-backend.com/api/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (response.ok) {
            chatInput.value = ''; // Limpa o input após envio
        } else {
            console.error('Erro ao enviar mensagem');
        }
    }
});

// Receber mensagens (use setInterval para checar periodicamente ou assine eventos se disponível)
async function fetchMessages() {
    const response = await fetch('https://seu-backend.com/api/messages');
    if (response.ok) {
        const messages = await response.json();
        const chatMessages = document.querySelector('.chat-messages');
        chatMessages.innerHTML = ''; // Limpa mensagens antigas
        messages.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('chat-message', msg.sender === 'user' ? 'sent' : 'received');
            messageDiv.innerHTML = `<span>${msg.text}</span>`;
            chatMessages.appendChild(messageDiv);
        });
        chatMessages.scrollTop = chatMessages.scrollHeight; // Rolagem automática
    }
}

// Chama a função para buscar mensagens periodicamente
setInterval(fetchMessages, 2000);

const socket = new WebSocket('wss://seu-backend.com/socket');

socket.onopen = () => {
    console.log('Conectado ao servidor');
};

socket.onmessage = (event) => {
    const chatMessages = document.querySelector('.chat-messages');
    const newMessage = document.createElement('div');
    newMessage.classList.add('chat-message', 'received');
    newMessage.innerHTML = `<span>${event.data}</span>`;
    chatMessages.appendChild(newMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

document.querySelector('.chat-input button').addEventListener('click', () => {
    const chatInput = document.querySelector('.chat-input input');
    const message = chatInput.value.trim();

    if (message !== '') {
        socket.send(message); // Envia mensagem ao servidor
        chatInput.value = ''; // Limpa o input após envio
    }
});

// Enviar mensagem pressionando "Enter"
document.querySelector('.chat-input input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.querySelector('.chat-input button').click();
    }
});
