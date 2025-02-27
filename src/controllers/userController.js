import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Crear un nuevo usuario
export const crearUsuario = async (req, res) => {
  const { nombreUsuario, password } = req.body;

  if (!nombreUsuario || !password) {
    return res.status(400).json({ error: "Nombre de usuario y contraseña son requeridos" });
  }

  try {
    // Verificar si el usuario ya existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { nombreUsuario }
    });

    if (usuarioExistente) {
      return res.status(400).json({ error: "El nombre de usuario ya está en uso" });
    }

    // Hashear la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombreUsuario,
        password: passwordHash,
      },
    });

    res.status(201).json({
      message: "Usuario creado exitosamente",
      usuario: {
        id: nuevoUsuario.id,
        nombreUsuario: nuevoUsuario.nombreUsuario,
        createAt: nuevoUsuario.createAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario", details: error.message });
  }
};

// Login de usuario
export const loginUsuario = async (req, res) => {
  const { nombreUsuario, password } = req.body;

  if (!nombreUsuario || !password) {
    return res.status(400).json({ error: "Nombre de usuario y contraseña son requeridos" });
  }

  try {
    // Buscar el usuario en la base de datos
    const usuario = await prisma.usuario.findUnique({
      where: { nombreUsuario }
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Comparar la contraseña ingresada con la hasheada
    const esCorrecta = await bcrypt.compare(password, usuario.password);

    if (!esCorrecta) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Generar el JWT
    const token = jwt.sign(
      { id: usuario.id, nombreUsuario: usuario.nombreUsuario },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: "Login exitoso",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Error en el login", details: error.message });
  }
};
