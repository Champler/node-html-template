const express = require('express');
const path = require('path');
var fs = require('fs');
var pdf = require('dynamic-html-pdf');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const html = fs.readFileSync('index.html', 'utf-8');

app.post('/', async (req, res) => {
    const options = {
        format: "A4",
        orientation: "portrait",
    };
    
    let data = await req.body
    let document = {
        type: 'file',    
        template: html,
        context: {data},
        path: "./ndp-ods" + Date.now() + ".pdf"    
    }
    
    pdf.create(document, options)
        .then(data => {
            console.log(data)
            res.status(200).send("Se creo un pdf de acuerdo a lo solicitado")
        })
        .catch(error => {
            res.send(error)
        });
});



app.listen(3030, () => {
    console.log('Servidor iniciado en http://localhost:3030');
});