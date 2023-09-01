
import { Router } from "express";
import { carritoManager } from "../dao/managers/cartManagerMongo.js";
import { productsManager } from '../dao/managers/productManagerMongo.js'

const router = Router()


// Ruta raíz POST /api/carts
router.post('/', async (req, res) => {
  const productId = req.body.productId;
  console.log(productId);
  const product = await productsManager.getProductsById(productId);

  if (!product) {
    return res.status(400).json({ error: 'Producto no encontrado' });
  }

  const data = {
    productId: productId,
    cantidad: req.body.cantidad
  }

  try {
    const newCart = await carritoManager.createCart(data);
    // Realizar el proceso de población aquí

    res.status(201).json(newCart);
  } catch (error) {
    console.error('Error al crear el carrito:', error);
    res.status(500).send('Error al crear el carrito');
  }
});

//Esta funcion la genere para borrar los carritos de prueba que habia generado.
router.delete("/", async(req, res) =>{
  try {
    const products = await carritoManager.getCarrito()
    if (products.length) {
      const deleteCarritos = await carritoManager.deleteAll()
      res.status(200).json({message: "Carritos eliminados"})
    } else {
      res.status(200).json({ message: 'No hay carritos para eliminar' })
    }
  } catch (error) {
    
  }
})

router.get("/", async (req,res) =>{
  
  try {
    const carrito = await carritoManager.getCarrito()
    console.log(carrito);
    if(carrito.length){
      res.status(200).json({message: carrito})
    }else{
      res.status(200).json({message: "No se ha creado un carrito"})
    }
  } catch (error) {
    res.status(400).json({ error })
  }
})

export default router