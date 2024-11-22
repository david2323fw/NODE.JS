// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { addProduct, updateProduct, deleteProduct, getProducts } = require('../controllers/productController');
const { verifyAdmin } = require('../middlewares/authMiddleware');

// Rutas de productos
router.get('/', getProducts);  // Obtener productos
router.post('/', verifyAdmin, addProduct);  // Agregar producto (admin)
router.put('/:id', verifyAdmin, updateProduct);  // Modificar producto (admin)
router.delete('/:id', verifyAdmin, deleteProduct);  // Eliminar producto (admin)

module.exports = router;
