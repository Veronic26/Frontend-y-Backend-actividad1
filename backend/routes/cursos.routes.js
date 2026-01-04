const express = require("express");
const router = express.Router();
const Curso = require("../models/Curso");

// GET - listar cursos
router.get("/", async (req, res) => {
  try {
    const cursos = await Curso.find();
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// POST - crear curso
router.post("/", async (req, res) => {
  try {
    const curso = new Curso(req.body);
    const nuevo = await curso.save();
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// PUT - actualizar curso por ID
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Curso.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // devuelve el documento ya actualizado
    );

    if (!actualizado) {
      return res.status(404).json({ mensaje: "Curso no encontrado" });
    }

    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// eliminar curso por ID
router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await Curso.findByIdAndDelete(req.params.id);

    if (!eliminado) {
      return res.status(404).json({ mensaje: "Curso no encontrado" });
    }

    res.json({ mensaje: "Curso eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

module.exports = router;
