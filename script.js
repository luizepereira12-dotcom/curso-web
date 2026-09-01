// Carrinho Simulado
let carrinho = JSON.parse(localStorage.getItem('kartaju_carrinho')) || [];

function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    localStorage.setItem('kartaju_carrinho', JSON.stringify(carrinho));
    alert(`${nome} foi adicionado ao seu carrinho!`);
}

function carregarCarrinho() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    const totalElemento = document.getElementById('total-carrinho');
    
    if (!listaCarrinho) return;

    listaCarrinho.innerHTML = '';
    let total = 0;

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = '<tr><td colspan="3">Seu carrinho está vazio.</td></tr>';
    } else {
        carrinho.forEach((item, index) => {
            total += item.preco;
            listaCarrinho.innerHTML += `
                <tr>
                    <td>${item.nome}</td>
                    <td>R$ ${item.preco.toFixed(2)}</td>
                    <td><button onclick="removerDoCarrinho(${index})" class="btn-red" style="padding: 5px 10px;">Remover</button></td>
                </tr>
            `;
        });
    }

    if (totalElemento) {
        totalElemento.innerText = `R$ ${total.toFixed(2)}`;
    }
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    localStorage.setItem('kartaju_carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    alert("Compra realizada com sucesso! A Kartaju agradece.");
    carrinho = [];
    localStorage.removeItem('kartaju_carrinho');
    carregarCarrinho();
}

document.addEventListener('DOMContentLoaded', carregarCarrinho);