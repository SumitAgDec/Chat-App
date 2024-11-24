import mongoose, { Schema, model } from 'mongoose'
import User from '../models/user.models.js'
import Message from './message.model.js'
const conversationSchema = new Schema({
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Message,
            default: []
        }
    ]
}, { timestamps: true })

const Conversation = model('Conversation', conversationSchema)

export default Conversation