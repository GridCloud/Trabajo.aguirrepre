import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    nombre: {
        type:String,
        required:true
    },
    precio: {
        type:Number,
        required:true
    },
    alto: {
        type:Number,
        required:true
    },
    ancho: {
        type:Number,
        required:true
    },
    largo: {
        type:Number,
        required:true
    },
    stock: {
        type:Number,
        required:true,
        default: 0
    }
})

export const productModel = mongoose.model("Productos", productSchema);