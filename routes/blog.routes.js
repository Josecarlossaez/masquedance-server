const router = require("express").Router();

const { isAuthenticated, isAdmin } = require("../middlewares/auth.middleware");
const uploader = require("../middlewares/cloudinary.middleware")

const Blog = require("../models/Blog.model");


// ** BLOG ROUTES **  
 
// POST "/blog/create" => Create blog
 router.post("/create", isAdmin, uploader.single("picture"), async(req,res,next) => {
    const {title, picture, description} = req.body;
    try {
         await Blog.create({
            title: title,
            picture: picture,
            description: description,
        });
        res.status(200).json("Blog created correctly")
    } catch (error) {
        next(error);
    }
 });

// GET "/blog/list" => List all blogs
 router.get("/list", async(req, res, next) => {
    try {
        const responseList = await Blog.find()
        res.status(200).json(responseList);
    } catch (error) {
        next(error)
    }
 })

// PATCH "/blog/:blogId/update" => Update blog
 router.patch("/:blogId/update", isAdmin, uploader.single("picture"), async(req,res,next) => {
    const{blogId} = req.params
    const {title, picture, description} = req.body;
    try {
        await Blog.findByIdAndUpdate(blogId,{
            title: title,
            picture: picture,
            description: description,
        });
        // sending info to client
        res.status(200).json("blog updated correctly")
    } catch (error) {
        next(error)
    }
 });
 
// DELETE "/blog/:blogId/delete" => Delete blog
 router.delete("/:blogId/delete", isAdmin, async(req, res, next) =>{
    const{blogId} = req.params
    try {
        await Blog.findByIdAndDelete(blogId);
        // sending info to client
        res.status(200).json("blog deleted correctly")
    } catch (error) {
        next(error)
    }

 })

// GET "/blog/blogId/details" => blog details
 router.get("/blogId/details", async(req, res, next) => {
    const {blogId} = req.params;
    const responseDetails = await findById(blogId);
    // sending info to client
    res.status(200).json(responseDetails)
 })



module.exports = router;
