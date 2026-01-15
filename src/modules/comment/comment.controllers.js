import { Router } from "express";
import { createBulkComments, findOrCreateComment, getCommentDetails, getNewestCommentsForPost, searchCommentsByWord, updateComment } from "./comment.service.js";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const result = await createBulkComments(req.body);
        res.status(201).json({ message: "Comments created", result });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update content of a specific comment (only owner)
router.patch("/:commentId", async (req, res) => {
    try {
        const { userId, content } = req.body;
        const result = await updateComment(req.params.commentId, userId, content);
        res.status(200).json({ message: "Comment updated", result });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//Find or create comment (postId, userId, content)
router.post("/find-or-create", async (req, res) => {
    try {
        const result = await findOrCreateComment(req.body);
        res.status(200).json({ message: "Comment found or created", result });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// Search comments by word (findAndCount)
router.get("/search", async (req, res) => {
    const result = await searchCommentsByWord(req.query.word);
    res.status(200).json(result);
});
// 3 most recent comments for a post
router.get("/newest/:postId", async (req, res) => {
    const result = await getNewestCommentsForPost(req.params.postId);
    res.status(200).json(result);
});
// Get comment by PK with user + post info
router.get("/details/:id", async (req, res) => {
    const result = await getCommentDetails(req.params.id);
    res.status(200).json(result);
});


export default router;
