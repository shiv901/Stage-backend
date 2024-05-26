import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { handleError } from '../helperFns';

// Check if JWT_SECRET is defined
const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

// User Registration Controller
export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return handleError(res, 'Username & Password are required', 400);
    }

    // Password validation for length & others
    // if (
    //   password.length < 8 ||
    //   !/\d/.test(password) ||
    //   !/[A-Z]/.test(password)
    // ) {
    //   return handleError(
    //     res,
    //     'Password must be at least 8 characters long, contain at least one number, and one uppercase letter',
    //     400
    //   );
    // }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return handleError(res, 'Username is already taken', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    handleError(res, 'Registration failed');
  }
};

// User Login Controller
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return handleError(res, 'Username & Password are required', 400);
    }

    const user = await User.findOne({ username });
    if (!user) {
      return handleError(
        res,
        'Authentication failed! Username or password is wrong',
        401
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return handleError(res, 'Authentication failed', 401);
    }

    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    handleError(res, 'Login failed');
  }
};
