import { Router } from 'express';
import { listCatalogs } from '../controllers/catalogs.controller.js';

const router = Router();

router.get('/', listCatalogs);

export default router;
