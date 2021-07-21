const {Router} = require('express');

const authRouter = Router();

authRouter.get('/login');
authRouter.post('/login');
authRouter.get('/register');
authRouter.post('/register');
authRouter.get('/logout');
//Autenticacion por medio de facebook y google
authRouter.get('/auth/google');
authRouter.get('/auth/facebook');
authRouter.get('/auth/google/callback');
authRouter.get('/auth/facebook/callback');