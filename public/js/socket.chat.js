let socket = io();

let params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre es Necesario');
}
let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', () => {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function (personas) {
        //console.log(personas);
        renderizarUsuarios(personas);
        //Html
    });
});

socket.on('disconnect', function(){
    console.log('Perdimos la conexion');
});

socket.on('crearMensaje',function(mensaje){
    renderizarMensaje(mensaje, false);
    scrollBottom();
    //Html
});

//Escuchar Cambios de Usuarios
socket.on('listaPersona',function(personas){
    renderizarUsuarios(personas);
    //Html
});

//Mensajes Privados 
socket.on('privado', function(mensaje){
    console.log('Mensaje Privado', mensaje);
});





