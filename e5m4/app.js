const API_URL = 'https://jsonplaceholder.typicode.com/users';
const RESULTADO = document.querySelector('#resultado');
const TEMPLATE = document.querySelector('#usuario-template');
const MSG = { cargandoXHR: 'Cargando usuarios con XMLHttpRequest...', cargandoFetch: 'Cargando usuarios con Fetch API...', error: 'Error en la respuesta', errorXHR: 'Error en la solicitud XHR' };

const renderizarUsuarios = usuarios => {
  console.log('Usuarios cargados:', usuarios);
  RESULTADO.innerHTML = '<ul></ul>';
  const ul = RESULTADO.querySelector('ul');
  usuarios.forEach(({ name, email }) => {
    const clone = TEMPLATE.content.cloneNode(true);
    clone.querySelector('.name').textContent = name;
    clone.querySelector('.email').textContent = email;
    ul.appendChild(clone);
  });
};

document.querySelector('#cargar-xhr').addEventListener('click', () => {
  console.log(MSG.cargandoXHR);
  const xhr = new XMLHttpRequest();
  xhr.open('GET', API_URL, true);
  xhr.onload = function () { this.status === 200 && renderizarUsuarios(JSON.parse(this.responseText)); };
  xhr.onerror = () => console.error(MSG.errorXHR);
  xhr.send();
});

document.querySelector('#cargar-fetch').addEventListener('click', () => (
  console.log(MSG.cargandoFetch),
  fetch(API_URL)
    .then(response => response.ok ? response.json() : Promise.reject(MSG.error))
    .then(renderizarUsuarios)
    .catch(err => console.error('Error:', err))
));
