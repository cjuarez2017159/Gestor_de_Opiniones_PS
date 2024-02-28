import { Router } from 'express';
import { check } from 'express-validator';

import { login } from './auth.controller';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router()

router.post(
    '/login',
    [
        check('correo', 'Este no es un corro valido').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos,
    ], login);

export default router