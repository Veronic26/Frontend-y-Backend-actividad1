import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormEstudiante } from './form-estudiante/form-estudiante';
import { FormCurso } from './form-curso/form-curso';
import { FormAsignatura } from './form-asignatura/form-asignatura';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormEstudiante, FormCurso, FormAsignatura, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  vista: 'estudiante' | 'curso' | 'matricula' = 'estudiante';
}
