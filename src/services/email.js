const nodemailer = require("nodemailer");

class EmailManager {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: "paula.tf96@gmail.com",
        pass: "dmoz ljtb gdhb rkcq",
      },
    });
  }

  async sendEmailPurchase(email, ticket) {
    try {
      const mailOptions = {
        from: "Atenea Ecommerce <paula.tf96@gmail.com>",
        to: email,
        subject: "Confirmación de compra",
        html: `<h1>Confirmación de compra</h1>
                        <p>Gracias por tu compra!</p>
                        <p>El ID de tu orden es: ${ticket}!</p>`,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error enviando el correo electrónico:", error);
    }
  }

  async sendResetEmail(email, token) {
    try {
      const mailOptions = {
        from: "Atenea Ecommerce <paula.tf96@gmail.com>",
        to: email,
        subject: "Recuperación de contraseña",
        html: `
        <p> ¡Hola! Solicitaste una nueva contraseña</p>
        <strong> ${token} </strong>
        <p> Este código expira en una hora, ingrésalo en el siguiente enlace </p>
        <a href="http://localhost:8080/changepassword"> Restablecer Contraseña </a>
        `,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error enviando el correo electrónico:", error);
    }
  }

  async sendEmailInactiveAccount(email, first_name) {
    try {
      const mailOptions = {
        from: "Atenea Ecommerce <paula.tf96@gmail.com>",
        to: email,
        subject: "Cuenta Inactiva",
        html: `<h1>Cuenta inactiva</h1>
                  <p>Hola ${first_name}, te informamos que tu cuenta ha sido eliminada por inactividad durante los últimos 2 días </p>`,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error enviando el correo electrónico:", error);
    }
  }

  async sendEmailDeletedProduct(email, id) {
    try {
      const mailOptions = {
        from: "Atenea Ecommerce <paula.tf96@gmail.com>",
        to: email,
        subject: "Producto eliminaro",
        html: `<h1>Se ha eliminado un producto</h1>
                  <p>Hola, te informamos que tu producto con id: ${id} ha sido eliminado</p>`,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error enviando el correo electrónico:", error);
    }
  }
}

module.exports = EmailManager;
