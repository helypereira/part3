import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 15
  }
})

export default mongoose.model('Contact', contactSchema)