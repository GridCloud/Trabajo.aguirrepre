import { carritoModel } from "../models/cart.model.js";


class CarritoManager {
    async createCart(obj){
        try {
            const newCarrito = await carritoModel.create(obj)
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

}
export const carritoManager = new CarritoManager;