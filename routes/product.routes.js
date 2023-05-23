const router = require("express").Router();

const { isAuthenticated, isAdmin } = require("../middlewares/auth.middleware");
const uploader = require("../middlewares/cloudinary.middleware")

const Product = require("../models/Product.model")
const User = require("../models/User.model")

// * PRODUC ROUTES *

// POST "/product/create" => create Product
router.post("/create",  isAuthenticated, isAdmin, uploader.single("picture"), async(req, res, next) => {
    const {name, price, description, color, picture,stock, size} = req.body
    try {
        await Product.create({
            name: name,
            price: price,
            picture:picture,
            stock: stock, 
            description: description,
            color: color,
            size: size,
           
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
router.patch("/:productId/update", isAuthenticated, isAdmin,  uploader.single("picture"), async(req,res,next) => {
    const { productId } = req.params
    const {name, price, picture, size, description, stock,cantidad} = req.body

    try {
        await Product.findByIdAndUpdate( productId, {
            name: name,
            price: price,
            description: description,
            picture: picture,
            size: size,
            cantidad: cantidad,
            stock: stock,
            
        });
        // sending info to client
        res.status(200).json("Product updated correctly")
    } catch (error) {
        next(error)
    }
});

// DELETE "/product/:productId/delete" => delete Product
router.delete("/:productId/delete",isAuthenticated, isAdmin, async(req, res, next) =>{
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
     try {
        const responseDetails = await Product.findById( productId )
        res.status(200).json(responseDetails)
     } catch (error) {
        next(error)
     }
    
 });

 // PATCH "/product/:productId/add-to-cart" => send product to user Cart
 router.patch("/:productId/add-to-cart", isAuthenticated, async ( req, res, next) => {
    const { productId } = req.params;
    try {
        
        const productToCart = await Product.findById(productId)
        await User.findByIdAndUpdate(req.payload._id, {$addToSet:{cart: productToCart}})
        res.status(200).json("Producto añadido al carrito correctamente")
    } catch (error) {
        next(error)
    }

 })

 // PATCH "/product/:productId/remove-from-cart" => remove product from the user Cart
 router.patch("/:productId/remove-from-cart", isAuthenticated, async ( req, res, next) => {
    const { productId } = req.params;
    try {
        
        const productToRemove = await Product.findById(productId)
        await User.findByIdAndUpdate(req.payload._id, {$pull:{cart: productToRemove}})
        res.status(200).json("Producto borrado del carrito correctamente")
    } catch (error) {
        next(error)
    }

 })

module.exports = router;