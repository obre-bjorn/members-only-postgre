const db = require('../db/queries')

async function addMessage(req,res,next) {
    

    try {
        
        await db.createMessage(req.body,req.user);
        res.redirect('/')

    } catch (error) {
        console.log('error')
    }



}


async function deleteMessage(req,res,next){

    try {
        
        await db.deleteMessage(req.body.messageid)
        res.redirect('/')

    }catch(err){
        console.log(err)

    }

}



module.exports = {
    addMessage,
    deleteMessage
}