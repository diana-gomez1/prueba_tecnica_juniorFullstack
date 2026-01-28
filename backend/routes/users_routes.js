const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');


// Crear usuario
router.post('/', userController.createUser);
// Listar usuarios
router.get('/', userController.getUsers);
// Actualizar usuario
router.put('/:id', userController.updateUser);
// Eliminar usuario
router.delete('/:id', userController.deleteUser);

module.exports = router;



