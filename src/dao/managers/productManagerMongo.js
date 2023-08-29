import { productModel } from "../models/product.model.js"

class ProductManager {
    async getProducts() {
        try {
            const products = await productModel.find({});
            return products;
        } catch (error) {
            throw error;
        }
    }
    async createProduct(obj) {
        try {
            const product = await productModel.create(obj)
            return product;
        } catch (error) {
            throw error
        }
    }
    async getProductsById(id) {
        try {
            const product = await productModel.findById(id)
            return product
        } catch (error) {
            throw error
        }
    }
    async deleteOne(id){
        try {
            const response = await productModel.findByIdAndDelete(id)
            return response
        } catch (error) {
            return error
        }
    }
    async updateOne(post, body) {
        console.log(post);
        console.log(body);
        try {
          const response = await productModel.findByIdAndUpdate(post, { 
            precio: body
           })
          return response
        } catch (error) {
          return error
        }
      }
}

export const productsManager = new ProductManager;