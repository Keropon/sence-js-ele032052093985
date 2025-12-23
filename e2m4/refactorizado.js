const USUARIO = { nombre: 'Ana', edad: 24, ciudad: 'Barcelona' };
const OUTPUT = document.querySelector('#refactorizado');
const crearMensajePresentacion = ({ nombre, edad, ciudad }) => `Hola, mi nombre es ${nombre}, tengo ${edad} años y vivo en la ciudad de ${ciudad}.`;
const mensaje = crearMensajePresentacion(USUARIO);
console.log(mensaje);
OUTPUT.textContent = mensaje;
