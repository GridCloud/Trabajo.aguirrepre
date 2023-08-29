
import { Router } from "express";
import { carritoManager } from "../dao/managers/cartManagerMongo.js";
import { productsManager } from '../dao/managers/productManagerMongo.js'

const router = Router()


// Ruta raíz POST /api/carts
router.post('/', async (req, res) => {
  const productId = req.body.productId;
  const product = await productsManager.getProductsById(productId);
  const data = {
    productId: productId,
    productoNombre: product.nombre, // Agregar el nombre del producto encontrado
    cantidad: req.body.cantidad
  }
  try {
    const newCart = await carritoManager.createCart(data);
    res.status(201).json(newCart);
  } catch (error) {
    console.error('Error al crear el carrito:', error);
    res.status(500).send('Error al crear el carrito');
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await carritoManager.deleteOne(req.params.id);
    if (deletedProduct) {
      res.status(200).json({ message: 'Producto eliminado' });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router