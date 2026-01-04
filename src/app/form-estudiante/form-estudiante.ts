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
import { EstudianteService } from '../services/estudiante.service';

@Component({
  selector: 'app-form-estudiante',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './form-estudiante.html',
  styleUrl: './form-estudiante.scss',
})
export class FormEstudiante {
  form!: FormGroup;
  estudiantes: any[] = [];
  editId: string | null = null;

  constructor(private fb: FormBuilder, private estudianteService: EstudianteService) {}

  ngOnInit() {
    this.form = this.fb.group({
      cedula: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),// minimo 10 digitos, solo numeros
      nombre: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$'), // Solo letras y espacios
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$'), // Solo letras y espacios
      ]),
      correo: new FormControl('', [Validators.required, Validators.email]), // formato de correo valido
    });

    this.listar();
  }

  listar() {
    this.estudianteService.listar().subscribe((res) => {
      this.estudiantes = res;
    });
  }

  guardar() {
    if (this.form.invalid) return;

    if (this.editId) {
      this.estudianteService.actualizar(this.editId, this.form.value).subscribe(() => {
        this.reset();
      });
    } else {
      this.estudianteService.guardar(this.form.value).subscribe(() => {
        this.reset();
      });
    }
  }

  editar(estudiante: any) {
    this.form.patchValue(estudiante);
    this.editId = estudiante._id;
  }

  eliminar(id: string) {
    this.estudianteService.eliminar(id).subscribe(() => {
      this.listar();
    });
  }

  reset() {
    this.form.reset();
    this.editId = null;
    this.listar();
  }
}
