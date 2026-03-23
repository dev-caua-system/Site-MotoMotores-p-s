// === BANCO DE DADOS SIMULADO (LocalStorage) ===
// Se não existir nada salvo, ele cria a lista inicial para você não ver a loja vazia
if (!localStorage.getItem('moto_produtos')) {
    const produtosIniciais = [
        { id: 1, nome: "Kit Pistão e Anéis Standard", precoCompra: 100.00, preco: 189.90, imagem: "https://images.unsplash.com/photo-1617300762956-62ce9d0339d1?auto=format&fit=crop&q=80&w=400", estoque: 5 },
        { id: 2, nome: "Carburador Completo 150cc", precoCompra: 150.00, preco: 245.50, imagem: "https://images.unsplash.com/photo-1628169443585-6110f03126be?auto=format&fit=crop&q=80&w=400", estoque: 2 },
        { id: 3, nome: "Kit Biela com Rolamento", precoCompra: 80.00, preco: 135.00, imagem: "https://images.unsplash.com/photo-1590518776829-4fbceebed1b8?auto=format&fit=crop&q=80&w=400", estoque: 0 }, // Sem estoque
        { id: 4, nome: "Vela de Ignição Iridium", precoCompra: 30.00, preco: 65.90, imagem: "https://images.unsplash.com/photo-1616421458288-662580dfc71e?auto=format&fit=crop&q=80&w=400", estoque: 15 }
    ];
    localStorage.setItem('moto_produtos', JSON.stringify(produtosIniciais));
}

// Carrega os produtos da memória
let produtos = JSON.parse(localStorage.getItem('moto_produtos'));
let carrinho = 0;

// Função para desenhar os produtos na tela
function renderizarProdutos(lista = produtos) {
    const grid = document.getElementById('product-list');
    grid.innerHTML = ''; 

    if (lista.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #aaa; font-size: 1.2em;">Nenhuma peça encontrada.</p>';
        return;
    }

    lista.forEach(produto => {
        const precoFormatado = produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        
        // Regras de Estoque
        const temEstoque = produto.estoque > 0;
        const textoBotao = temEstoque ? "Comprar" : "Esgotado";
        const classeBotao = temEstoque ? "btn-buy" : "btn-buy disabled";
        const estiloBotao = temEstoque ? "" : "background-color: #555; cursor: not-allowed;";
        const desabilitar = temEstoque ? "" : "disabled";

        const cardHTML = `
            <div class="product-card">
                <img src="${produto.imagem}" alt="${produto.nome}" class="product-image">
                <h3 class="product-title">${produto.nome}</h3>
                <div class="product-price">${precoFormatado}</div>
                <p style="color: #888; font-size: 0.8em; margin-bottom: 10px;">Disponível: ${produto.estoque} un.</p>
                <button class="${classeBotao}" onclick="adicionarAoCarrinho(${produto.id})" ${desabilitar} style="${estiloBotao}">
                    ${textoBotao}
                </button>
            </div>
        `;
        
        grid.innerHTML += cardHTML;
    });
}

// Lógica do Carrinho
function adicionarAoCarrinho(idProduto) {
    carrinho++; 
    document.getElementById('cart-count').innerText = carrinho; 
    
    const botoes = document.querySelectorAll('.btn-buy');
    const botaoClicado = Array.from(botoes).find(btn => btn.getAttribute('onclick').includes(idProduto));
    
    if (botaoClicado) {
        const textoOriginal = botaoClicado.innerText;
        botaoClicado.innerText = "Adicionado!";
        botaoClicado.style.backgroundColor = "#4CAF50"; 
        
        setTimeout(() => {
            botaoClicado.innerText = textoOriginal;
            botaoClicado.style.backgroundColor = ""; 
        }, 1500);
    }
}

// Lógica da Barra de Pesquisa
document.getElementById('search-input').addEventListener('input', (evento) => {
    const termoBusca = evento.target.value.toLowerCase();
    const produtosFiltrados = produtos.filter(produto => 
        produto.nome.toLowerCase().includes(termoBusca)
    );
    renderizarProdutos(produtosFiltrados);
});

// Inicia a loja ao carregar a página
window.onload = () => renderizarProdutos();
