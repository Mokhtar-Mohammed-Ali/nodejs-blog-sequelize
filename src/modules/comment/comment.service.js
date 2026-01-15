
import { Op } from 'sequelize';
import { Comment, Post, user } from '../../DB/model/index.js';

// Create a bulk of comments
export const createBulkComments = async (commentsArray) => {
    // userId and postId is exist
    for (let comment of commentsArray) {
        const existingUser = await user.findByPk(comment.userId);
        const existingPost = await Post.findByPk(comment.postId);
        if (!existingUser || !existingPost) {
            throw new Error("Invalid userId or postId for comment");
        }
    }

    const result = await Comment.bulkCreate(commentsArray);
    return result;
};

// Update content of a specific comment (only owner)
export const updateComment = async (commentId, userId, content) => {
    const comment = await Comment.findByPk(commentId);
    if (!comment) throw new Error("Comment not found");
    if (comment.userId !== userId) throw new Error("Not authorized");

    comment.content = content;
    await comment.save();

    return comment;
};

//Find or create comment (postId, userId, content)
export const findOrCreateComment = async ({ postId, userId, content }) => {
    let comment = await Comment.findOne({ where: { postId, userId, content } });
    if (!comment) {
        comment = await Comment.create({ postId, userId, content });
    }
    return comment;
};

//Search comments by word (findAndCount)


export const searchCommentsByWord = async (word) => {
    const result = await Comment.findAndCountAll({
        where: { content: { [Op.like]: `%${word}%` } }
    });
    return result;
};

//3 most recent comments for a post
export const getNewestCommentsForPost = async (postId) => {
    const result = await Comment.findAll({
        where: { postId },
        order: [["createdAt", "DESC"]],
        limit: 3
    });
    return result;
};


//Get comment by PK with user + post info
export const getCommentDetails = async (id) => {
    const result = await Comment.findByPk(id, {
        include: [
            { model: user, attributes: ["id", "name"] },
            { model: Post, attributes: ["id", "title"] }
        ]
    });
    return result;
};


