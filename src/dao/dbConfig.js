import mongoose from "mongoose"


const URI = "mongodb+srv://Benjamin:Satoshi@cluster1.biniode.mongodb.net/prueba?retryWrites=true&w=majority";

mongoose.connect(URI)
.then(() => console.log("Conectado"))
.catch(error => console.log(error))