const {body, validationResult} = require('express-validator')

const db = require("../db/queries")


const validateSignUpData = [
    body('firstname')
        .trim()
        .notEmpty()
        .withMessage("Name cannot be empty")
        .isAlpha()
        .withMessage("Name must only use alphabet letters"),
    body('lastname')
        .trim()
        .notEmpty()
        .withMessage("Name cannot be empty")
        .isAlpha()
        .withMessage("Name must only use alphabet letters"),
    body('email')
        .trim()
        .isEmail()
        .withMessage(`Must be a valid Email`),
    body('password')
        .trim()
        .notEmpty()
        .withMessage("Password cannot be empty")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    body('confPassword')
        .trim()
        .notEmpty()
        .withMessage("Confirm password cannot be empty")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
    
]




const getUserSignUp = (req,res) =>{
    res.render("signup")
}


const postUserSignUp = [validateSignUpData,
    async (req,res,next) =>{

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).render('signup', {errors : errors.array()})
        }

        await db.createtUser(req.body)

        res.redirect("/")
}]



module.exports  = {
    getUserSignUp,
    postUserSignUp
}