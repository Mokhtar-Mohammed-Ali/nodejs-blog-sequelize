

import { Comment } from "../../DB/model/comment.model.js";
import { Post } from "../../DB/model/post.model.js";
import { user } from "../../DB/model/user.model.js";
import { Sequelize } from 'sequelize';
//Create new Post

export const createPost = async (data) => {
    const { title, content, userId } = data;

    const existingUser = await user.findByPk(userId);
    if (!existingUser) throw new Error("User not found");

    const newPost = Post.build({ title, content, userId });
    await newPost.save();

    return newPost;
};
//Delete a post by id (only owner)

export const deletePost = async (postId, userId) => {
    const post = await Post.findByPk(postId);
    if (!post) throw new Error("Post not found");
    if (post.userId !== userId) throw new Error("Not authorized");

    await post.destroy(); 
    return { message: "Post deleted" };
};

//Retrieve all posts with user + comments
export const getAllPostsWithDetails = async () => {
    const posts = await Post.findAll({
        attributes: ["id", "title"],
        include: [
            {
                model: user,
                attributes: ["id", "name"]
            },
            {
                model: Comment,
                attributes: ["id", "content"]
            }
        ]
    });
    return posts;
};

// Retrieve all posts with comment count

export const getPostsCommentCount = async () => {
    const posts = await Post.findAll({
        attributes: [
            "id",
            "title",
            [Sequelize.fn("COUNT", Sequelize.col("Comments.id")), "commentCount"]
        ],
        include: [
            { model: Comment, attributes: [] } 
        ],
        group: ["Post.id"]
    });
    return posts;
};
