const router = require("express").Router();

const { isAuthenticated, isAdmin } = require("../middlewares/auth.middleware");
const uploader = require("../middlewares/cloudinary.middleware")

const Product = require("../models/Product.model")

// * PRODUC ROUTES *

// POST "/product/create" => create Product
router.post("/create",  isAuthenticated, isAdmin, uploader.single("picture"), async(req, res, next) => {
    const {name, price, size, description, color, picture} = req.body
    try {
        await Product.create({
            name: name,
            price: price,
            picture:picture,
            size: size,
            description: description,
            color: color,
        });
        // sending info to client
        res.status(200).json("Product created correctly")
    } catch (error) {
        next(error)
    }
});

// GET "/product/list" => list all products
router.get("/list", async(req, res, next) => {
    try {
    const responseList = await Product.find()
        //sending info to client
        res.status(200).json(responseList)
    } catch (error) {
        next(error)
    }
         
});

// PATCH "/product/:productId/update" => Update product
router.patch("/:productId/update", isAdmin, isAuthenticated, uploader.single("picture"), async(req,res,next) => {
    const { productId } = req.params
    const {name, price, picture, size, description, cantidad} = req.body

    try {
        await Product.findByIdAndUpdate( productId, {
            name: name,
            price: price,
            picture: picture,
            size: size,
            description: description,
            cantidad: cantidad,
        });
        // sending info to client
        res.status(200).json("Product updated correctly")
    } catch (error) {
        next(error)
    }
});

// DELETE "/product/:productId/delete" => delete Product
router.delete("/:productId/delete", isAdmin,isAuthenticated, async(req, res, next) =>{
    const { productId } = req.params
     try {
        await Product.findByIdAndDelete( productId )
     // sending info to client
     res.status(200).json("Product deleted correctly")
     } catch (error) {
        next(error)
     }
});

// GET "/product/productId/details" => details of product
 router.get("/:productId/details", async(req, res, next) => {
    const { productId } = req.params

    const responseDetails = await Product.findById( productId )
 })


module.exports = router;