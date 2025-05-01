import express from 'express';
import { upload } from '../_middlewares/imageUpload';
import { deleteQuote, getQuotes, getQuotesFields, insertQuote, updateQuote } from '../_services/quoteItemsService';

const quoteItemsRouter = express.Router();

quoteItemsRouter.get('/get-quoteItems', getQuotes);

quoteItemsRouter.post('/insert-quoteItem', upload.single('photo_file'), insertQuote);

quoteItemsRouter.put('/update-quoteItem', updateQuote);

quoteItemsRouter.delete('/delete-quoteItem', deleteQuote);

quoteItemsRouter.get('/fields', getQuotesFields);

export { quoteItemsRouter };