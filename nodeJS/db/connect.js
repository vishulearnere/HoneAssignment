const mongoose = require('mongoose')
//const datastring = 'mongodb+srv://vishal:Letshackit@nodeprojects.wzyuizk.mongodb.net/?retryWrites=true&w=majority'

//  mongoose.connect(datastring,{
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useFindAndModify:false,
//     useUnifiedTopology:true
// }).then(()=>console.log('database is connected............'))
// .catch((err)=>console.log(err))

const mongoDB = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
}
module.exports = mongoDB