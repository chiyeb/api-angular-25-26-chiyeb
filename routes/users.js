let User = require("../model/user");

// Authentification d'un utilisateur (POST)
function loginUser(req, res) {
  const { login, password } = req.body;

  User.findOne({ login: login, password: password }, (err, user) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    if (!user) {
      res.status(401).json({ message: "Identifiants incorrects" });
      return;
    }

    // Renvoyer l'utilisateur (sans le mot de passe pour la sécurité)
    res.json({
      login: user.login,
      email: user.email,
      role: user.role,
    });
  });
}

// Récupérer tous les utilisateurs (GET) - pour l'admin uniquement
function getUsers(req, res) {
  User.find((err, users) => {
    if (err) {
      res.send(err);
      return;
    }

    // Ne pas renvoyer les mots de passe
    const usersWithoutPassword = users.map((user) => ({
      _id: user._id,
      login: user.login,
      email: user.email,
      role: user.role,
    }));

    res.send(usersWithoutPassword);
  });
}

// Ajouter un utilisateur (POST)
function createUser(req, res) {
  let user = new User();
  user.login = req.body.login;
  user.password = req.body.password;
  user.email = req.body.email;
  user.role = req.body.role || "user";

  console.log("POST user reçu :");
  console.log(user);

  user.save((err) => {
    if (err) {
      res.status(500).send("Can't create user ", err);
      return;
    }
    res.json({ message: `User ${user.login} created!` });
  });
}

module.exports = { loginUser, getUsers, createUser };
