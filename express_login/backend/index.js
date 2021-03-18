// Le backend doit etre capable de d'enregistrer un utilisateur, de le connecter, et de donner la liste des personnes inscrites uniquement si on est connecté.
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("./config");

const userModel = require("./models/user");
const mongoose = require("mongoose");


app.use(bodyParser.json());

app.listen(config.port, () => {
  console.log("server was launched on port");
});

mongoose.connect(config.mongoDB,() => {
    console.log("Database connected");
});


app.post("/users", async (req, res) => {
  try {
    //search and see if the user exists
    const user = await userModel.findOne({
      email: req.body.email,
    });
    //if the user already exists: show the error message
    if (user) {
      res.status(400).send(`email ${req.body.email} already exists`);
      return;
    }
    // verifying the username's password ------> verifier pour la 2 condition
    if (req.body.password.length < 8) {
      res.status(400).send("password is too short");
      return;
    }
    if (req.body.password !== req.body.password2) {
      res.status(400).send("password does not match");
      return;
    }
    //otherwise, create a new user
    await userModel.create({
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.password),
      firstName: req.body.firstName,
      surname: req.body.surname,
      dateOfBirth: req.body.dateOfBirth,
    });
    res.send("User has been registered");
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});
// Login steps
// check if the user exists
app.post("/login", async (req, res) => {
  const user = await userModel
    .findOne({
      email: req.body.email,
    })
    .exec();
  // check the password
  if (bcryptjs.compareSync(req.body.password, user.password)) {
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 3600,
    });
    res.status(200).json({
      message: "Sign in ok",
      token: token,
    });
  } else {
    res.status(401).send("Invalid password");
  }
}); 