const router = require("express").Router();

const { isAuthenticated, isAdmin } = require("../middlewares/auth.middleware");
const uploader = require("../middlewares/cloudinary.middleware")

const Product = require("../models/Product.model")

// * PRODUC ROUTES *

// POST "/product/create" => create Product
router.post("/create",  isAuthenticated, isAdmin, uploader.single("picture"), async(req, res, next) => {
    const {name, price, description, color, picture, cantidadSizeS,cantidadSizeM,cantidadSizeL,cantidadSizeXL,cantidadSizeXXL} = req.body
    try {
        await Product.create({
            name: name,
            price: price,
            picture:picture,
            cantidadSizeS: cantidadSizeS,
            cantidadSizeM: cantidadSizeM,
            cantidadSizeL: cantidadSizeL,
            cantidadSizeXL: cantidadSizeXL,
            cantidadSizeXXL: cantidadSizeXXL,
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
    const {name, price, picture, size, description, cantidad,color} = req.body

    try {
        await Product.findByIdAndUpdate( productId, {
            name: name,
            price: price,
            description: description,
            picture: picture,
            size: size,
            
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
     try {
        const responseDetails = await Product.findById( productId )
        res.status(200).json(responseDetails)
     } catch (error) {
        next(error)
     }
    
 })


module.exports = router;