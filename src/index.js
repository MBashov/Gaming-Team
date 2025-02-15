import express from 'express'
import handlebars from 'express-handlebars'

import routes from '../routes.js';

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
    }
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

//* Express setup
app.use(express.static('src/public'));  //* Static middleware - get public recources
app.use(express.urlencoded({ extended: false }));  //* Body-parser - parse data in req.body
app.use(routes);


app.listen(5000, () => console.log('Server started on port http://localhost:5000'));