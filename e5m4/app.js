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

let GIPHY_API_KEY = localStorage.getItem('giphyApiKey') || '';
const GIPHY_URL = 'https://api.giphy.com/v1/gifs/search';
const GIPHY_RESULTADO = document.querySelector('#giphy-resultado');
const GIPHY_INPUT = document.querySelector('#giphy-search');
const GIPHY_APIKEY_INPUT = document.querySelector('#giphy-apikey');

document.querySelector('#save-apikey-btn').addEventListener('click', () => {
  GIPHY_API_KEY = GIPHY_APIKEY_INPUT.value.trim();
  GIPHY_API_KEY ? (localStorage.setItem('giphyApiKey', GIPHY_API_KEY), alert('✅ API Key guardada correctamente')) : alert('❌ Por favor ingresa una API Key válida');
});

GIPHY_APIKEY_INPUT.value = GIPHY_API_KEY;

document.querySelector('#giphy-btn').addEventListener('click', async () => {
  const query = GIPHY_INPUT.value.trim();
  if (!GIPHY_API_KEY) return GIPHY_RESULTADO.innerHTML = '<p class="text-warning">⚠️ Por favor configura tu API Key primero</p>';
  if (!query) return GIPHY_RESULTADO.innerHTML = '<p class="text-danger">Por favor ingresa un término de búsqueda</p>';
  try {
    const { data } = await (await fetch(`${GIPHY_URL}?api_key=${GIPHY_API_KEY}&q=${query}&limit=1`)).json();
    GIPHY_RESULTADO.innerHTML = data[0] ? `<img src="${data[0].images.original.url}" alt="${query}" class="img-fluid rounded shadow">` : '<p class="text-muted">No se encontraron GIFs</p>';
  } catch (err) { console.error('Error:', err); GIPHY_RESULTADO.innerHTML = '<p class="text-danger">Error al buscar GIF. Verifica tu API Key.</p>'; }
});
