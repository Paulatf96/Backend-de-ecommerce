const socket = io();

socket.on("products", (data) => {
  render(data);
  console.log(data);
});

const render = (products) => {
  const productsContainer = document.getElementById("realTimeContainer");
  productsContainer.innerHTML = "";
  products.forEach((element) => {
    const card = document.createElement("div");
    card.className = "cardProducts";
    card.innerHTML = `
        <p> ${element.title}</p>
        <p> ${element.category}</p>
        <p> ${element.price}</p>
        <button class="deleteButton"> Eliminar </button>
        `;
    productsContainer.appendChild(card);
    card.querySelector("button").addEventListener("click", () => {
      deleteProduct(element._id);
    });
  });
};

const deleteProduct = (id) => {
  socket.emit("delete", id);
};

document.getElementById("sendButton").addEventListener("click", () => {
  addProduct();
});

const addProduct = () => {
  const product = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    img: document.getElementById("img").value,
    code: document.getElementById("code").value,
    stock: document.getElementById("stock").value,
    category: document.getElementById("category").value,
    status: document.getElementById("status").value,
  };

  socket.emit("addProduct", product);
};

