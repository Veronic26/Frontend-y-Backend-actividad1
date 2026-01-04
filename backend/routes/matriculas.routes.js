const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Matricula = require("../models/Matricula");

// Crear matrícula
router.post("/", async (req, res) => {
  try {
    const { estudiante, curso } = req.body;

    const matricula = new Matricula({
      estudiante: new mongoose.Types.ObjectId(estudiante),
      curso: new mongoose.Types.ObjectId(curso),
    });

    await matricula.save();
    res.json(matricula);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar matrículas
router.get("/", async (req, res) => {
  const matriculas = await Matricula.find()
    .populate("estudiante")
    .populate("curso");

  res.json(matriculas);
});

// Actualizar matrícula
router.put("/:id", async (req, res) => {
  try {
    const { estudiante, curso } = req.body;

    const actualizada = await Matricula.findByIdAndUpdate(
      req.params.id,
      {
        estudiante: new mongoose.Types.ObjectId(estudiante),
        curso: new mongoose.Types.ObjectId(curso),
      },
      { new: true }
    )
      .populate("estudiante")
      .populate("curso");

    if (!actualizada) {
      return res.status(404).json({ mensaje: "Matrícula no encontrada" });
    }

    res.json(actualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar matrícula
router.delete("/:id", async (req, res) => {
  await Matricula.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Matrícula eliminada" });
});

module.exports = router;
