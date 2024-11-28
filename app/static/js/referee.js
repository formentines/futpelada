document.getElementById('profile_picture_input').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Obtém o arquivo selecionado
    if (file) {
        const reader = new FileReader();

        // Quando o arquivo for carregado, atualize a pré-visualização
        reader.onload = function(e) {
            document.getElementById('profile_picture_preview').src = e.target.result;
        };

        reader.readAsDataURL(file); // Converte o arquivo em uma URL para exibição
    }
});

const uploadInput = document.getElementById('upload');
const profilePicture = document.getElementById('profile-picture');

uploadInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profilePicture.innerHTML = `<img src="${e.target.result}" alt="Foto de perfil">`;
    };
    reader.readAsDataURL(file);
  }
});
