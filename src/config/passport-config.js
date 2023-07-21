import passport from 'passport';
import GithubStrategy from 'passport-github2';
import config from './config.js';
import { createUser, getByEmail, getById } from '../dao/user.js';

const initializePassport = () => {

    passport.use('github', new GithubStrategy({
        clientID: config.PASSPORT_CLIENT_ID,
        clientSecret: config.PASSPORT_CLIENT_SECRET,
        callbackURL: config.PASSPORT_CALLBACK_URL,
        scope: ['user:email']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            let userEmail = profile.emails[0].value;
            let user = await getByEmail(userEmail);
            if(!user){
                let newUser = {
                    first_name: profile._json.login,
                    last_name: "",
                    email: userEmail,
                    password: "",
                    age: 20
                }
                let result = await createUser(newUser);
                done(null, result)
            }else{
                done(null, user)
            }
        } catch (error) {
            done(error)
        }
    }))


    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async (id, done) => {
        let user = await getById(id);
        done(null, user);
    })
}

export default initializePassport;