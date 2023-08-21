const router = require("express").Router();

const { isAuthenticated, isAdmin } = require("../middlewares/auth.middleware");
const uploader = require("../middlewares/cloudinary.middleware")

const Blog = require("../models/Blog.model");


// ** BLOG ROUTES **  
 
// POST "/blog/create" => Create blog
 router.post("/create", isAuthenticated, isAdmin, uploader.single("picture"), async(req,res,next) => {
    const {link, picture, description} = req.body;
    try {
         await Blog.create({
            link: link,
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
 router.patch("/:blogId/update", isAuthenticated, isAdmin, uploader.single("picture"), async(req,res,next) => {
    const{blogId} = req.params
    const {link, picture, description} = req.body;
    try {
        await Blog.findByIdAndUpdate(blogId,{
            link: link,
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
 router.delete("/:blogId/delete", isAuthenticated, isAdmin, async(req, res, next) =>{
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
 router.get("/:blogId/details", async(req, res, next) => {
    const {blogId} = req.params;
    try {
        const responseDetails = await Blog.findById(blogId);
    // sending info to client
    res.status(200).json(responseDetails)
    } catch (error) {
        next(error)
    }
 })



module.exports = router;
