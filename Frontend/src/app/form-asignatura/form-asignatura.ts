import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatriculaService } from '../services/matricula.service';
import { EstudianteService } from '../services/estudiante.service';
import { CursoService } from '../services/curso.service';

@Component({
  selector: 'app-form-asignatura',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './form-asignatura.html',
  styleUrl: './form-asignatura.scss',
})
export class FormAsignatura {
  form!: FormGroup;
  matriculas: any[] = [];
  estudiantes: any[] = [];
  cursos: any[] = [];
  editId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private matriculaService: MatriculaService,
    private estudianteService: EstudianteService,
    private cursoService: CursoService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      estudiante: new FormControl('', [Validators.required]), // Siempre requerido
      curso: new FormControl('', [Validators.required]), // Siempre requerido
    });

    this.listar();
    this.cargarEstudiantes();
    this.cargarCursos();
  }

  listar() {
    this.matriculaService.listar().subscribe((res) => {
      this.matriculas = res;
    });
  }

  guardar() {
    if (this.form.invalid) return;

    if (this.editId) {
      this.matriculaService.actualizar(this.editId, this.form.value).subscribe(() => {
        this.reset();
      });
    } else {
      this.matriculaService.guardar(this.form.value).subscribe(() => {
        this.reset();
      });
    }
  }

  editar(m: any) {
    this.form.patchValue({
      estudiante: m.estudiante?._id,
      curso: m.curso?._id,
    });
    this.editId = m._id;
  }

  eliminar(id: string) {
    this.matriculaService.eliminar(id).subscribe(() => {
      this.listar();
    });
  }

  cargarEstudiantes() {
    this.estudianteService.listar().subscribe((res) => {
      this.estudiantes = res;
    });
  }

  cargarCursos() {
    this.cursoService.listar().subscribe((res) => {
      this.cursos = res;
    });
  }

  reset() {
    this.form.reset();
    this.editId = null;
    this.listar();
  }
}
