const router=require("express").Router();
const { getUsers,signUp,signIn,getUserByEmail,updateUser,deleteUser }=require("../controllers/user")

router.get("/",getUsers)
router.get("/:email",getUserByEmail)
router.post("/signUp",signUp)
router.post("/signIn",signIn)
router.put("/:email",updateUser)
router.delete("/:email",deleteUser)

module.exports = router