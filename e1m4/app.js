const TITULO_INVENTARIO = '--- Inventario de la Biblioteca ---';
const TEMPLATE = document.querySelector('#libro-template');
const MSG_LIBRO = (t, a, e) => `El libro "${t}" de ${a} se encuentra ${e}.`;
const setContent = (clone, selector, value) => (clone.querySelector(selector).textContent = value, clone);

class Libro {
	constructor(titulo, autor, estado) {
		Object.assign(this, {
			titulo,
			autor,
			estado: ['prestado', 'disponible'].includes(estado?.toLowerCase()) ? estado.toLowerCase() : 'disponible'
		});
	}
	mostrarInfo = () => console.log(MSG_LIBRO(this.titulo, this.autor, this.estado));
	toHTML = () => {
		const clone = TEMPLATE.content.cloneNode(true);
		setContent(clone, '.titulo', this.titulo);
		setContent(clone, '.autor', this.autor);
		setContent(clone, '.estado', this.estado);
		return clone;
	};
}

const inventario = [];
while (confirm('¿Desea agregar un libro?'))
	inventario.push(new Libro(
		prompt('Título:'),
		prompt('Autor:'),
		confirm('¿El libro está disponible?\nAceptar = Disponible | Cancelar = Prestado') ? 'disponible' : 'prestado'
	));
console.log(TITULO_INVENTARIO), inventario.forEach(l => l.mostrarInfo());

const out = document.querySelector('#inventario');
out.innerHTML = `<h2>${TITULO_INVENTARIO}</h2>`;
inventario.forEach(l => out.appendChild(l.toHTML()));
