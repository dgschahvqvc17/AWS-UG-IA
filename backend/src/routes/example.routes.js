// Rutas: mapean las URLs a los controladores correspondientes.
import { Router } from 'express';
import * as ExampleController from '../controllers/example.controller.js';

const router = Router();

router.get('/', ExampleController.list);
router.get('/:id', ExampleController.getById);
router.post('/', ExampleController.create);
router.delete('/:id', ExampleController.remove);

export default router;
