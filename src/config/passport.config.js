const passport = require("passport");
const local = require("passport-local");
const UserModel = require("../models/user.model.js");
const { createHash, isValidPassword } = require("../utils/hashbcryp.js");
const UserRepository = require("../repositories/user.repository.js");
const userRepository = new UserRepository();

const LocalStrategy = local.Strategy;
const GitHubStrategy = require("passport-github2");

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, email, age, rol } = req.body;
          let result = await userRepository.register(
            password,
            first_name,
            last_name,
            email,
            age,
            rol
          );

          if (!result) {
            return done(null, false);
          } else {
            return done(null, result);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //Estrategia para login
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          let user = await userRepository.findUser({ email: username });

          if (!user) {
            console.log("El usuario ingresado no existe");
            return done(null, false);
          }
          if (!isValidPassword(password, user)) {
            return done(null, false);
          }
          user.lastConnection = new Date();
          await user.save();
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await UserModel.findById({ _id: id });
    done(null, user);
  });

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.c843d86738123963",
        clientSecret: "69fc32d9efb96018db97d591cfbce16aee2c077a",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let result = await userRepository.gitHubRegister(profile);
          if (result) {
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

module.exports = initializePassport;
