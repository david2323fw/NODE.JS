// controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Registro de usuario
exports.register = async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ message: 'Usuario ya existe' });

    const newUser = new User({ nombre, email, password, rol });
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

    const match = await user.matchPassword(password);
    if (!match) return res.status(400).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user._id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '5h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
};
