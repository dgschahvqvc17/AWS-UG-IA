// Controlador: recibe las peticiones y devuelve las respuestas usando el modelo.
import * as ExampleModel from '../models/example.model.js';

export const list = (_req, res) => {
  res.json(ExampleModel.findAll());
};

export const getById = (req, res) => {
  const item = ExampleModel.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'No encontrado' });
  res.json(item);
};

export const create = (req, res) => {
  const { nombre, descripcion } = req.body || {};
  if (!nombre) return res.status(400).json({ message: 'El campo nombre es obligatorio' });
  res.status(201).json(ExampleModel.create({ nombre, descripcion }));
};

export const remove = (req, res) => {
  if (!ExampleModel.remove(req.params.id)) {
    return res.status(404).json({ message: 'No encontrado' });
  }
  res.status(204).send();
};
