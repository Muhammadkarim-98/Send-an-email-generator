// // BISMILLAH
const express = require("express");
const app = express();
const path = require("path");
const nodemailer = require("nodemailer");
const pug = require("pug");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.status(200).render("page", { title: "Send an Email!" });
});

app.post("/send-email", (req, res, err) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "yours@gmail.com",
            pass: "yourPass",
        },
    });

    const mailOptions = {
        from: `"UzbekDev98" <yours@gmail.com>`,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.body,
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
    res.render("page", { title: "Message has sent!" });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});