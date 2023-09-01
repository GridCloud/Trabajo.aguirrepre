import { carritoModel } from "../models/cart.model.js";


class CarritoManager {
    async createCart(obj) {
        try {
            const newCarrito = await carritoModel.create(obj);
            // Realizar el proceso de población aquí
            const populatedCarrito = await newCarrito.populate('products.productId');
            return populatedCarrito;
        } catch (error) {
            throw error;
        }
    }
    
    async getCarrito(){
        try {
            const newCarrito = await carritoModel.find({})
            return newCarrito
        } catch (error) {
            throw error
        }
    }
    async getCarritoById(id){
        try {
            const idCarrito = await carritoModel.findById(id)
            return idCarrito
        } catch (error) {
            throw error
        }
    }
    async deleteOne(id){
        try {
            const response = await carritoModel.findByIdAndDelete(id)
            return response
        } catch (error) {
            return error
        }
    }
    async deleteAll(){
        try {
            const response = await carritoModel.deleteMany()
            return response
        } catch (error) {
            throw error
        }
    }
    async addToCart(obj){

    }

}
export const carritoManager = new CarritoManager;