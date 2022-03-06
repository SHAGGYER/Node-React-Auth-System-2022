const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.AuthController = class {
  static async init(req, res) {
    let user = null;

    if (res.locals.userId) {
      user = await User.findById(res.locals.userId);
    }

    res.send({ user });
  }

  static async login(req, res) {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(403).send({ error: "Could not log you in." });
    }

    const passwordEquals = bcrypt.compare(req.body.password, user.password);
    if (!passwordEquals) {
      return res.status(403).send({ error: "Could not log you in." });
    }

    const jwtData = {
      userId: user._id,
    };

    const token = jwt.sign(jwtData, process.env.JWT_SECRET);

    res.send({ token });
  }

  static async register(req, res) {
    const user = new User(req.body);
    user.save();
    res.sendStatus(201);
  }
};
