import express from 'express'

const app = express();

app.use(express.static('src/public'));  //* Static middleware - get public recources
app.use(express.urlencoded({ extended: false }));  //* Body-parser - parse data in req.body

app.get('/', (req, res) => {
    res.send('It works');
})



app.listen(5000, () => console.log('Server started on port http://localhost:5000'));