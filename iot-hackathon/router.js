const app = require('express')();
const Main = require('./model');
const nodemailer = require('nodemailer');

app.get('/', (req, res) => {
    res.send('Hello!');
})

app.get('/get-values', (req, res) => {
    res.send(`${80 + Math.random() * 30};${94 + Math.random() * 6};${35 + Math.random() * 5}`);
})

app.get('/spo2-failed', (req, res) => {
    res.send(`${80 + Math.random() * 30};${94 + Math.random() * 6};${35 + Math.random() * 5}`);
})

app.post('/submit-sample', async (req, res) => {
    try {
        const { bpm, spo2, temp, imgs, email } = req.body;
        // console.log(req)

        let newMain = new Main({ bpm, spo2, temp, imgs, email });

        // newMain.verify();
        const success = await newMain.save();

        if(success){
            let testAccount = await nodemailer.createTestAccount();

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: testAccount.user, // generated ethereal user
                    pass: testAccount.pass, // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: 'SHDS <harishrohank2@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Received your diagnosis", // Subject line
                text: "Hello! We have received your report! Please wait while our experts analyze your report." // plain text body
                // html: "<b>Hello world?</b>", // html body
            });
            console.log(info)
        }

        return res.status(200).json(newMain);
    } catch (e) {
        console.error(e);
        return res.status(500).send("500: Internal Server Error");
    }
})

app.get('/admin', async (req, res) => {
    return res.json(await Main.find());
})

module.exports = app;