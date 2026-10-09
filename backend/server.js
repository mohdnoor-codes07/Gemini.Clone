import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const usersDB = [];

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.log("Warning: GEMINI_API_KEY is missing!");
}
const ai = new GoogleGenAI({ apiKey });

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = usersDB.find(u => u.email === email);
    if (userExists) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = { name, email, password: hashedPassword };
    usersDB.push(newUser);

    return res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    return res.status(500).json({ message: "Signup failed." });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = usersDB.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { email: user.email, name: user.name },
      process.env.JWT_SECRET || 'my_secret_key',
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      token,
      user: { name: user.name, email: user.email }
    });
  } catch (error) {
    return res.status(500).json({ message: "Login failed." });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
    });

    return res.json({ text: response.text || "No response" });
  } catch (error) {
    console.error("Gemini Error:", error);
    return res.status(500).json({ error: "Gemini request failed." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
