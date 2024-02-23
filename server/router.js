import { Router } from "express";
// import * as todos from "./request-handler/todohandler.js"
import * as user from "./request-handler/user-handler.js";

const router = Router();

// router.route("/addtodo").post(todos.addtodo);

router.route("/create").post(user.create);
router.route("/read").get(user.read);
router.route('/delete/:userId').delete(user.remove);
router.route("/update/:userId").put(user.update);



export default router;