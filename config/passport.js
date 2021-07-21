const passport = require("passport");
const {users} = require("../models")
const LocalStrategy = require("passport-local");

passport.use(new LocalStrategy({
    //Cambiando el valor por defecto de login a email, ya que passport toma el valor de username
    usernameField: email
}, async(email, password, done) => {
    try{
        let results = await users.findOne({email});
        //select * from useres where email = email limit 1;
        console.log(results)
        if(results && results.password === password){
            done(null, results);
        }
        return done(null, false);
    }catch(error){
        done(error);
    }
}));

//Primero va el serialize que vamos a modificar
passport.serializeUser((user, done) => {
    //firma el usuario para guardar su session
    return done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        let user = await users.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
})