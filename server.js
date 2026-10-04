const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Form ka data read karne ke liye
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Jab koi form submit karega, ye route chalega
app.post('/submit', (req, res) => {
    const formData = req.body;
    
    // Data ko console par print karega
    console.log('Naya Data Mila:', formData);

    // Data ko ek text file (`submissions.txt`) me save karta jayega
    const logData = `Name/Data: ${JSON.stringify(formData)}\n-------------------\n`;
    fs.appendFile('submissions.txt', logData, (err) => {
        if (err) {
            console.error('File me save karne me error aayi:', err);
            return res.status(500).send('Server Error');
        }
        res.send('Form successfully submit ho gaya hai!');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});