const UserModel = require("../models/user.model.js");
const { createHash, isValidPassword } = require("../utils/hashbcryp.js");
const UserDTO = require("../dto/user.dto.js");
const CartRepository = require("./cart.repository.js");
const cartRepository = new CartRepository();

class UserRepository {
  async register(password, first_name, last_name, email, age, rol) {
    try {
      let user = await UserModel.findOne({ email: email });
      if (user) {
        console.log("El usuario ya existe");
        return null;
      }
      let cart = await cartRepository.createCart();
      let newUser = {
        first_name,
        last_name,
        email,
        age,
        rol: rol || "user",
        password: createHash(password),
        cart: cart._id,
        lastConnection: new Date(),
      };

      let result = await UserModel.create(newUser);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("Error del servidor", error);
    }
  }

  async gitHubRegister(profile) {
    try {
      let user = await this.findUser(profile._json.email);

      if (user) {
        console.log("El usuario ya existe");
        return null;
      }
      let cart = await cartRepository.createCart();
      let newUser = {
        first_name: profile._json.name,
        last_name: " ",
        age: undefined,
        email: profile._json.email,
        password: " ",
        rol: "user",
        cart: cart._id,
        lastConnection: new Date(),
      };
      await UserModel.create(newUser);
      const userDto = UserDTO(
        first_name,
        last_name,
        email,
        rol,
        lastConnection
      );
      return userDto;
    } catch (error) {
      throw new Error("Error del servidor");
    }
  }

  async findUser(email) {
    try {
      const user = await UserModel.findOne(email);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Error del servidor", error);
    }
  }

  async deleteUsers() {
    try {
      const users = await UserModel.find();
      const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // Hace 2 días desde ahora

      const inactiveUsers = users.filter(
        (user) => new Date(user.lastConnection) < twoDaysAgo
      );
      console.log(inactiveUsers);

      for (const user of inactiveUsers) {
        await UserModel.findByIdAndDelete(user._id);
      }

      return inactiveUsers;
    } catch (error) {
      throw new Error("Error del servidor", error);
    }
  }
}

module.exports = UserRepository;
