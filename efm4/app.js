const API_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const FORM = document.querySelector('#search-form');
const RESULTADOS = document.querySelector('#resultados');
const INPUT = document.querySelector('#ingrediente');
const TEMPLATE = document.querySelector('#receta-template');
const MSG_NO_RESULTS = '<div class="col-12"><p class="text-center text-muted">Lo sentimos, no se encontraron recetas. Intenta con otro ingrediente.</p></div>';

class Receta {
  constructor({ idMeal: id, strMeal: nombre, strMealThumb: imagen }) { Object.assign(this, { id, nombre, imagen }); }
  toHTML = () => {
    const clone = TEMPLATE.content.cloneNode(true);
    clone.querySelector('.imagen').src = this.imagen;
    clone.querySelector('.imagen').alt = this.nombre;
    clone.querySelector('.nombre').textContent = this.nombre;
    return clone;
  };
}

FORM.addEventListener('submit', async e => {
  e.preventDefault();
  const ingrediente = INPUT.value.trim();
  try {
    const { meals } = await (await fetch(API_URL + ingrediente)).json();
    RESULTADOS.innerHTML = '';
    meals ? meals.forEach(meal => RESULTADOS.appendChild(new Receta(meal).toHTML())) : RESULTADOS.innerHTML = MSG_NO_RESULTS;
  } catch (err) { console.error('Error:', err); }
});
