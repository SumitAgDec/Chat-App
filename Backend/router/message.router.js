import { Router } from "express";
import { getMessage, sendMessage } from "../controller/message.controller.js";
import secureRoutes from "../middleware/secureRoute.js";

const router = Router();

router.post('/send/:id', secureRoutes, sendMessage);
router.get('/get/:id', secureRoutes, getMessage);

export default router