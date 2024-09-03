const express = require('express')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')

//TO refactor
const db = require('./db/pool')
const bcrypt = require('bcryptjs')
const userController = require('./controllers/usersController')


//Routers 
const messageRouter = require('./routes/messages')

const app = express()

app.set("view engine", "ejs")
app.use(session({secret:"cats", resave: "false",saveUninitialized:false}))
app.use(passport.session())
app.use(express.urlencoded({extended:false}))


passport.use(
    new LocalStrategy( async (username,password,done) => {

        try{
            const {rows} = await db.query("SELECT * FROM users WHERE email = $1", [username])
            const user = rows[0]

            if(!user){
                return done(null, false,{message: "Incorrect username"})
            }
        
            console.log(user)
            const passwordMatch = await bcrypt.compare(password,user.password)

            if(!passwordMatch){
                return done(null, false,{message: "Incorrect password"})
            }

            return done(null, user)

        }catch(err){
            return done(err)
        }
    })
)


passport.serializeUser((user,done) =>{
    done(null,user.id)
})

passport.deserializeUser(async (id, done) =>{


    try {

        const {rows} = await db.query("SELECT * FROM users WHERE id = $1",[id])
        const user = rows[0]

        done(null,user)

    }catch(err){

        done(err)

    }

})


//Register routes
app.use('/message',messageRouter)


app.get("/" , (req,res) => {

    res.render("index", {user : req.user})

})

app.get('/sign-up', userController.getUserSignUp)
app.post('/sign-up',userController.postUserSignUp)

app.post(
    "/log-in",
    passport.authenticate("local",{
        successRedirect:"/",
        failure:"/"
    })
)

app.get('/log-out',(req,res,next) =>{
    req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
})




app.listen(3000, ()=>{
    console.log("Server running on port 3000")
})