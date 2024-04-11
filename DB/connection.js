const moongose=require('mongoose')
const connectionString=process.env.DATABASE;
moongose.connect(connectionString).then(()=>{
    console.log('CONNECTED TO THE DATABSE.....');
}).catch((err)=>{
    console.log('Something went wrong',err);
})
