const bcrypt = require('bcryptjs'); //library for hashing passwords
const jwt = require('jsonwebtoken'); //library for generating JWT
const { createUser, findUserByEmail } = require('../models/user.model');


//Register a new user.
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Fill in all fields' });
    }

    // verify if the email is already in use
    if (await findUserByEmail(email)) {
      return res.status(409).json({ error: 'E-mail already in use' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // create user in the database
    const userId = await createUser({ username, email, passwordHash });
    return res.status(201).json({ message: 'User registered', userId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error registering user' });
  }
};


//User login and return a JWT token.
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Fill in all fields' });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};