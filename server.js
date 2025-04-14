import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import pool from './src/db.js';
import session from 'express-session';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 10
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            try {
                const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

                if (result.rows.length === 0) {
                    return done(null, false, { message: 'User not found' });
                }

                const user = result.rows[0];

                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect password' });
                }
                done(null, user);
                
            } catch (err) {
                done(err);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});


passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.user = req.user || null; 
    next();
});

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

app.get('/', (req, res) => {
    res.render('index.ejs', { message: "Hello from EJS!" });
});

app.get('/contactus', (req, res)=>{
    res.render('contactus.ejs');
});

app.get('/aboutus', (req, res)=>{
    res.render('aboutus.ejs');
});

app.get('/menu', isAuthenticated, (req, res)=>{
    res.render('menu.ejs');
});

app.get('/reservation', (req, res)=>{
    res.render('reservation.ejs');
});

app.get('/login', (req, res)=>{
    res.render('login.ejs');
});

app.get('/signup', (req, res)=>{
    res.render('signup.ejs');
});

app.get('/profile', isAuthenticated, (req, res) => {
    res.render('profile.ejs', { user: req.user });
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/menu',
    failureRedirect: '/login',
}));

app.get('/logout', (req, res, next) => {
    req.logout(err => {
      if (err) return next(err);
      res.redirect('/');
    });
});

app.post('/signup', async (req, res) => {
    const { name, email, password, dob, gender, phone } = req.body;
  
    try {
      const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (existingUser.rows.length > 0) {
        return res.send('User already exists. <a href="/signup">Try again</a>');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await pool.query(
        `INSERT INTO users (name, email, password, dob, gender, phone)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [name, email, hashedPassword, dob, gender, phone]
      );
  
      res.redirect('/login');
    } catch (err) {
      console.error(err);
      res.send('Error during signup. Try again.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
