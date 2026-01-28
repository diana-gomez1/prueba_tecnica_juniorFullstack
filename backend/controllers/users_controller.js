const users = require('../data/users');
/*Importa el arreglo users desde data/users.js

Ese arreglo es compartido por todo el backend,Importo el arreglo que simula la base de datos de usuarios.*/

const createUser = (req, res) => {/*/Define la función que manejará la creación de usuarios
🔹 req = request (lo que llega)
🔹 res = response (lo que devuelves*/
  try {//Inicia un bloque de control de errores Evita que la app se caiga si algo falla, Uso try/catch para manejar errores inesperados.
    const { name, email, password } = req.body;//🔹 Extrae los datos enviados desde el frontend


    if (!name || !email || !password) {//Verifica que todos los campos existan
      return res.status(400).json({//Retorno 400 cuando los datos son inválidos.
        message: 'Todos los campos son obligatorios'
      });
    }

    const newUser = {//Crea el objeto usuario
      id: users.length + 1,//Genera un ID incremental
      name,
      email,
      password,
      creation_date: new Date()//🔹 Guarda la fecha actual del sistema
    };

    users.push(newUser);//Inserta el usuario en el arreglo- Simula un INSERT en base de datos

    res.status(201).json(newUser);//201 = recurso creado,Devuelve el usuario creado
  } catch (error) {//Captura cualquier error inesperado
    res.status(500).json({
      message: 'Error al crear usuario'
    });//Error interno del servidor, Protege la app
  }
};

const getUsers = (req, res) => {//Función para obtener usuarios
  res.status(200).json(users);//🔹 Retorna el arreglo completo,Devuelvo todos los usuarios registrados.


};
const updateUser = (req, res) => {
  try {
    const { id } = req.params;//Obtiene el id desde la URL
    const { name, email, password } = req.body;

    const user = users.find(u => u.id == id);//Busca el usuario en el arreglo,find devuelve el primer elemento que cumple la condición

    if (!user) {//🔹 Valida existencia del usuario
      return res.status(404).json({//🔹 404 = no existe el recurso
        message: 'Usuario no encontrado'
      });
    }

    user.name = name ?? user.name;//Si nombre viene → se actualiza Si NO → conserva el valor anterior -
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

    const index = users.findIndex(u => u.id == id);//Busca la posición del usuario en el arreglo 🔹 Devuelve -1 si no existe

    if (index === -1) {//🔹 Valida que exista
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }

    users.splice(index, 1);//Elimina 1 elemento en la posición encontrada🔹 Simula un DELETE en BD

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
//Permite que las rutas usen estas funciones  🔹 Sin esto → las rutas fallan