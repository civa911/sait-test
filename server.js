const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nemo.masik@bk.ru', // замените на свою почту
        pass: 'Vlad2002ru'  // замените на свой пароль
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Error with transporter configuration:', error);
    } else {
        console.log('Transporter is ready to send emails');
    }
});

app.post('/send-email', (req, res) => {
    const { name, email, result } = req.body;

    let mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Ваш результат теста',
        text: `${name}, ваш результат: ${result}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
