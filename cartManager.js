const fs = require('fs');

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async createCart() {
    try {
      const cartId = Date.now().toString(); // Genera un ID único para el carrito
      const cart = { id: cartId, products: [] };
      await fs.promises.writeFile(this.path, JSON.stringify(cart, null, 2));
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async getCartById(cartId) {
    try {
      const cartData = await fs.promises.readFile(this.path, 'utf-8');
      const cart = JSON.parse(cartData);
      if (cart.id === cartId) {
        return cart;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cartData = await fs.promises.readFile(this.path, 'utf-8');
      const cart = JSON.parse(cartData);
      const existingProductIndex = cart.products.findIndex(
        (product) => product.product === productId
      );

      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      await fs.promises.writeFile(this.path, JSON.stringify(cart, null, 2));
      return cart;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CartManager;
