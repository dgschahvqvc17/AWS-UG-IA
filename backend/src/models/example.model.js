// Modelo: representa los datos y la lógica de persistencia.
// Por ahora se usa un arreglo en memoria; se puede reemplazar por una BD.
let examples = [
  { id: 1, nombre: 'Primer ejemplo', descripcion: 'Datos de ejemplo del backend MVC' },
];

let nextId = 2;

export const findAll = () => examples;

export const findById = (id) => examples.find((item) => item.id === Number(id));

export const create = ({ nombre, descripcion }) => {
  const item = { id: nextId++, nombre, descripcion };
  examples.push(item);
  return item;
};

export const remove = (id) => {
  const index = examples.findIndex((item) => item.id === Number(id));
  if (index === -1) return false;
  examples.splice(index, 1);
  return true;
};
