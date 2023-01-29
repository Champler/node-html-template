const express = require('express');
const path = require('path');
var fs = require('fs');
var pdf = require('dynamic-html-pdf');
var html = fs.readFileSync(path.join(__dirname, '/views/index.html'), 'utf8');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/', (req, res) => {
    const options = {
        format: "A4",
        orientation: "portrait",
    };
    
    let json = {
        original: "X",
        duplicado: "",
        tipo_documento: "Orden de servicio",
        nro_documento: "1",
        nrop3: "SCP023J",
        nombre: "Obra San Martin",
        partido: "CABA",
        sistema: "No especificado",
        fecha: "27/01/2023",
        contratista: "Baitcon S.A.",
        referencia: "Acta Reunión Pre-construcción",
        asunto: "Minuta por acta de preconstrucción",
        descripcion: "Se realizó la reunión donde se acordaron los documentos a presentar por ambas partes. La misma se llevó a cabo en las oficinas de AySA y participaron todos los invitados",
        requiere_respuesta: "Si",
        fecha_recepcion: "28/01/2023"
    }
    let document = {
        type: 'file',    
        template: html,
        context: json,
        path: "./output.pdf"    
    }
    
    pdf.create(document, options)
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            console.error(error)
        });
});

app.listen(3030, () => {
    console.log('Servidor iniciado en http://localhost:3030');
});