const express = require("express");
const router = express.Router();
const { user } = require("../models/user");

router.post("/login", async (req, res, next) => {
    try {
      const oneuser = await user.findOne({ where: { username: req.body.username } });
      if (!oneuser) {
        res.status(401).send("Wrong username and/or password");
      }
      else if (!oneuser.correctPassword(req.body.password)) {
        res.status(401).send("Wrong username and/or password");
      }
      else {
        req.login(oneuser, err => (err ? next(err) : res.json(oneuser)));
      }
    }
    catch (err) {
      next(err);
    }
  });

  router.post("/signup", async (req, res, next) => {
    try {
      const oneuser = await user.create(req.body);
      req.login(oneuser, err => (err ? next(err) : res.json(oneuser)));
    }
    catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        res.status(401).send("User already exists");
      }
      else {
        next(err);
      }
    }
  });

  router.delete("/logout", (req, res, next) => {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      else {
        res.status(204).end();
      }
    });
  });
 
  router.get("/me", (req, res) => {
    res.json(req.oneuser);
  });

  module.exports = router;
