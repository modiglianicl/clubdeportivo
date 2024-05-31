import express from 'express';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
const router = express.Router()

router.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'views/index.html'))
});

// Rutas
router.get('/agregar' ,(req,res) => {
    // Obtenemos datos y cargamos datos historicos
    let { nombre , precio } = req.query;
    let registroDeportes = JSON.parse(fs.readFileSync('data/Deportes.json','utf-8'));
    let nuevoRegistro = {
        nombre,
        precio
    }

    // Agregamos datos a registro historico
    registroDeportes.deportes.push(nuevoRegistro)

    // Reescribimos datos al JSON
    fs.writeFileSync('data/Deportes.json',JSON.stringify(registroDeportes));


    res.redirect('/')
})

router.get('/deportes',(req,res) => {
    res.sendFile(path.join(__dirname,'data/Deportes.json'))
})

router.get('/editar',(req,res) => {
    // Obtenemos datos y cargamos datos historicos
    let { nombre , precio } = req.query;
    let registroDeportes = JSON.parse(fs.readFileSync('data/Deportes.json','utf-8'))

    // Buscamos y editamos precio del deporte escrito
    let buscarDeporte = registroDeportes.deportes.find(x => x.nombre == nombre);

    if (buscarDeporte) {
        buscarDeporte.precio = precio
        console.log('Objeto actualizado')
    } else {
        console.log('Objeto no se encontro.')
        res.send('Objeto no encontrado, busca bien.')
    }

    // Rescribimos datos al JSON y redireccionamos a la pagina principal
    fs.writeFileSync('data/Deportes.json',JSON.stringify(registroDeportes));
    res.redirect('/')
})

router.get('/eliminar',(req,res) => {
    // Obtenemos datos y cargamos datos historicos
    let { nombre } = req.query;
    let registroDeportes = JSON.parse(fs.readFileSync('data/Deportes.json','utf-8'))

    // Borraremos el indice donde se encuentre el deporte que queremos
    const indiceBorrar = registroDeportes.deportes.findIndex(x => x.nombre == nombre);
    console.log(indiceBorrar) // Funciona, me deuvelve el indice

    if (indiceBorrar !== -1) { // distinto a -1 ya que documentacion dice que si no encuentra indice devuelve -1
        registroDeportes.deportes.splice(indiceBorrar,1) ; // Borramos solo el objeto encontrado en el indice
        fs.writeFileSync('data/Deportes.json',JSON.stringify(registroDeportes)); // Sobreescribimos
        console.log('Deporte eliminado!') ;
        res.redirect('/') ;

    } else {
        console.log('Deporte no encontrado!') ;
        res.redirect('/') ;
    }

})

export default router;