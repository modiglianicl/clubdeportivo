import express from 'express';
import path from 'path';
import 'dotenv/config';
import router from './routes/router.js'

const app = express();
const PORT = process.env.PORT || 3000;

// Rutas

app.use('/',router);


// Listen

app.listen(PORT , ()=> {
    console.log(`Server UP on http://localhost:${PORT}`)
})