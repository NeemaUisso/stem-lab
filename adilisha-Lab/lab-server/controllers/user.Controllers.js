
import User from '../models/user.Model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import router from '../Routes/user.Routes.js';

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, gender, level, school, phone, email, password,confirmPassword } = req.body;
    // hakikisha:taarifa zote muhimu zipo
    if (!firstName || !lastName || !email || !password ||!gender ||!level || !school || !phone) {
        return res.status(400).json({ error: 'All fields are required' });
        }
    // hakikisha:barua pepe ni halali
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }   
    // hakikisha:simu ni halali
    const phoneRegex = /^\+?[0-9]{10,15}$/; 
    if (!phoneRegex.test(phone)) {  
        return res.status(400).json({ error: 'Invalid phone number format' });
    }
 if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }   
    // hakikisha:mtumiaji hajadahiriwa
    const existingUser = await User.findOne({ email });
    if (existingUser) { 
        return res.status(400).json({ error: 'User already exists' });
    }
    // unda mtumiaji mpya
    const newUser = new User({
      firstName,
      lastName, 
      gender,
        level,
        school,
        phone,
        email,
        password, 
    }); 

    await newUser.save();
    
    // jibu na taarifa ya mafanikio
    res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }     
}


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hakikisha: barua pepe na nenosiri vipo
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Pata mtumiaji kwa barua pepe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Thibitisha nenosiri
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Unda token ya JWT
 const token = jwt.sign({
   userId: user._id,
    firstName: user.firstName,
  email: user.email,
  role: user.role

 },
  process.env.JWT_SECRET, { expiresIn: '1h' });
  
    res.status(200).json({ token, userId: user._id, message: 'Login successful' });

  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  } 
}

         

