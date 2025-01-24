const { name } = require("commander");

const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const tradeInput = document.getElementById("trade");
const tradeWarn = document.getElementById("trade-warn");

let cart = [];

// Abrir Modal Carrinho
cartBtn.addEventListener("click", () => {
    updateCartModal();
    cartModal.style.display = "flex";
});

// Fechar Modal ao clicar fora
cartModal.addEventListener("click", (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
});

closeModalBtn.addEventListener("click", () => {
    cartModal.style.display = "none";
});

// Adicionar item ao carrinho
menu.addEventListener("click", (event) => {
    const parentButton = event.target.closest(".add-to-cart-btn");

    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        addToCart(name, price);
    }
});

// Função para adicionar item ao carrinho
function addToCart(name, price) {
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        });
    }

    updateCartModal();
}

// Atualizar Modal do Carrinho
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");

        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-bold">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
                </div>
                <div>
                    <button class="remove-btn" data-name="${item.name}">Remover</button>
                </div>
            </div>
        `;

        total += item.price * item.quantity;
        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    cartCounter.textContent = cart.length;
}

// Remover item do carrinho
cartItemsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-btn")) {
        const name = event.target.getAttribute("data-name");
        removeItemCart(name);
    }
});

function removeItemCart(name) {
    const index = cart.findIndex((item) => item.name === name);

    if (index !== -1) {
        const item = cart[index];

        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart.splice(index, 1);
        }

        updateCartModal();
    }
}

// Validação do input de troca
tradeInput.addEventListener("input", (event) => {
    const inputValue = event.target.value;

    if (inputValue !== "") {
        tradeInput.classList.remove("border-red-500");
        tradeWarn.classList.add("hidden");
    }
});

// Finalizar compra
checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) return;

    if (tradeInput.value === "") {
        tradeWarn.classList.remove("hidden");
        tradeInput.classList.add("border-red-500");
        return;
    }

    const cartItems = cart
        .map((item) => ` ${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price}`)
        .join("");

    const message = encodeURIComponent(cartItems);
    const phone = "71986002861";

    window.open(`https://wa.me/${phone}?text=${message} TradeLink:${tradeInput.value}`, "_blank");

    cart = [];
    updateCartModal();
});
