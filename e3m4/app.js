const IMG_PRINCIPAL = document.querySelector('#imagen-principal');
const CONTAINER = document.querySelector('#imagen-principal-container');
const TEMPLATE = document.querySelector('#pie-template');
const SELECTOR_PIE = '#pie-de-foto';

document.querySelectorAll('.thumbnail').forEach(thumb => thumb.addEventListener('click', ({ target: { src, alt } }) => {
  console.log(`Imagen seleccionada: ${alt}`);
  IMG_PRINCIPAL.src = src;
  CONTAINER.querySelector(SELECTOR_PIE)?.remove();
  const clone = TEMPLATE.content.cloneNode(true);
  clone.querySelector(SELECTOR_PIE).textContent = alt;
  CONTAINER.appendChild(clone);
}));
