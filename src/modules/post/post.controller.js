import { Router } from "express";
import { createPost, deletePost, getAllPostsWithDetails, getPostsCommentCount } from "./post.service.js";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const result = await createPost(req.body);
        res.status(201).json({ message: "Post created", result });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// deletepost by owner
router.delete("/:postId", async (req, res) => {
    try {
        const userId = req.body.userId; 
        const result = await deletePost(req.params.postId, userId);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
//Retrieve all posts with user + comments
router.get("/details", async (req, res) => {
    const result = await getAllPostsWithDetails();
    res.status(200).json(result);
});

// Retrieve all posts with comment count
router.get("/comment-count", async (req, res) => {
    const result = await getPostsCommentCount();
    res.status(200).json(result);
});




export default router;
