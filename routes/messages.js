const {Router} = require("express")
const messageController = require('../controllers/messageController')


const messageRouter = Router()


messageRouter.post('/add-message',messageController.addMessage)
messageRouter.post('/delete-message',messageController.deleteMessage)



module.exports = messageRouter