const mongoose = require('mongoose');

const DB = "mongodb+srv://VenkatRaghav:VenkatRaghav@cluster0.ajwfqwg.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
}).then( ()=>{

    console.log('connection successful');

}).catch( (err)=>{

    console.log('no connection');

});

