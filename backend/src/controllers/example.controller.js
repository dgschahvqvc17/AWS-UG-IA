// Controlador: recibe las peticiones y responde usando el modelo (DynamoDB).
import * as ExampleModel from '../models/example.model.js';

const fail = (res, error) =>
  res.status(500).json({ message: error.message || 'Error interno' });

export const list = async (_req, res) => {
  try {
    res.json(await ExampleModel.findAll());
  } catch (error) {
    fail(res, error);
  }
};

export const getById = async (req, res) => {
  try {
    const item = await ExampleModel.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'No encontrado' });
    res.json(item);
  } catch (error) {
    fail(res, error);
  }
};

export const create = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body || {};
    if (!nombre) return res.status(400).json({ message: 'El campo nombre es obligatorio' });
    res.status(201).json(await ExampleModel.create({ nombre, descripcion }));
  } catch (error) {
    fail(res, error);
  }
};

export const remove = async (req, res) => {
  try {
    await ExampleModel.remove(req.params.id);
    res.status(204).send();
  } catch (error) {
    fail(res, error);
  }
};
