const express=require('express')
const mongoose=require('mongoose')
 mongoose.set('strictQuery', true);
const route=require('./router/router.js')
const app=express();

app.use(express.json())

mongoose.connect("mongodb+srv://FARINEKHAN:EXtlAhONzagSoJCy@cluster0.wge8afd.mongodb.net/S-M?" ,{ useNewUrlParser: true}
)
.then(()=>console.log("mongoDb is connected"))
.catch(err=>console.log(err))

app.use('/',route)
//connecting port//
app.listen(8800,function(){
    console.log("express at running on port" + (8800))
})