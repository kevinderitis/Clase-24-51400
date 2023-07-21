import express from 'express';
import config from './src/config/config.js'
import session from 'express-session';
import cookieParser from 'cookie-parser';
import authRouter from './src/routes/auth.js';
import passportRouter from './src/routes/authPassport.js';
import passport from 'passport';
import initializePassport from './src/config/passport-config.js';
const app = express();

app.use(session({
    secret: 'secretsession',
    resave: false,
    saveUninitialized: false
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session())

app.use('/api/auth', authRouter);
app.use('/api/passport', passportRouter)

const PORT = config.PORT; // si no utilizo variables de entorno pondria el puerto -- const PORT = 8080; por ejemplo

const server = app.listen(PORT, () => console.log(`Server running on port: ${server.address().port}`));
server.on('error', error => console.log(error))