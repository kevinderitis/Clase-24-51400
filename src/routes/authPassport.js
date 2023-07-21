import { Router } from 'express';
import passport from 'passport';

const passportRouter = Router();

passportRouter.get('/github', passport.authenticate('github', { scope: ['user:email']}), async(req, res) => {})

passportRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/api/passport/login'}), async (req, res) => {
    res.redirect('/api/auth/current')
})

passportRouter.get('/faillogin', (req, res) => {
    res.send('fallo el login')
})

export default passportRouter;