const { io } = require('../app');
const { Usuarios } = require('../classes/Usuarios');
const { crearMensaje } = require('../utils/utilidades');


const usuarios = new Usuarios();

io.on('connection', client => {

    client.on('entrarChat', (data, cb) => {
        if (!data.nombre && !data.sala) {
            return cb({
                ok: false,
                mensaje: "El nombre/sala son necesarios"
            });
        }

        client.join(data.sala);

        usuarios.agregarPersona(client.id, data.nombre, data.sala);
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Servidor',`${data.nombre} se unio`));
        cb(usuarios.getPersonasPorSala(data.sala))
    });
    
    //http://localhost:3000/chat.html?nombre=robin&sala=v

    client.on('crearMensaje', (data, cb)=>{
            
            let persona = usuarios.getPersona(client.id);
            //utlizar crearMensaje
            let mensaje = crearMensaje(persona.nombre, data.mensaje);
            client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
            cb(mensaje);
    });

    client.on('disconnect', () => {
        //Persona Borrada
        let personaBorrada = usuarios.borrarPersona(client.id);
        
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Servidor', `${personaBorrada.nombre} salio`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));
    });


    client.on('privado', data => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('privado', crearMensaje(persona.nombre,data.mensaje));
    });

});

