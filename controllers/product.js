const ProductModal = require("../modals/product");

const getProducts = async (req, res) => {
  await ProductModal.find({})
    .then((products) => {
      products.length == 0
        ? res.status(300).json({ success: false, message: "no products was found" })
        : res.status(200).json({ success: true, products });
    })
    .catch((err) => {
      res.status(400).json({ success: false, err });
    });
};

const getProductById = async (req, res) => {
  await ProductModal.findById(req.params.id)
    .then((result) => {
      return !result
        ? res.status(200).json({ successes: true }, result)
        : res.status(300).json({ successes: false, msg: "no product was found" });
    })
    .catch((error) => res.status(400).json({ successes: false, error }));
};


const addProduct = async (req, res) => {
  await ProductModal.insertMany(req.body.product)
    .then((result) => {
      return res.status(200).json({ successes: true, result });
    })
    .catch((error) => res.status(400).json({ successes: false, error }));
};

const updateProduct = async (req, res) => {
  await ProductModal.findByIdAndUpdate(req.params.id, req.body.product)
    .then((result) => {
      return res.status(200).json({ successes: true, result });
    })
    .catch((error) => res.status(400).json({ successes: false, error }));
};

const deleteProduct = async (req, res) => {
  await ProductModal.findByIdAndRemove(req.params.id, req.body.product)
    .then((result) => {
      return res.status(200).json({ successes: true, result });
    })
    .catch((error) => res.status(400).json({ successes: false, error }));
};

module.exports = { getProducts,getProductById,addProduct,updateProduct,deleteProduct };