import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(product) {
    console.log(product)
    try {
      const products = await this.getProducts();

      // Verificar si ya existe un producto con el mismo código
      const existingProduct = products.find((p) => p.code === product.code)
      if (existingProduct) {
        throw new Error('Ya existe un producto con el mismo código.');
      }

      const newProduct = { ...product, id: products.length + 1 };
      products.push(newProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const infoArchivo = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(infoArchivo);
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    const idnumber = parseInt(id)
    try {
      const products = await this.getProducts();
      return products.find((product) => product.id === idnumber);
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, updatedFields) {
    const idnumber = parseInt(id)
    try {
      const products = await this.getProducts();
      const index = products.findIndex((product) => product.id === idnumber);
      if (index !== -1) {
        products[index] = { ...products[index], ...updatedFields };
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return products[index];
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    const idnumber = parseInt(id)
    try {
      const products = await this.getProducts();
      const filteredProducts = products.filter((product) => product.id !== idnumber);
      await fs.promises.writeFile(this.path, JSON.stringify(filteredProducts, null, 2));
      return filteredProducts.length;
    } catch (error) {
      console.log("El error esta manija");
      throw error;
    }
  }
}

export default ProductManager