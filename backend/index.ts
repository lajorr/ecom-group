import dotenv from 'dotenv';
import express from "express";
import { connectMongoDb } from "./connection";
import BrandRoutes from "./routes/brands";
import CategoryRoutes from "./routes/categories";
import ProductRoutes from "./routes/products";

import cors from 'cors';

dotenv.config();

const app: express.Application = express();
const PORT: number = Number(process.env.PORT) || 8000;

connectMongoDb(process.env.MONGO_URL as string)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/brands', BrandRoutes);
app.use('/api/categories', CategoryRoutes);
app.use('/api/products', ProductRoutes);



app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));