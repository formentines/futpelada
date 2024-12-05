


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
