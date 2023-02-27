const UsersModal = require("../models/user");

const getUsers = async (req, res) => {
  await UsersModal.find({})
    .then((users) => {
      users.length == 0
        ? res.status(300).json({ success: false, message: "users not found" })
        : res.status(200).json({ success: true, users });
    })
    .catch((err) => {
      res.status(400).json({ success: false, err });
    });
};

const getUserByEmail = async (req, res) => {
  await UsersModal.find(req.params.email)
    .then((result) => {
      return !result
        ? res.status(200).json({ successes: true }, result)
        : res.status(300).json({ successes: false, msg: "no user found" });
    })
    .catch((error) => res.status(400).json({ successes: false, error }));
};

const addNewUser = async (req, res) => {
  await UsersModal.insertMany(req.body)
    .then((result) => {
      return res.status(200).json({ successes: true, result });
    })
    .catch((error) => res.status(400).json({ successes: false, error }));
};

const updateUser = async (req, res) => {
  await UsersModal.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      return res.status(200).json({ successes: true, result });
    })
    .catch((error) => res.status(400).json({ successes: false, error }));
};

const deleteUser = async (req, res) => {
  await UsersModal.where("email")
    .equals(req.body.email)
    .remove()
    .then((result) => {
      return res.status(200).json({ successes: true, result });
    })
    .catch((error) => res.status(400).json({ successes: false, error }));
};

module.exports = { getUsers, getUserByEmail, addNewUser, updateUser, deleteUser };