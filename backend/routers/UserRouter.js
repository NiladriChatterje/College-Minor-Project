import express from "express";
const router = express.Router();
import { ValidateUser } from "../services/UserService.js";
router.post("/getLoginData", async (req, res) => {
    const { id, password, admin } = req?.body;
    let data = await ValidateUser({ id: JSON.parse(id), password: JSON.parse(password) });
    res.status(200).send(data);
});

export default router;
