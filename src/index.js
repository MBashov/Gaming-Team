import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';

import routes from './routes.js';
import { auth } from './middlewares/authMiddleware.js';
import { tempData } from './middlewares/tempDataMiddleware.js';

const app = express();

//* Db setup
try {
    await mongoose.connect('mongodb://localhost:27017/GamingTeam');
    console.log('Db conected succesfully');
} catch (err) {
    console.log('Cannot conect to Db');
    console.error(err.message);
}

//* Handlebars setup
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    },
    helpers: {
        setTitle(title) {
            this.pageTitle = title;
        }
    }
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

//* Express setup
app.use(express.static('src/public'));  //* Static middleware - get public recources
app.use(express.urlencoded({ extended: false }));  //* Body-parser - parse data in req.body
app.use(cookieParser());
app.use(expressSession({
    secret: '$2b$10$KeohpPQ4M6i23G/d4I768uplZM2/8sdRC5/gYaBDLddkd.Aizd/ssd',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }
}));

app.use(auth);
app.use(tempData);
app.use(routes);

app.listen(5000, () => console.log('Server started on port http://localhost:5000'));