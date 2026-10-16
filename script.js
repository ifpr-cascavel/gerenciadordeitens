// 1. Estado da Aplicação e Mapeamento do DOM
const form = document.querySelector('#form-lancamento');
const inputDescricao = document.querySelector('#descricao');
const inputValor = document.querySelector('#valor');
const selectTipo = document.querySelector('#tipo');
const listaUl = document.querySelector('#lista-lancamentos');
const spanTotalItens = document.querySelector('#total-itens');
const spanValorTotal = document.querySelector('#valor-total');
const botoesFiltro = document.querySelectorAll('.filtros button');

// Carrega os dados salvos do localStorage ou inicia com uma lista vazia
let lancamentos = JSON.parse(localStorage.getItem('lancamentos_db')) || [];
let filtroAtual = 'todos';

// 2. Função para salvar no localStorage
const salvarStorage = () => {
  localStorage.setItem('lancamentos_db', JSON.stringify(lancamentos));
};

// 3. Função para Renderizar a Lista na Tela
const renderizar = () => {
  listaUl.innerHTML = '';

  // Filtra os elementos baseado no botão selecionado (.filter)
  const itensFiltrados = lancamentos.filter(item => {
    if (filtroAtual === 'todos') return true;
    return item.tipo === filtroAtual;
  });

  // Renderiza cada item (.forEach + Template Literals + DOM)
  itensFiltrados.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add(item.tipo);
    
    li.innerHTML = `
      <span>${item.descricao} - <strong>R$ ${item.valor.toFixed(2)}</strong></span>
      <button class="btn-deletar" onclick="removerItem(${item.id})">X</button>
    `;

    listaUl.appendChild(li);
  });

  atualizarResumo();
};

// 4. Função com Métodos de Array (.reduce) para Calcular Totais
const atualizarResumo = () => {
  spanTotalItens.textContent = lancamentos.length;

  // Uso do .reduce para somar receitas e subtrair despesas
  const valorCalculado = lancamentos.reduce((acumulador, item) => {
    return item.tipo === 'receita' 
      ? acumulador + item.valor 
      : acumulador - item.valor;
  }, 0);

  spanValorTotal.textContent = valorCalculado.toFixed(2);
};

// 5. Adicionar Novo Lançamento (Eventos e Objetos)
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const novoLancamento = {
    id: Date.now(), // Gera um ID único baseado no timestamp
    descricao: inputDescricao.value,
    valor: parseFloat(inputValor.value),
    tipo: selectTipo.value
  };

  // Imutabilidade / Adição ao array com Spread Operator
  lancamentos = [...lancamentos, novoLancamento];

  salvarStorage();
  renderizar();

  form.reset();
  inputDescricao.focus();
});

// 6. Remover Lançamento (Global scope para uso no inline onclick)
window.removerItem = (id) => {
  // Filtra removendo o item com o ID correspondente (.filter)
  lancamentos = lancamentos.filter(item => item.id !== id);
  salvarStorage();
  renderizar();
};

// 7. Eventos nos Botões de Filtro (Event Delegation / ForEach)
botoesFiltro.forEach(botao => {
  botao.addEventListener('click', (e) => {
    filtroAtual = e.target.dataset.filtro;
    renderizar();
  });
});

// Inicialização da tela ao carregar
renderizar();
