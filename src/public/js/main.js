const socket = io();
const rol = document.getElementById("rol").textContent;
const email = document.getElementById("email").textContent;

socket.on("products", (data) => {
  render(data.payload);
  console.log(data.payload);
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
      if (rol === "premium" && element.owner === email) {
        deleteProduct(element._id);
      } else if (rol === "admin") {
        deleteProduct(element._id);
      } else {
        alert("No puedes eliminar el producto");
      }
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
  const owner = rol === "premium" ? email : "admin";

  const product = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    img: document.getElementById("img").value,
    code: document.getElementById("code").value,
    stock: document.getElementById("stock").value,
    category: document.getElementById("category").value,
    status: document.getElementById("status").value,
    owner,
  };

  socket.emit("addProduct", product);
};
