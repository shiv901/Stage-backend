import mongoose from 'mongoose';
import User from '../src/models/User';

require('dotenv').config();

const seedData = async () => {
  await mongoose.connect(process.env.MONGO_URI!);

  const users = [
    {
      username: 'user1',
      password: '$2a$10$OMYPbJfQQLycaDgO6RNBUOstkIP6Fde7aAOt/ecL679iwSw4UVAKe', // '1234'
      preferences: {
        favoriteGenres: ['Action', 'Comedy'],
        dislikedGenres: ['Horror'],
      },
      watchHistory: [],
    },
  ];

  for (const user of users) {
    await new User(user).save();
  }

  await mongoose.connection.close();
};

seedData().catch((err) => console.error(err));
