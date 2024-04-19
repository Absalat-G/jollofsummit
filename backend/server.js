const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 5000;


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',      
  password: '', 
  database: 'jollof'
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


app.use(cors());
app.use(express.json());


app.post('/RegistrationPage', (req, res) => {
  const { username, email, password } = req.body;

  
  const sql = 'INSERT INTO sign_up(username, email, password) VALUES (?, ?, ?)';
  connection.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ message: 'Error registering user' });
      return;
    }
    console.log('User registered successfully');
    res.status(201).json({ message: 'User registered successfully' });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  
  const sql = 'SELECT * FROM sign_up WHERE email = ? AND password = ?';
  connection.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error('Error checking user login:', err);
      res.status(500).json({ message: 'Error checking user login' });
      return;
    }
    if (result.length === 0) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }
    console.log('Login successful');
    res.status(200).json({ message: 'Login successful' });
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
