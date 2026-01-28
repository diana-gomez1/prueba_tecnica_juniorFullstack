const { users, generateUserId } = require('../data/users');



const createUser = (req, res) => {
  try {
    const { name, email, password } = req.body;


    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Todos los campos son obligatorios'
      });
    }
    //se valida formato de email
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Email inválido' });
    }

    // Verificar que no exista un usuario con el mismo email
    const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    const newUser = {
     id: generateUserId(),
      name,
      email,
      password,
      creation_date: new Date()
    };

    users.push(newUser);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({
      message: 'Error al crear usuario'
    });
  }
};

const getUsers = (req, res) => {
  res.status(200).json(users);


};
const updateUser = (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = users.find(u => u.id == id);

    if (!user) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.password = password ?? user.password;

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar usuario'
    });
  }
};
const deleteUser = (req, res) => {
  try {
    const { id } = req.params;

    const index = users.findIndex(u => u.id == id);

    if (index === -1) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }

    users.splice(index, 1);

    res.status(200).json({
      message: 'Usuario eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar usuario'
    });
  }
};
module.exports = {
    createUser,
    getUsers,  
    updateUser,
    deleteUser
};
