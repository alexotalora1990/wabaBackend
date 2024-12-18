import Producto from "../models/productos.js";

const httpProducto = {
  // Obtener todos los productos
  getProductos: async (req, res) => {
    try {
      const productos = await Producto.find();
      res.json(productos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener productos" });
    }
  },

  // Obtener un producto por ID
  getProductoById: async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await Producto.findById(id);
      if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
      res.json(producto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener el producto" });
    }
  },

  // Crear un producto
  postProducto: async (req, res) => {
    try {
      const nuevoProducto = new Producto(req.body);
      await nuevoProducto.save();
      res.status(201).json({ mensaje: "Producto creado", producto: nuevoProducto });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear el producto" });
    }
  },

  // Actualizar un producto
  putProducto: async (req, res) => {
    try {
      const { id } = req.params;
      const productoActualizado = await Producto.findByIdAndUpdate(id, req.body, { new: true });
      if (!productoActualizado) return res.status(404).json({ error: "Producto no encontrado" });
      res.json({ mensaje: "Producto actualizado", producto: productoActualizado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al actualizar el producto" });
    }
  },

  // Activar un producto
  activarProducto: async (req, res) => {
    try {
      const { id } = req.params;
      const productoActivado = await Producto.findByIdAndUpdate(id, { estado: 1 }, { new: true });
      res.json({ mensaje: "Producto activado", producto: productoActivado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al activar el producto" });
    }
  },

  // Desactivar un producto
  desactivarProducto: async (req, res) => {
    try {
      const { id } = req.params;
      const productoDesactivado = await Producto.findByIdAndUpdate(id, { estado: 0 }, { new: true });
      res.json({ mensaje: "Producto desactivado", producto: productoDesactivado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al desactivar el producto" });
    }
  },
};

export default httpProducto;
