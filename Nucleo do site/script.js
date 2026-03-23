// Banco de dados simulado das suas peças
const produtos = [
    {
        id: 1,
        nome: "Kit Pistão e Anéis Standard",
        preco: 189.90,
        imagem: "https://images.unsplash.com/photo-1617300762956-62ce9d0339d1?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 2,
        nome: "Carburador Completo 150cc",
        preco: 245.50,
        imagem: "https://images.unsplash.com/photo-1628169443585-6110f03126be?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 3,
        nome: "Kit Biela com Rolamento",
        preco: 135.00,
        imagem: "https://images.unsplash.com/photo-1590518776829-4fbceebed1b8?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 4,
        nome: "Vela de Ignição Iridium",
        preco: 65.90,
        imagem: "https://images.unsplash.com/photo-1616421458288-662580dfc71e?auto=format&fit=crop&q=80&w=400"
    }
];

let carrinho = 0;

// Agora a função recebe uma lista (por padrão, usa todos os 'produtos')
function renderizarProdutos(lista = produtos) {
    const grid = document.getElementById('product-list');
    grid.innerHTML = ''; 

    // Mensagem caso a pesquisa não encontre nada
    if (lista.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #aaa;">Nenhuma peça encontrada com esse nome.</p>';
        return;
    }

    lista.forEach(produto => {
        const precoFormatado = produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        const cardHTML = `
            <div class="product-card">
                <img src="${produto.imagem}" alt="${produto.nome}" class="product-image">
                <h3 class="product-title">${produto.nome}</h3>
                <div class="product-price">${precoFormatado}</div>
                <button class="btn-buy" onclick="adicionarAoCarrinho(${produto.id})">
                    Comprar
                </button>
            </div>
        `;
        
        grid.innerHTML += cardHTML;
    });
}

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

// === NOVO: Lógica da Barra de Pesquisa ===
document.getElementById('search-input').addEventListener('input', (evento) => {
    // Pega o que foi digitado e transforma tudo em minúsculo para facilitar a busca
    const termoBusca = evento.target.value.toLowerCase();
    
    // Filtra os produtos que contém o texto digitado no nome
    const produtosFiltrados = produtos.filter(produto => 
        produto.nome.toLowerCase().includes(termoBusca)
    );
    
    // Manda desenhar na tela apenas os produtos encontrados
    renderizarProdutos(produtosFiltrados);
});

// Inicia a loja assim que a página carregar
window.onload = () => renderizarProdutos();