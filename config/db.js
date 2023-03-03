const  mongoose  = require("mongoose");

mongoose.connect('mongodb://localhost:27017/excelUpload',{
    useUnifiedTopology:true
}).then(()=>{
    console.log('DB success');
}).catch(()=>{
    console.log('DB not success');
})