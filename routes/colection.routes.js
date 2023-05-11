const router = require("express").Router();

const { isAuthenticated, isAdmin } = require("../middlewares/auth.middleware");


const Colection = require("../models/Colection.model");
const Product = require("../models/Product.model")

// * COLECTION ROUTES   * //

// "/colection/create " => Create Colection
router.post("/create",  isAuthenticated, isAdmin, async(req,res,next) =>{
    const {name, price, picture} = req.body;
    try {
        await Colection.create({
            name: name,
            price: price,
            picture: picture,
        });
        // sending info to client
        res.status(200).json("Colection created correctly")
    } catch (error) {
        next(error)
    }
});

// "/colection/list" => List all colections
router.get("/list", async(req,res,next) => {
    try {
        const responseList = await Colection.find()
        // sendin info to client
        res.status(200).json(responseList)
    } catch (error) {
        next(error)
    }
});

// "/colection/:colectionId/update" => update colection
router.patch("/:colectionId/update", isAuthenticated, isAdmin, async(req,res,next) => {
    const {name, price, picture} = req.body;
    const {colectionId} = req.params
    try {
        await Colection.findByIdAndUpdate(colectionId,{
            name: name,
            price: price,
            picture: picture,
        });
        // sending info to client
        res.status(200).json("Colection updated correctly")
    } catch (error) {
        next(error)
    }
});

// "/colection/:colectionId/delete" => delete colection
router.delete("/:colectionId/delete",isAuthenticated, isAdmin, async (req,res,next) => {
    const {colectionId} = req.params
    try {
        await Colection.findByIdAndDelete(colectionId)
        // sending info to client
     res.status(200).json("Colection deleted correctly")
    } catch (error) {
        next(error)
    }
});

// "/colection/:colectionId/details" => details of colection
router.get("/:colectionId/details", async (req, res, next) => {
    const {colectionId} = req.params;
    try {
        const responseDetails = await Colection.findById(colectionId).populate("products")
        //send info to client
        res.status(200).json(responseDetails);
    } catch (error) {
        next(error)
    }
});

// "/colection/:ColectionId/add-product"
router.patch("/:colectionId/add-product", isAuthenticated,isAdmin,async(req, res, next) => {
    const {colectionId } = req.params;
    const {productId} = req.body
    console.log("colectionId",colectionId);
    console.log("productId",productId);

    try {
        const response = await Colection.findById(colectionId).populate("products")
        const findProduct = await Product.findById(productId)
        console.log("findProduct", findProduct);

        if( response.products.length === 0 ) {
            // if the colection is empty will instatly add the product
            await Colection.findByIdAndUpdate(colectionId, {$addToSet:{products: findProduct}})
            res.status(200).json("Product added to the collection correctly")

        } else {
            // if is not empty, we will check if the product that we want to add its already in
            for(let i=0; i <response.products?.length; i++){
            console.log("3ntrando en for")
            console.log("response.products._id", response.products);
                 if( response.products[i].size === findProduct.size){
                 res.status(400).json({errorMessage: "This product already exists in this colection"});
                 return

                 } else {
                    console.log("entrando en else");
                    await Colection.findByIdAndUpdate(colectionId,{$addToSet:{products: findProduct}})
                    res.status(200).json("Producto añadido correctamente")
                    
                 }
            }
        }
       
        
    } catch (error) {
        next(error)
    }
})

module.exports = router;
