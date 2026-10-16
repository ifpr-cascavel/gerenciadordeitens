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
