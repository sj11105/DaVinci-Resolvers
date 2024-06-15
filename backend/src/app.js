require('dotenv').config();
const axios = require('axios');
const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user.js');
const multer = require('multer');
const {storage} = require('./cloudConfig.js');
const upload = multer({storage});
const mongoose = require('mongoose');
const port = 8080;
app.set('views', path.join(__dirname, '/views'));
const { isLoggedIn } = require('./middleware.js');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
let emailforevery=" ";

// Session configuration
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};
app.use(session(sessionOptions));

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MongoDB connection
main().then(() => {
    console.log('MongoDB connection successful');
}).catch((err) => console.error(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/pregnancy');
}

app.use((req,res,next)=>{
    
    res.locals.currUser=req.user;
    
    next();
  });

// Set up email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.email,
        pass: process.env.email_pass,
    }
});

// Routes
app.get('/login', async (req, res) => {
    res.render('users/login.ejs', { cart: req.session.cart });
});

app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), async (req, res) => {
    res.redirect('/');
});

app.get('/signup', async (req, res) => {
    res.render('users/signup.ejs');
});

app.post('/signup', upload.single('image'), async (req, res, next) => {
        const { username, email, password, whatsappnumber, address } = req.body;
        emailforevery=email;
        const user1 = await User.findOne({ email });
        if (user1) {
            return res.redirect('/login');
        }
       else{
        const user = new User({ username, email, whatsappnumber, address });
            user.image.path = req.file.path;
                user.image.filename=req.file.filename
            ;
        
        
        let reguser = await User.register(user, password);
        req.login(reguser, (err) => {
            if (err) {
                return next(err);
            }
            console.log('loginhogaya');
            res.status(200).json({ message: '2020' });
        });}
    
});

app.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});



app.get('/opencvbc', async (req, res) => {
    try {
        const response = await axios({
            url: 'http://127.0.0.1:5001/video_feed', // URL of the Flask endpoint
            method: 'GET',
            responseType: 'stream'
        });

        res.setHeader('Content-Type', 'multipart/x-mixed-replace; boundary=frame');
        response.data.pipe(res);
    } catch (error) {
        console.error('Error fetching video feed:', error);
        res.status(500).send('Error fetching video feed');
    }
});




app.get('/forgotpassword', async (req, res) => {
    res.render('users/enteremail.ejs');
});

app.post('/forgotpassword', async(req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        req.flash('error', 'Email not registered');
        return res.redirect('/login');
    }

    const otps = crypto.randomBytes(3).toString('hex');
    user.otp = otps;
    user.resetPasswordExpires = Date.now() + 180000; // 3 minutes to expire

    const mailOptions = {
        from: process.env.email,
        to: user.email,
        subject: 'Password Reset OTP (3 minutes validity)',
        text: `Your OTP for password reset is ${otps}`
    };

    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            console.error('Failed to send email:', error);
            req.flash('error', 'Failed to send email');
            return res.redirect('/forgotpassword');
        }

        await user.save();
        const emailo = user.email;
        res.render('users/enterotp.ejs', { emailo });
    });
});

app.post('/verifyotp', async (req, res) => {
    const { otp, emailfront } = req.body;
    const email = emailfront;
    let otpb = otp.replace(/\s/g, '');

    const user = await User.findOne({ email });
    if (user.otp === otpb) {
        await User.updateOne({ email }, { $set: { otp: null } });
        res.render('users/resetpassword', { emailfront });
    } else {
        await User.updateOne({ email }, { $set: { otp: null } });
        req.flash('error', 'Incorrect OTP');
        res.redirect('/forgotpassword');
    }
});
app.get("/printtheuser",(req,res)=>{
    console.log(emailforevery);
});
app.post('/resetpassword', async (req, res) => {
    const { newpassword, confirmpassword, emailfront } = req.body;
    const email = emailfront;

    if (newpassword === confirmpassword) {
        const user = await User.findOne({ email });
        user.setPassword(newpassword, async (err) => {
            if (err) {
                return res.status(500).send('Error setting new password');
            }
            user.resetPasswordExpires = undefined;
            await user.save();
            req.flash('success', 'Password reset successful');
            res.redirect('/login');
        });
    } else {
        res.render('users/resetpassword', { emailfront });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
