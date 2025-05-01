import express from 'express';
import { upload } from '../_middlewares/imageUpload';
import { deleteRent, getRents, getRentsFields, insertRent, updateRent } from '../_services/rentsService';

const rentsRouter = express.Router();

rentsRouter.get('/get-rents', getRents);

rentsRouter.post('/insert-rent', insertRent);

rentsRouter.put('/update-rent', updateRent);

rentsRouter.delete('/delete-rent', deleteRent);

rentsRouter.get('/fields', getRentsFields);

export { rentsRouter };