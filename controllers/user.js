const UserModal = require("../modals/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SignUpValidate, SignInValidate} = require("../validation/user");

const getUsers = async (req, res) => {
  const users = await UserModal.find({}).select("-_id -password");
  if (!users) {
    return res.status(400).json({ message: "users not found" });
  }

  if (users.length == 0) {
    return res.status(400).json({ message: "users empty" });
  }

  return res.status(200).json({users});
};

const signUp = async (req, res) => {
  const {role, fullName, email, age, phone, password} = req.body;
  const emailExist = await UserModal.findOne({ email });

  const { error } = SignUpValidate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  if (emailExist) {
    return res.status(400).json({ message: "email already exist" });
  }

  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(password, salt);
  let user = new UserModal({
    role,
    fullName,
    email,
    age,
    phone,
    password:hashedPassword,
});
  try {

    user = await user.save();
  } catch (error) {
    console.log(error);
  }

  if (!user) {
    return res.status(400).json({ message: "error in creating user" });
  }

  return res.status(200).json(user);
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const { error } = SignInValidate({message: "success"}, req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  const existUser = await UserModal.findOne({ email }).select("-_id -password");
  if (!existUser) {
    return res.status(404).json({ message: "user not found" });
  }

  const comperedPassword = bcrypt.compareSync(password, existUser.password);

  if (!comperedPassword) {
    return res.status(400).json({ message: "password invalid" });
  }

  const token = jwt.sign({ email: existUser.email }, process.env.SECRET_KEY);

  return res
    .status(200)
    .json({ user: existUser, token,message: "login successfully" });
};

const getUserByEmail = async (req, res) => {
  await UserModal.findOne({ email: req.params }).select("-_id -password")
    .then((user) => {
      return !user
        ? res.status(200).json({ successes: true }, user)
        : res.status(300).json({ successes: false, msg: "no registered user found" });
    })
    .catch((error) => res.status(400).json({ successes: false, error }));
};

const updateUser = async (req, res) => {
  const {role, fullName, email, age, phone, password} = req.body;
  let user;

  const userExist =await UserModal.findOne({ email:req.params.email })
  if (!userExist) {
    return res.status(201).json({ message: "user not exist" });
  }
  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const {error} = userUpdateValidate(req.body);
    if(error){
      return res.status(400).send({message:error.details[0].message})
    }
    user = await UserModal.findOneAndUpdate(
      { email: req.params.email },
      {
        role,
        fullName,
        email,
        age,
        phone,
        password:hashedPassword,
      }
    );
  } catch (error) {
    console.log(error);
  }
  if (!user) {
    return res.status(400).json({ message: "error in updating user" });
  }

  return res.status(200).json(user);
};

const deleteUser= async (req, res) => {
  const email = req.params.email;
  let user;

  try {
    user=await UserModal.findOneAndRemove({email})

  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unable to delete" });
  }

  return res.status(200).json({ message: "Deleted Successfully" });
};

module.exports = { getUsers, signUp, signIn, getUserByEmail, updateUser, deleteUser };