import { sequelize } from "../connection.db.js";


import { user } from "./user.model.js";
import { Post } from "./post.model.js";
import { Comment } from "./comment.model.js";

// apply associations
import { applyAssociations } from "./associations.js";
applyAssociations();


export {
    sequelize,
    user,
    Post,
    Comment
};
