const express = require('express')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const path = require('path')

const userController = require('./controllers/usersController')


const app = express()

app.set("view engine", "ejs")
app.use(session({secret:"cats", resave: "false",saveUninitialized:false}))
app.use(passport.session())
app.use(express.urlencoded({extended:false}))


app.get("/" , (req,res) => {

    res.render("index")

})

app.get('/sign-up', userController.getUserSignUp)
app.post('/sign-up',userController.postUserSignUp)





app.listen(3000, ()=>{
    console.log("Server running on port 3000")
})