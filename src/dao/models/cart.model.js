import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Productos',
            },
            cantidad: Number
        }
    ]
});

export const carritoModel = mongoose.model('Carrito', carritoSchema);
