const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whiteList = ['http://localhost:8080', 'https:/myapp.com']
const options = {
  origin: (origin, callback) => {
    if(whiteList.includes(origin)) {
      callback(null, true);
    } else (
      callback(new Error('No permitido'))
    )
  }
}
app.use(cors());

app.get('/api', (req, res) => {
  res.send('Bienvenido a la API de DLaurentin.');
});

app.get('/api/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Mi puerto es: ' +  port);
});
