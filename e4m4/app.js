const USUARIO_MOCK = { id: 1, nombre: 'John Doe', email: 'john.doe@example.com' };
const POSTS_MOCK = [{ id: 101, titulo: 'Mi primer post', contenido: '...' }, { id: 102, titulo: 'Mi segundo post', contenido: '...' }];
const COMENTARIOS_MOCK = [{ id: 1, texto: '¡Excelente post!' }, { id: 2, texto: 'Muy informativo, gracias.' }];
const DELAY = () => Math.random() * 1000 + 500;
const ERR = { usuario: 'Error: ID de usuario no proporcionado.', posts: 'Error: ID de usuario no proporcionado para buscar posts.', comentarios: 'Error: ID de post no proporcionado para buscar comentarios.' };
const MSG = { callbacks: '=== PARTE 1: CALLBACKS ===', promesas: '=== PARTE 2: PROMESAS ===', async: '=== PARTE 3: ASYNC/AWAIT ===' };
const log = (msg, el) => (console.log(msg), el && (el.textContent += msg + '\n'));

const obtenerUsuario = (id, cb) => setTimeout(() => !id ? cb(ERR.usuario, null) : (log(`Buscando usuario con ID: ${id}...`), cb(null, USUARIO_MOCK)), DELAY());
const obtenerPosts = (userId, cb) => setTimeout(() => !userId ? cb(ERR.posts, null) : (log(`Buscando posts del usuario con ID: ${userId}...`), cb(null, POSTS_MOCK)), DELAY());
const obtenerComentarios = (postId, cb) => setTimeout(() => !postId ? cb(ERR.comentarios, null) : (log(`Buscando comentarios del post con ID: ${postId}...`), cb(null, COMENTARIOS_MOCK)), DELAY());

const outCb = document.querySelector('#callbacks');
log(MSG.callbacks, outCb);
obtenerUsuario(1, (err, usuario) => err ? log(err, outCb) : obtenerPosts(usuario.id, (err, posts) => err ? log(err, outCb) : obtenerComentarios(posts[0].id, (err, comentarios) => err ? log(err, outCb) : log('Comentarios: ' + JSON.stringify(comentarios, null, 2), outCb))));

const obtenerUsuarioPromesa = id => new Promise((resolve, reject) => !id ? reject(ERR.usuario) : setTimeout(() => (log(`Buscando usuario con ID: ${id}...`), resolve(USUARIO_MOCK)), DELAY()));
const obtenerPostsPromesa = userId => new Promise((resolve, reject) => !userId ? reject(ERR.posts) : setTimeout(() => (log(`Buscando posts del usuario con ID: ${userId}...`), resolve(POSTS_MOCK)), DELAY()));
const obtenerComentariosPromesa = postId => new Promise((resolve, reject) => !postId ? reject(ERR.comentarios) : setTimeout(() => (log(`Buscando comentarios del post con ID: ${postId}...`), resolve(COMENTARIOS_MOCK)), DELAY()));

const outProm = document.querySelector('#promesas');
log(MSG.promesas, outProm);
obtenerUsuarioPromesa(1).then(usuario => obtenerPostsPromesa(usuario.id)).then(posts => obtenerComentariosPromesa(posts[0].id)).then(comentarios => log('Comentarios: ' + JSON.stringify(comentarios, null, 2), outProm)).catch(err => log(err, outProm));

const outAsync = document.querySelector('#async');
log(MSG.async, outAsync);
(async () => { try { const usuario = await obtenerUsuarioPromesa(1), posts = await obtenerPostsPromesa(usuario.id), comentarios = await obtenerComentariosPromesa(posts[0].id); log('Comentarios: ' + JSON.stringify(comentarios, null, 2), outAsync); } catch (err) { log(err, outAsync); } })();
