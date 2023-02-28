const UserModal = require("../modals/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SignUpValidate, SignInValidate } = require("../validation/user");

const getUsers = async (req, res) => {
  try {
    const users = await UserModal.find({}, "-_id -password");
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const signUp = async (req, res) => {
  const { role, fullName, email, age, phone, password } = req.body;
  try {
    const emailExist = await UserModal.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: "user with that email already exist" });
    }

    const { error } = SignUpValidate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModal.create({
      role,
      fullName,
      email,
      age,
      phone,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User created successfully" }, user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error } = SignInValidate({ message: "success" }, req.body);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const existUser = await UserModal.findOne({ email }).select("-password");

    if (!existUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, existUser.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ email: existUser.email }, process.env.SECRET_KEY);

    res.cookie("token", token, { httpOnly: true, secure: true });

    return res.status(200).json({ user: existUser, message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUserByEmail = async (req, res) => {
  await UserModal.findOne({ email: req.params })
    .select("-_id -password")
    .then((user) => {
      return !user
        ? res.status(200).json({ successes: true }, user)
        : res
            .status(300)
            .json({ successes: false, msg: "no registered user found" });
    })
    .catch((error) => res.status(400).json({ successes: false, error }));
};

const updateUser = async (req, res) => {
  const { role, fullName, email, age, phone, password } = req.body;
  try {
    const userExist = await UserModal.findOne({ email: req.params.email });
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { error } = userUpdateValidate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedUser = await UserModal.findOneAndUpdate(
      { email: req.params.email },
      { role, fullName, email, age, phone, password: hashedPassword },
      { new: true } // returns the updated document
    ).select("-_id -password");

    return res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const email = req.params.email;
  try {
    const deletedUser = await UserModal.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getUsers,
  signUp,
  signIn,
  getUserByEmail,
  updateUser,
  deleteUser,
};