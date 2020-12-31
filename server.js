import express from "express";
import bodyParser from "body-parser";
import db from "./sequelize/models/index.cjs";
import bcrypt from "bcrypt";
import passport from "passport";

const app = express();
const port = process.env.PORT || 5000;

const saltRounds = 12;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// check the databse connection
db.sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

const getAllUsers = async () => {
  return await db["User"].findAll();
};

const createUser = async ({ firstName, lastName, email, password }) => {
  return await db["User"].create({ firstName, lastName, email, password });
};

const findUserWithPassword = async (userEmail, password) => {
  return await db["User"]
    .findOne({
      where: {
        email: userEmail,
      },
    })
    .then((user) => {
      if (!user) {
        console.log("No user with this email");
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result == true) {
            res.send("Success");
          } else {
            res.send("Incorrect password");
          }
        });
      }
    });
};

app.get("/users", (req, res) => {
  getAllUsers().then((user) => res.send(user));
});

app.post("/user/create", (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    createUser({ firstName, lastName, email, password: hash }).then((user) =>
      res.json({ user, msg: "account created successfuly" })
    );
  });
});

app.post("/user", (req, res) => {
  const { email, password } = req.body;
  findUserWithPassword(email, password);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
