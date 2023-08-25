import { Router } from 'express'
import { productsManager } from '../dao/managers/productManagerMongo.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const productos = await productsManager.getProducts()
    if (productos.length) {
      res.status(200).json({ message: 'Users', productos })
    } else {
      res.status(200).json({ message: 'No users found' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const producto = await productsManager.getProductsById(id)
    if (!user) {
      res.status(400).json({ message: 'Invalid ID' })
    } else {
      res.status(200).json({ message: 'producto encontrado', producto })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.post('/', async (req, res) => {
  const { nombre, precio, alto, ancho, largo, stock } = req.body
  if (!nombre || !precio || !alto || !ancho || !largo || !stock) {
    return res.status(400).json({ message: 'Datos Faltantes' })
  }
  try {
    const newProduct = await productsManager.createProduct(req.body)
    res.status(200).json({ message: 'User created', user: newProduct })
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.put('/:id', async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.delete('/:id', async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error })
  }
})

export default router