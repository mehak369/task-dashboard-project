import { Router } from "express";
import {
  create,
  getAll,
  update,
  remove
} from "../controllers/task.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.use(protect);

router.post("/", create);
router.get("/", getAll);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
