import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
    carritoId: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Productos'
    }
});

export const carritoModel = mongoose.model('Carrito', carritoSchema);