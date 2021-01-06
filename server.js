import express from "express";
import bodyParser from "body-parser";
import db from "./sequelize/models/index.cjs";
import bcrypt from "bcrypt";
import passport from "passport";
import LocalStrategy from "passport-local";

const app = express();
const port = process.env.PORT || 5000;

const saltRounds = 12;

//enables passport to verify user and password
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      db["User"]
        .findOne({
          where: {
            email: email,
          },
        })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              errors: { message: "Email or Password is invalid" },
            });
          } else {
            bcrypt.compare(password, user.password, (err, result) => {
              if (result == true) {
                return done(null, user);
              } else {
                return done(null, false, {
                  errors: { message: "Email or Password is invalid" },
                });
              }
            });
          }
        });
    }
  )
);

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

//defines user construct
const createUser = async ({ firstName, lastName, email, password }) => {
  return await db["User"].create({ firstName, lastName, email, password });
};

//confirms user exists and password is correct
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

//bcrypt hashes and salts passwords before they are
//sent to the database
app.post("/user/create", (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    createUser({ firstName, lastName, email, password: hash }).then((user) =>
      res.json({ user, msg: "account created successfuly" })
    );
  });
});

//user is logged in
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

//user is logged out
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/login");
});

// app.post("/user", (req, res) => {
//   const { email, password } = req.body;
//   findUserWithPassword(email, password);
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
