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
        } catch (error) {

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
    async deleteProduct(id) {
        try {
            const deleteProduct = await productModel.findByIdAndDelete(id)
        } catch (error) {
            throw error
        }
    }
    async updateOne(id, obj) {
        try {
          const response = await productModel.updateOne({ _id: id }, { ...obj })
          return response
        } catch (error) {
          return error
        }
      }
}

export const productsManager = new ProductManager;