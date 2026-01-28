const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const userRoutes = require('./routes/users_routes');
const orderRoutes = require('./routes/orders_routes');

app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

