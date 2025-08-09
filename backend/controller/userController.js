const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.testApi = (req, res, next) => {
  res.status(200).json({ message: "Test route!" });
};
exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  // console.log(name, email, password);

  const hashedPass = await bcrypt.hash(password, 10);

  const resp = await User.create({ name, email, password: hashedPass });
  res.status(200).json({ resp });
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user == null) {
      res.status(400).json({ message: "user not found!" });
      return;
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(400).json({ message: "user not found!" });
      return;
    }
    const token = await jwt.sign({ email }, process.env.JWT_SECRETE, {
      expiresIn: "1hr",
    });

    res.status(200).json({ message: "Successfuly login!", token });
  } catch (err) {
    console.error(err);
  }
};

exports.secureRoute = (req, res, next) => {
  res.status(200).json({ message: "Authenticateion sucessfull!" });
};

