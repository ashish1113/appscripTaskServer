const mongoose = require('mongoose');
Schema = mongoose.Schema;

let questionSchema = new Schema({
    questionId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    name: {
        type: String,
        
    },
    bestCricketer: {
        type: String,
        
    },
    colorSelected:{
        type:[String],
       
    },
    colorString: {
        type:String,
        
    },
    date: {
        type: Date,
        default: ''
    }
})

mongoose.model('Question', questionSchema);