import express from 'express';
import { upload } from '../_middlewares/imageUpload';
import { deleteQuote, getQuotes, getQuotesFields, insertQuote, updateQuote } from '../_services/quotesService';

const quotesRouter = express.Router();

quotesRouter.get('/get-quotes', getQuotes);

quotesRouter.post('/insert-quote', upload.single('photo_file'), insertQuote);

quotesRouter.put('/update-quote', updateQuote);

quotesRouter.delete('/delete-quote', deleteQuote);

quotesRouter.get('/fields', getQuotesFields);

export { quotesRouter };