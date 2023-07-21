import { Router } from 'express';
import { getByEmail, createUser } from '../dao/user.js';
import { generateToken, authToken } from '../util/jwt.js';
import { validatePassword } from '../util/index.js';
const authRouter = Router();

authRouter.get('/', (req, res) => {
    res.send('auth router get ok')
})

authRouter.post('/register', async (req, res) => {
    const { first_name, last_name, email, password } = req.body; 
    if(!first_name || !last_name || !email || !password) return res.send({status: 'error', error: 'Incomplete property for user creation'})
    const user = await getByEmail(email);
    if(user) return res.status(400).send({ status: 'error', error: 'User already exists'});
    
    const newUser = {
        first_name,
        last_name,
        email,
        password
    };

    await createUser(newUser);

    res.send({ status: 'success', msg: 'User registered successfully'})
});

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) return res.send({status: 'error', error: 'Incomplete property for user login'});
    const user = await getByEmail(email);
    if(!user) return res.status(400).send({ status: 'error', error: 'User not found'});
    if(!validatePassword(user, password)) return res.status(400).send({ status: 'error', error: 'Invalid credentials'});
    const access_token = generateToken(user)
    res.cookie('authToken', access_token).send({ status: 'success', access_token})
})

authRouter.get('/current', authToken, (req, res) => {
    res.send('Si estas viendo esto es porque estas logueado')
})


export default authRouter;
