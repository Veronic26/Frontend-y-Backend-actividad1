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
import { CursoService } from '../services/curso.service';

@Component({
  selector: 'app-form-curso',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './form-curso.html',
  styleUrl: './form-curso.scss',
})
export class FormCurso {
  form!: FormGroup;
  cursos: any[] = [];
  editId: string | null = null;

  constructor(private fb: FormBuilder, private cursoService: CursoService) {}

  ngOnInit() {
    this.form = this.fb.group({
      codigo: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Z]{3}-[0-9]{3}$'), // Formato especificoEj: CAL-001
        Validators.maxLength(7),
      ]),
      nombre: new FormControl('', [Validators.required]),
      creditos: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.min(3),
        Validators.max(10), //Solo numeros enteros positivos entre 3 y 10
      ]),
    });

    this.listar();
  }

  listar() {
    this.cursoService.listar().subscribe((res) => {
      this.cursos = res;
    });
  }

  guardar() {
    if (this.form.invalid) return;

    if (this.editId) {
      this.cursoService.actualizar(this.editId, this.form.value).subscribe(() => {
        this.reset();
      });
    } else {
      this.cursoService.guardar(this.form.value).subscribe(() => {
        this.reset();
      });
    }
  }

  editar(curso: any) {
    this.form.patchValue(curso);
    this.editId = curso._id;
  }

  eliminar(id: string) {
    this.cursoService.eliminar(id).subscribe(() => {
      this.listar();
    });
  }

  reset() {
    this.form.reset();
    this.editId = null;
    this.listar();
  }
}
