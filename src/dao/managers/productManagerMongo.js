import { productModel } from "../models/product.model.js"

class ProductManager {
    async getProducts(limit, page, query, sort) {
        // Convertir query a entero utilizando parseInt
        const parsedQuery = parseInt(query);
    
        // Verificar si parsedQuery es un número válido, si no, usar 0 como valor predeterminado
        const defaultQuery = isNaN(parsedQuery) ? 0 : parsedQuery;
    
        // Establecer valores predeterminados para limit y page
        const defaultLimit = limit === '' ? 3 : parseInt(limit);
        const defaultPage = page === '' ? 1 : parseInt(page);
        const defaultSort = sort === '' ? 0 : sort;
    
        try {
            const result = await productModel.paginate(
                { identificador: { $gt: defaultQuery } }, // Filtrar por identificador mayor que el valor defaultQuery
                {
                    limit: defaultLimit,
                    page: defaultPage,
                    sort: { precio: defaultSort } // Ordenar por precio
                }
            );
    
            const info = {
                status: "success",
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.hasPrevPage ? result.prevPage : null,
                nextPage: result.hasNextPage ? result.nextPage : null,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.hasPrevPage
                    ? `http://localhost:8080/api/users?page=${result.prevPage}`
                    : null,
                nextLink: result.hasNextPage
                    ? `http://localhost:8080/api/users?page=${result.nextPage}`
                    : null,
            };
    
            return info;
        } catch (error) {
            const errorResponse = {
                status: "error",
                error: error.message // O cualquier otro mensaje de error que desees incluir
            };
            return errorResponse;
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
    async deleteAll(){
        try {
            const response = await productModel.deleteMany()
            return response
        } catch (error) {
            throw error
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