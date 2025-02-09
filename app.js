// import express from "express"
// import cors from "cors"
//                                  import 'dotenv/config'
//                                   import dbConexion from "./database/mongoose.js"
//                                   import usuariosRoutes from "./routes/usuarios.js";
//                                   import clientesRoutes from "./routes/clientes.js";
//                                   import etiquetaSistemaRoutes from "./routes/etiquetaSistema.js";
//                                   import productosRoutes from "./routes/productos.js";
//                                   import campaniasSistemaRoutes from "./routes/campaniasSistema.js";
//                                   import campaniasClienteRoutes from "./routes/campaniasCliente.js";
//                                   import pagosRouter from "./routes/pagos.js";
//                                   import loginRoutes from "./routes/login.js";



//                                  const app = express();
//                                   app.use(express.json());
//                                 //   app.use(cors())
//                                 app.use(cors({
//                                     origin: 'http://localhost:5173', // Frontend
//                                     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
//                                     allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
//                                   }));

//                                   // Rutas
//                                   app.use("/api/usuarios", usuariosRoutes);
//                                   app.use("/api/clientes", clientesRoutes);
//                                   app.use("/api/etiquetaSistemas", etiquetaSistemaRoutes);
//                                   app.use("/api/productos", productosRoutes);
//                                   app.use("/api/campaniasSistema", campaniasSistemaRoutes);
//                                   app.use("/api/campaniasCliente", campaniasClienteRoutes);
//                                   app.use("/api/pagos", pagosRouter);
//                                   app.use("/api/login", loginRoutes);


 
//                                    app.listen(process.env.PORT,()=>{
//                                    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
//                                    dbConexion()
//                                     })

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import dbConexion from './database/mongoose.js';
import usuariosRoutes from './routes/usuarios.js';
import clientesRoutes from './routes/clientes.js';
import etiquetaSistemaRoutes from './routes/etiquetaSistema.js';
import productosRoutes from './routes/productos.js';
import campaniasSistemaRoutes from './routes/campaniasSistema.js';
import campaniasClienteRoutes from './routes/campaniasCliente.js';
import pagosRouter from './routes/pagos.js';
import loginRoutes from './routes/login.js';

const app = express();


app.use(cors())
app.use(express.json());

// Rutas
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/etiquetaSistemas", etiquetaSistemaRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/campaniasSistema", campaniasSistemaRoutes);
app.use("/api/campaniasCliente", campaniasClienteRoutes);
app.use("/api/pagos", pagosRouter);
app.use("/api/login", loginRoutes);

// Iniciar servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
  dbConexion(); // Conectar a la base de datos
});
