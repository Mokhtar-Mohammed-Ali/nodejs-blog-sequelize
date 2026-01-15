import { user } from "./user.model.js";
import { Post } from "./post.model.js";
import { Comment } from "./comment.model.js";

export const applyAssociations = () => {

   user.hasMany(Post, {
        foreignKey: "userId",
        onDelete: "CASCADE"
    });

    Post.belongsTo(user, {
        foreignKey: "userId"
    });

    Post.hasMany(Comment, {
        foreignKey: "postId",
        onDelete: "CASCADE"
    });

    Comment.belongsTo(Post, {
        foreignKey: "postId"
    });

    user.hasMany(Comment, {
        foreignKey: "userId",
        onDelete: "CASCADE"
    });

    Comment.belongsTo(user, {
        foreignKey: "userId"
    });
};
