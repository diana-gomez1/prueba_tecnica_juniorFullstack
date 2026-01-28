let orders = [];
let orderId = 1;

const generateOrderId = () => orderId++;

module.exports = {
  orders,
  generateOrderId
};

  