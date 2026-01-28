const users = require('../data/users');
const orders = require('../data/orders');

const createOrder = (req, res) => {
  try {
    const { id_usuario, description, total, state } = req.body;

    if (!id_usuario || !description || !total) {
      return res.status(400).json({ message: 'Datos incompletos' });
    }

    const userExists = users.find(u => u.id == id_usuario);
    if (!userExists) {
      return res.status(404).json({ message: 'Usuario no existe' });
    }//erifica que el usuario exista🔹 Evita pedidos huérfanos--Mantengo integridad de datos.

    const newOrder = {
      id: orders.length + 1,
      id_usuario,
      description,
      total,
      order_date: new Date(),
      state: state || 'pendiente'//i no llega estado → asigna pendiente🔹 Usa operador OR (||)
    };

    orders.push(newOrder);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear pedido' });
  }
};

const getOrders = (req, res) => {
  const { id_usuario } = req.query;

  if (id_usuario) {
    const userOrders = orders.filter(o => o.id_usuario == id_usuario);
    return res.json(userOrders);
  }

  res.json(orders);
};


const updateOrder = (req, res) => {
  try {
    const { id } = req.params;
    const { description, total, state } = req.body;
    const order = orders.find(o => o.id == id);

    if (!order) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    order.description = description ?? order.description;
    order.total = total ?? order.total;
    order.state = state ?? order.state;
    res.status(200).json(order);
    } catch (error) {
    res.status(500).json({ message: 'Error al actualizar pedido' });
    }
};
const deleteOrder = (req, res) => {
    try {
    const { id } = req.params;

    const index = orders.findIndex(o => o.id == id);
        
        
    if (index === -1) {
        return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    orders.splice(index, 1);
    res.status(200).json({ message: 'Pedido eliminado correctamente' });
    }
    catch (error) {
    res.status(500).json({ message: 'Error al eliminar pedido' });
    }
};

module.exports = {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder
};