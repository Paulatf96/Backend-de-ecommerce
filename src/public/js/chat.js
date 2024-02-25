const socket = io();
socket.on("saveMessages", (data) => {
    renderMessages(data);
  });
  
  document.getElementById("sendMessageButton").addEventListener("click", () => {
    sendMessage();
  });
  // document.getElementById("email").addEventListener("change", (e) => {
  //   addUser(e.target.value);
  // });
  
  // const addUser = (user) => {
  //   document.getElementById("sendMessageButton").addEventListener("click", () => {
  //     sendMessage(user);
  //   });
  // };
  
  const sendMessage = () => {
    let inputUser = document.getElementById("email");
    let user = inputUser.value;
  
    let inputElement = document.getElementById("message");
    let valorInput = inputElement.value;
    let newMessage = {
      user: user,
      message: valorInput,
    };
    socket.emit("addMessage", newMessage);
  };
  
  const renderMessages = (messages) => {
    console.log(messages)
    const container = document.getElementById("messagesContainer");
    container.innerHTML = "";
    if (!messages.length) {
      container.innerHTML = "Aún no hay mensajes";
      return;
    }
  
    messages.forEach((message) => {
      const card = document.createElement("div");
      card.innerHTML = `
      <p>${message.user}</p>
      <p>${message.message}</p>
      `;
      container.appendChild(card);
    });
  };
  