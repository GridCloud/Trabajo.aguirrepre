import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productSchema = new mongoose.Schema({
    nombre: {
        type:String,
        required:true
    },
    precio: {
        type:Number,
        required:true
    },
    identificador: {
        type:Number,
        required:true
    },
    color: {
        type:String,
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

productSchema.plugin(mongoosePaginate)
export const productModel = mongoose.model("Productos", productSchema);