import  express  from "express";
import * as userController from "../controllers/users";

const router = express.Router();

router.get("/", userController.getAuthUser);

router.post("/signup", userController.signUp);

router.post("/login", userController.login);

router.post("/logout", userController.logout);

export default router;

