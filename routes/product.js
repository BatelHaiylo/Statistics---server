const router=require("express").Router();
const { getProducts,getProductById,addProduct,updateProduct,deleteProduct } = require('../controllers/product');

router.get('/',getProducts);
router.get('/:id',getProductById);
router.post('/add',addProduct);
router.put('/update/:id',updateProduct);
router.delete('/delete/:id',deleteProduct);

module.exports = router