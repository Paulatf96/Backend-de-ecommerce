function authAdmin(req, res, next) {
  if (req.user.rol == "admin") {
    return next();
  } else {
    return res.status(403).send("Usuario no autorizado");
  }
}

function authUser(req, res, next) {
  if (req.session.user && !req.session.admin) {
    return next();
  } else {
    return res.status(403).send("Usuario no autorizado");
  }
}

function isLogued(req, res, next) {
  if (!req.session.login) {
    if (req.url !== "/register") {
      return res.redirect("/");
    } else {
      next();
    }
  } else {
    if (req.url == "/register") {
      return res.redirect("/userProducst");
    } else {
      return next();
    }
  }
}

function isLoggedLogin(req, res, next) {
  if (req.session.login) {
    res.redirect("/userProducst");
  } else {
    next();
  }
}
module.exports = {
  authAdmin,
  authUser,
  isLogued,
  isLoggedLogin,
};
