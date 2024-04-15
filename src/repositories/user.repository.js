const UserModel = require("../models/user.model.js");
const { createHash, isValidPassword } = require("../utils/hashbcryp.js");

class UserRepository {
  async register(email, password, req) {
    const { first_name, last_name, email, age, rol } = req.body;
    try {
      let user = await this.findUser(email);
      if (user) {
        console.log("El usuario ya existe");
        return null;
      }
      let newUser = {
        first_name,
        last_name,
        email,
        age,
        rol: rol || "user",
        password: createHash(password),
      };

      let result = await UserModel.create(newUser);
      return result;
    } catch (error) {
      throw new Error("Error del servidor");
    }
  }

  async gitHubRegister(profile) {
    try {
      let user = await this.findUser(profile._json.email);

      if (user) {
        console.log("El usuario ya existe");
        return null;
      }

      let newUser = {
        first_name: profile._json.name,
        last_name: " ",
        age: undefined,
        email: profile._json.email,
        password: " ",
        rol: "user",
      };
      let result = await UserModel.create(newUser);
      return result;
    } catch (error) {
      throw new Error("Error del servidor");
    }
  }

  async findUser(email) {
    try {
      const user = await UserModel.findOne(email);
      return user;
    } catch (error) {
      throw new Error("Error del servidor");
    }
  }
}

module.exports = UserRepository;
