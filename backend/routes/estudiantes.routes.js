const express = require("express");
const router = express.Router();
const Estudiante = require("../models/Estudiante");

// GET - listar estudiantes
router.get("/", async (req, res) => {
  try {
    const estudiantes = await Estudiante.find();
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// POST - crear estudiante
router.post("/", async (req, res) => {
  try {
    const estudiante = new Estudiante(req.body);
    const nuevo = await estudiante.save();
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// } actualizar estudiante
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Estudiante.findByIdAndUpdate(
      req.params.id, //
      req.body,
      { new: true }
    );

    if (!actualizado) {
      return res.status(404).json({ mensaje: "Estudiante no encontrado" });
    }

    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// DELETE - eliminar estudiante por ID
router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await Estudiante.findByIdAndDelete(req.params.id);

    if (!eliminado) {
      return res.status(404).json({ mensaje: "Estudiante no encontrado" });
    }

    res.json({ mensaje: "Estudiante eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

module.exports = router;
