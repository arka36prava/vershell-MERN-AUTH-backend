import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin like mobile apps or curl requests
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,  // if you use cookies or auth headers
}));

app.use(express.json());
app.use(cookieParser());

// API endpoints
app.get('/', (req, res) => res.send("Api is working fine"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(port, () => console.log(`Server running on PORT : ${port}`));
