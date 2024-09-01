const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretkeyy';

const app = express();

// Connect to the UsersDB
const usersDbURI = 'mongodb+srv://surajsenapati58:Suraj%4024@cluster0.yzsvn.mongodb.net/UsersDB?retryWrites=true&w=majority&appName=Cluster0';
const disasterDbURI = 'mongodb+srv://surajsenapati58:Suraj%4024@cluster0.yzsvn.mongodb.net/disaster_db?retryWrites=true&w=majority&appName=Cluster0';

const usersConnection = mongoose.createConnection(usersDbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const disasterConnection = mongoose.createConnection(disasterDbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

usersConnection.on('connected', () => {
    console.log('Connected to UsersDB');
});

disasterConnection.on('connected', () => {
    console.log('Connected to disaster_db');
});

usersConnection.on('error', (err) => {
    console.log('Error connecting to UsersDB:', err);
});

disasterConnection.on('error', (err) => {
    console.log('Error connecting to disaster_db:', err);
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Define the Mongoose schema and models using the specific connections
const disasterSchema = new mongoose.Schema({
    id: Number,
    keyword: String,
    location: String,
    text: String,
    target: Number,
    Severity: String,
});

const Disaster = disasterConnection.model('Disaster', disasterSchema);
const userSchema = new mongoose.Schema({ 
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
 })

 const User = usersConnection.model('User', userSchema)


// Routes for user registration and login using the usersConnection
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error Signing Up' });
    }
});

app.get('/signup', async (req, res) => {
    try {
        const users = await User.find();
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Unable to get users' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid Credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid Credentials' });
        }
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1hr' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

// Route to fetch disaster data using the disasterConnection
app.get('/disasters', async (req, res) => {
    try {
        const disasters = await Disaster.find().sort({_id:-1}).limit();
        res.json(disasters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});