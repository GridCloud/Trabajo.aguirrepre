
import {Router} from "express";
import CartManager from "../dao/managers/cartManager.js";

const router = Router()
const cartManager = new CartManager('cart.json')

// Ruta raíz POST /api/carts
router.post('/api/carts', async (req, res) => {
    try {
      const newCart = await cartManager.createCart();
      res.status(201).json(newCart);
    } catch (error) {
      console.error('Error al crear el carrito:', error);
      res.status(500).send('Error al crear el carrito');
    }
  });
  
  // Ruta GET /api/carts/:cid
  router.get('/api/carts/:cid', async (req, res) => {
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
  router.post('/api/carts/:cid/product/:pid', async (req, res) => {
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

export default router