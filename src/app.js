import express from 'express';
import userRouters from './routes/products.router.js';
import cartRouters from './routes/cart.router.js';
import viewsRouter from "./routes/views.router.js"
import {engine} from 'express-handlebars'
import { currentDirectory } from './utils.js';
import "./dao/dbConfig.js"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(currentDirectory + '/public'));


// HANDLEBARS
app.engine('handlebars', engine())
app.set('views', currentDirectory + '/views')
app.set('view engine', 'handlebars')

app.use('/api/views', viewsRouter)
app.use('/api/products', userRouters);
app.use('/api/carts', cartRouters);

// Inicia el servidor en el puerto 8080
app.listen(8080, () => {
  console.log('Servidor iniciado en http://localhost:8080');
});
