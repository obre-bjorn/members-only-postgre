const db = require('../db/queries')

async function addMessage(req,res,next) {
    

    try {
        
        await db.createMessage(req.body,req.user);
        res.redirect('/')

    } catch (error) {
        console.log('error')
    }



}



module.exports = {
    addMessage
}