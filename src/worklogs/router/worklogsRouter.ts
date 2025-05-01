import { Router } from 'express';
import { createController,updateController, getAllController, getByIdController, getFieldsController, deleteController } from '../presentation';
import { worklogsService } from '../config/config';

const worklogsRouter = Router();

worklogsRouter.get("/",getAllController(worklogsService));

worklogsRouter.get('/fields', getFieldsController(worklogsService));

worklogsRouter.get("/:worklogId", getByIdController(worklogsService));

worklogsRouter.post("/", createController(worklogsService));

worklogsRouter.put("/:worklogId", updateController(worklogsService))

worklogsRouter.delete("/:worklogId", deleteController(worklogsService))

export { worklogsRouter };