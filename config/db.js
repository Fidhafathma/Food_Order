const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();


const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected successfully')
    }
    catch(error){
        console.error('Mongodb connection failed:',error.message);
        process.exit(1);
    }
};

module.exports=connectDB;