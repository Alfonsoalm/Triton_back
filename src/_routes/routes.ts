
// routes.ts
import express from 'express';
import { machinesRouter } from '../machines';
import { itemsRouter } from '../items';
import { servicesRouter } from '../services';
import { centersRouter } from '../centers';
import { imagesRouter } from './imagesRouter';
import { billsRouter } from '../bills';
import { worklogsRouter } from '../worklogs';
import { employeesRouter } from '../employees';
import { rentsRouter } from '../rents';
import { contactsRouter } from '../contacts';
import { quotesRouter } from '../quotes';

const appRouter = express.Router();

appRouter.use('/worklogs', worklogsRouter);

appRouter.use('/employees', employeesRouter);

appRouter.use('/centers', centersRouter);

appRouter.use('/rents', rentsRouter);

appRouter.use('/machines', machinesRouter);

appRouter.use('/items', itemsRouter);

appRouter.use('/services', servicesRouter);

appRouter.use('/contacts', contactsRouter);

appRouter.use('/quotes', quotesRouter);

appRouter.use('/images', imagesRouter);

appRouter.use('/bills', billsRouter);

export { appRouter };

