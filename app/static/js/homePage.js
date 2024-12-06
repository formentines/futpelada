


document.addEventListener('DOMContentLoaded', () => {
  carregarPartidas();
});

// Função para carregar as partidas
function carregarPartidas() {
  // Dados fictícios para simulação
  const partidas = [
      { nome: "Time A vs Time B", data: "01/01/2024", hora: "14:00" },
      { nome: "Time C vs Time D", data: "05/01/2024", hora: "16:00" },
      { nome: "Time E vs Time F", data: "10/01/2024", hora: "18:00" },
      { nome: "Time A vs Time B", data: "01/01/2024", hora: "14:00" },
      { nome: "Time C vs Time D", data: "05/01/2024", hora: "16:00" },
      { nome: "Time E vs Time F", data: "10/01/2024", hora: "18:00" }
  ];

  // Seleciona o container onde as partidas serão exibidas
  const listaPartidas = document.querySelector('.lista-partidas');
  listaPartidas.innerHTML = ""; // Limpa as partidas anteriores

  // Loop para adicionar as partidas à lista
  partidas.forEach(partida => {
      // Cria o card da partida
      const card = document.createElement('div');
      card.classList.add('partida-card');

      // Adiciona o conteúdo da partida
      card.innerHTML = `
          <p>${partida.nome}</p>
          <p>${partida.data}</p>
          <p>${partida.hora}</p>
      `;

      // Adiciona o card na lista
      listaPartidas.appendChild(card);
  });
}


// Mockup do perfil (simulando dados vindos do backend)
const perfilBackend = {
  nome: "João Silva",
  email: "joao@dominio.com",
  bio: "Apaixonado por futebol.",
  fotoPerfil: "profile-pic.jpg" // Simulando o caminho da foto
};

// Carregar os dados do perfil no HTML
window.onload = () => {
  document.getElementById('profilePic').src = perfilBackend.fotoPerfil;
  document.getElementById('username').textContent = perfilBackend.nome;
  document.getElementById('email').textContent = `Email: ${perfilBackend.email}`;
  document.getElementById('bio').textContent = `Bio: ${perfilBackend.bio}`;
};

// Alternar entre exibição e edição do perfil
document.getElementById('editProfileBtn').addEventListener('click', () => {
  document.querySelector('.profile-info').style.display = 'none';
  document.querySelector('.edit-profile-form').style.display = 'block';
  
  // Preencher o formulário com os dados atuais
  document.getElementById('editUsername').value = perfilBackend.nome;
  document.getElementById('editEmail').value = perfilBackend.email;
  document.getElementById('editBio').value = perfilBackend.bio;
});

// Salvar as alterações do perfil
document.getElementById('editProfileForm').addEventListener('submit', (event) => {
  event.preventDefault();

  // Obter os dados do formulário
  const nome = document.getElementById('editUsername').value;
  const email = document.getElementById('editEmail').value;
  const bio = document.getElementById('editBio').value;
  const fotoPerfil = document.getElementById('editProfilePic').files[0]; // Foto selecionada

  // Enviar os dados para o backend (usando um método como fetch)
  const formData = new FormData();
  formData.append('username', nome);
  formData.append('email', email);
  formData.append('bio', bio);
  if (fotoPerfil) formData.append('profilePic', fotoPerfil);

  // Exemplo de requisição para atualizar os dados no backend (ajustar a URL e método conforme necessário)
  fetch('/update-profile', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          // Atualizar a interface com os novos dados
          perfilBackend.nome = nome;
          perfilBackend.email = email;
          perfilBackend.bio = bio;
          if (fotoPerfil) perfilBackend.fotoPerfil = URL.createObjectURL(fotoPerfil);

          document.getElementById('profilePic').src = perfilBackend.fotoPerfil;
          document.getElementById('username').textContent = perfilBackend.nome;
          document.getElementById('email').textContent = `Email: ${perfilBackend.email}`;
          document.getElementById('bio').textContent = `Bio: ${perfilBackend.bio}`;
          
          // Voltar para a visualização do perfil
          document.querySelector('.profile-info').style.display = 'block';
          document.querySelector('.edit-profile-form').style.display = 'none';
      } else {
          alert('Erro ao salvar perfil');
      }
  })
  .catch(error => {
      console.error('Erro:', error);
      alert('Erro ao atualizar perfil');
  });
});
