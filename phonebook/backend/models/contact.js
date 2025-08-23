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
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d+$/.test(v) && v.length >= 8;
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
})

export default mongoose.model('Contact', contactSchema)