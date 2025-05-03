
// routes.ts
import express from 'express';
import { rentsRouter } from '../rents/router/rentsRouter'; // Importa el archivo de rutas para empleados.
import { machinesRouter } from '../machines/router/machinesRouter'; // Importa el archivo de rutas para empleados.
import { itemsRouter } from '../items/router/itemsRouter'; // Importa el archivo de rutas para empleados.
import { centersRouter } from '../centers/router/centersRouter'; // Importa el archivo de rutas para centros.
import { worklogsRouter } from '../worklogs/router/worklogsRouter';
import { contactsRouter } from '../contacts/router/contactsRouter';
import { quotesRouter } from '../quotes/router/quotesRouter';
import { employeesRouter } from '../employees/router/employeesRouter';
import { imagesRouter } from './imagesRouter';
import { authRouter } from '../auth';

const appRouter = express.Router();

appRouter.use('/worklogs', worklogsRouter);

appRouter.use('/employees', employeesRouter);

appRouter.use('/centers', centersRouter);

appRouter.use('/rents', rentsRouter);

appRouter.use('/machines', machinesRouter);

appRouter.use('/items', itemsRouter);

appRouter.use('/contacts', contactsRouter);

appRouter.use('/quotes', quotesRouter);

appRouter.use('/images', imagesRouter);

appRouter.use('/auth', authRouter);

export { appRouter };

