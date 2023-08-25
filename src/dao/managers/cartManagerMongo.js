import { carritoModel } from "../models/cart.model.js";


class CarritoManager {
    async createCart(obj){
        try {
            const newCarrito = carritoModel.create(obj)
            return newCarrito
        } catch (error) {
            throw error
        }
    }
    async getCarritoById(id){
        try {
            const idCarrito = carritoModel.findById(id)
            return idCarrito
        } catch (error) {
            throw error
        }
    }

}