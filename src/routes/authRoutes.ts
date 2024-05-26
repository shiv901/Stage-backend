import { Request, Response, Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const router = Router();

// User Registration
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(401)
        .json({ error: 'Username & Password are required' });
    }
    // can add more password validations here like length, alpha-numeric with at least capital letter
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

const secret = process.env.JWT_SECRET;

// User Login
router.post('/login', async (req: Request, res: Response) => {
  if (req.method !== 'POST') return res.status(401).send();
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(401)
        .json({ error: 'Username & Password are required' });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        error: 'Authentication failed! Username or password is wrong',
      });
    }

    // console.log({ username, password }, user, user.password);

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    console.log(secret);
    if (secret) {
      const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(500).json({ error: 'Login failed' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
