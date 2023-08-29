import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productos',
    },
    productoNombre: String,
    cantidad: Number
});

export const carritoModel = mongoose.model('Carrito', carritoSchema);