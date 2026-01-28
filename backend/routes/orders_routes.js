const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/orders_controller');
// Crear pedido
router.post('/', ordersController.createOrder);
// Listar pedidos 
router.get('/', ordersController.getOrders);
// Actualizar pedido
router.put('/:id', ordersController.updateOrder);
// Eliminar pedido
router.delete('/:id', ordersController.deleteOrder);

module.exports = router;




