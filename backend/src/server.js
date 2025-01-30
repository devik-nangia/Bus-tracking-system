import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Routes
app.post('/api/routes', async (req, res) => {
  try {
    const { name, startLocation, endLocation, busCapacity, status } = req.body;
    const route = await prisma.route.create({
      data: {
        name,
        startLocation,
        endLocation,
        busCapacity,
      },
    });
    res.json(route);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/routes', async (req, res) => {
  try {
    const routes = await prisma.route.findMany({
      include: {
        tasks: true,
      },
    });
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/routes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, startLocation, endLocation, busCapacity, status } = req.body;
    const route = await prisma.route.update({
      where: { id: parseInt(id) },
      data: {
        name,
        startLocation,
        endLocation,
        busCapacity,
        status,
      },
    });
    res.json(route);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/routes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.route.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Route deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});