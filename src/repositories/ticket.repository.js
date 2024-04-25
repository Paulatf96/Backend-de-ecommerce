const { v4: uuidv4 } = require("uuid");
uuidv4();

const TicketModel = require("../models/ticket.model.js");

class TicketRepository {
  async createTicket(selledProducts, userEmail) {
    const ticketCode = uuidv4();
    const amount = selledProducts.reduce(
        (total, soldProduct) => total + (soldProduct.product.price * soldProduct.quantity),
        0
      );
    const newTicket = new TicketModel({
      code: ticketCode,
      amount: amount,
      purchaser: userEmail,
    });
    await newTicket.save();
    return newTicket;
  }
}

module.exports = TicketRepository;
