// import { Router } from "express";
// // import { profile } from "./user.service.js";
// const router=Router()

// router.get("/" , (req,res,next)=>{
//     const result  = profile(req.query.id)
//     return res.status(200).json({message:"Profile" , result})
// })
// export default router

import { Router } from "express";
import { createUser, getUserByEmail, getUserByIdExcludingRole, updateUser } from "./user.service.js";
const router = Router();

router.post("/signup", async (req, res, next) => {
    try {
        const result = await createUser(req.body);
        res.status(201).json({ message: "User created", result });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// update
router.put("/:id", async (req, res, next) => {
    try {
        const result = await updateUser(req.params.id, req.body);
        res.status(200).json({ message: "User updated", result });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// find by email
router.get("/by-email", async (req, res) => {
    const result = await getUserByEmail(req.query.email);
    res.status(200).json({ result });
});
//Get user by PK excluding role

router.get("/:id", async (req, res) => {
    const result = await getUserByIdExcludingRole(req.params.id);
    res.status(200).json({ result });
});




export default router;
