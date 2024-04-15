function authAdmin(req, res, next) {
  if (req.session.user && req.session.admin) {
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
  if (req.session.login) {
    return next();
  } else {
    if (req.url !== "/register") {
      return res.redirect("/");
    } else {
      return res.redirect("/register");
    }
  }
}
module.exports = {
  authAdmin,
  authUser,
  isLogued,
};
