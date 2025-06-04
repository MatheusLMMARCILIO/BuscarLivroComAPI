 
// 1. Selecionar o formulário e o input
const form = document.getElementById('search-form');
const input = document.getElementById('search-input');

// 2. Ouvir o evento submit do formulário
form.addEventListener('submit', function(event) {
  event.preventDefault(); // evitar que a página recarregue
  const query = input.value.trim(); // pega o texto e tira espaços extras
  console.log('Busca por:', query); // só para testar
});


form.addEventListener('submit', function(event) {
    event.preventDefault();
    const query = input.value.trim();
  
    if (query === '') {
      alert('Digite um termo para buscar!');
      return;
    }
  
    // Monta a URL da API
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data); // veja o que retorna
        // Aqui vamos criar a função para mostrar os livros
        mostrarLivros(data);
      })
      .catch(error => {
        console.error('Erro ao buscar livros:', error);
        alert('Erro ao buscar livros. Tente novamente.');
      });
  });
  

function mostrarLivros(data) {
    const results = document.getElementById('results');
    results.innerHTML = ''; // limpa resultados antigos
  
    if (!data.items || data.items.length === 0) {
      results.innerHTML = '<p>Nenhum livro encontrado.</p>';
      return;
    }
  
    data.items.forEach(item => {
      const livro = item.volumeInfo;
  
      // Extrai dados que vamos mostrar
      const titulo = livro.title || 'Título não disponível';
      const autores = livro.authors ? livro.authors.join(', ') : 'Autor(es) não disponível(is)';
      const descricao = livro.description ? livro.description.substring(0, 200) + '...' : 'Sem descrição';
      const imagem = livro.imageLinks ? livro.imageLinks.thumbnail : '';
  
      // Cria o elemento para mostrar o livro
      const divLivro = document.createElement('div');
      divLivro.classList.add('book');
  
      divLivro.innerHTML = `
        ${imagem ? `<img src="${imagem}" alt="Capa do livro">` : ''}
        <div class="book-info">
          <h3 class="book-title">${titulo}</h3>
          <p class="book-authors">${autores}</p>
          <p class="book-description">${descricao}</p>
        </div>
      `;
  
      results.appendChild(divLivro);
    });
  }
  