const http = require('http');

const cursos = require('./cursos');

const servidor = http.createServer((req, res) => {
    const {method} = req;

    switch(method){
        case 'GET':
            return manejarSolicitudGet(req, res);
        case 'POST':
            return manejarSolicitudPost(req, res);
        default:
            res.statusCode = 501;
            console.log(`El metodo no puede ser manejado por el servidor: ${method}.`);
    }
});

function manejarSolicitudGet(req, res){
    const path = req.url;

    if (path === '/'){
        res.statusCode = 200;
        return res.end('Bienvenidos a mi servidor y API creados con Node.js');
    }
    else if (path === '/cursos'){
        res.statusCode = 200;
        return res.end(JSON.stringify(cursos.infoCursos));
    }
    else if (path === '/cursos/programacion'){
        res.statusCode = 200;
        return res.end(JSON.stringify(cursos.infoCursos.programacion));
    }

res.statusCode = 404;
res.end('El recruso solicitado no existe.');
}

function manejarSolicitudPost(req, res){
    const path = req.url;
    if (path === '/cursos/programacion'){
        let cuerpo = '';
        req.on('data', contenido => {
            cuerpo += contenido.toString();
        });

        req.on('end', () => {
            console.log(cuerpo);
            console.log(typeof cuerpo);

           

            res.end('El servidor recibio una solicitud POST para /cursos/programacion');
        });
        res.statusCode= 200;
        //return res.end('El servidor recibio una solicitud POST para /cursos/programacion');
    }
}

const PUERTO = 3000;

servidor.listen(PUERTO, () => {
    console.log(`El servidor esta escuchando en el puerto http://localhost:${PUERTO}.`);
});