const express = require('express');
const fs = require('fs');
const ProductManager = require('./ProductManager');
const CartManager = require('./cartManager'); // Importar la clase CartManager que hemos definido

const app = express();
app.use(express.json());

const productManager = new ProductManager('products.json');
const cartManager = new CartManager('cart.json'); // Crear una instancia de CartManager

// Ruta raíz GET /api/products
app.get('/api/products', async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  try {
    const products = await productManager.getProducts();
    res.json(products.slice(0, limit));
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).send('Error al obtener los productos');
  }
});

// Ruta GET /api/products/:pid
app.get('/api/products/:pid', async (req, res) => {
  const productId = req.params.pid;
  try {
    const product = await productManager.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send('Producto no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).send('Error al obtener el producto');
  }
});

// Ruta POST /api/products
app.post('/api/products', async (req, res) => {
  const { title, description, code, price, stock, category } = req.body;
    try {
      const newProduct = await productManager.addProduct({
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
      });
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      res.status(500).send('Error al agregar el producto');
    }
  });

// Ruta PUT /api/products/:pid
app.put('/api/products/:pid', async (req, res) => {
  const productId = req.params.pid;
  const updatedFields = req.body;
  try {
    const updatedProduct = await productManager.updateProduct(productId, updatedFields);
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).send('Producto no encontrado');
    }
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).send('Error al actualizar el producto');
  }
});

// Ruta DELETE /api/products/:pid
app.delete('/api/products/:pid', async (req, res) => {
  const productId = req.params.pid;
  try {
    const deleted = await productManager.deleteProduct(productId);
    if (deleted) {
      res.json({ message: 'Producto eliminado correctamente' });
    } else {
      res.status(404).send('Producto no encontrado');
    }
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).send('Error al eliminar el producto');
  }
});

// Ruta raíz POST /api/carts
app.post('/api/carts', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    console.error('Error al crear el carrito:', error);
    res.status(500).send('Error al crear el carrito');
  }
});

// Ruta GET /api/carts/:cid
app.get('/api/carts/:cid', async (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = await cartManager.getCartById(cartId);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).send('Carrito no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).send('Error al obtener el carrito');
  }
});

// Ruta POST /api/carts/:cid/product/:pid
app.post('/api/carts/:cid/product/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;
  try {
    const cart = await cartManager.addProductToCart(cartId, productId, quantity);
    res.json(cart);
  } catch (error) {
    console.error('Error al agregar el producto al carrito:', error);
    res.status(500).send('Error al agregar el producto al carrito');
  }
});

// Inicia el servidor en el puerto 8080
app.listen(8080, () => {
  console.log('Servidor iniciado en http://localhost:8080');
});
