const MessageModel = require("../models/message.model.js");

class MessageManager {
  async getMessages() {
    try {
      let allMessages = await MessageModel.find();
      if (!allMessages) {
        console.log("Aún no tienes mensajes");
        return null;
      }
      return allMessages;
    } catch (error) {
      console.log("Error al obtener los mensajes", error);
    }
  }

  async addMessages(newMessage) {
    try {
      if (!newMessage.user || !newMessage.message) {
        console.log("Mensaje incompleto");
        return;
      }
      let message = new MessageModel({
        user: newMessage.user,
        message: newMessage.message,
      });

      await message.save();
    } catch (error) {
      console.log("Error al enviar el mensaje", error);
    }
  }
}

module.exports = MessageManager;
