import { Component, OnInit } from '@angular/core';
import { Livro } from '../livro';
import { Observable } from 'rxjs';
import { LivroService } from '../livro.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivroComponent implements OnInit {

  dataSaved = false;
  livroForm: any;
  allLivros: Observable<Livro[]>;
  livroIdUpdate = null;
  massage = null;
  constructor(private formbulider: FormBuilder, private livroService: LivroService) { }

  ngOnInit() {
    this.livroForm = this.formbulider.group({
      Titulo: ['', [Validators.required]],
      Autor: ['', [Validators.required]],
      AnoEdicao: ['', [Validators.required]],
    });
    this.loadAllLivros();
   }

   loadAllLivros() {
      this.allLivros = this.livroService.getAllLivro();
   }

   onFormSubmit() {
      this.dataSaved = false;
      const livro = this.livroForm.value;
      this.CreateLivro(livro);
      this.loadAllLivros();
      this.livroForm.reset();

   }

   loadLivroToEdit(livroId: string) {
      this.livroService.getLivroById(livroId).subscribe(livro => {
        this.massage = null;
        this.dataSaved = false;
        this.livroIdUpdate = livro.Id;
        this.livroForm.controls['Titulo'].setValue(livro.Titulo);
        this.livroForm.controls['Autor'].setValue(livro.Autor);
        this.livroForm.controls['AnoEdicao'].setValue(livro.AnoEdicao);
      });
    }

    CreateLivro(livro: Livro) {
      if (this.livroIdUpdate == null) {
        this.livroService.createLivro(livro).subscribe(
          () => {
            this.dataSaved = true;
            this.massage = 'Registro salvo com sucesso!';
            this.loadAllLivros();
            this.livroIdUpdate = null;
            this.livroForm.reset();
          }
        );
      } else {
        livro.Id = this.livroIdUpdate;
        this.livroService.updateLivro(this.livroIdUpdate, livro).subscribe(() => {
          this.dataSaved = true;
          this.massage = 'Registro Atualizado com sucesso!';
          this.loadAllLivros();
          this.livroIdUpdate = null;
          this.livroForm.reset();
        });
      }
    }

    deleteLivro(livroId: string) {
      if (confirm("Deseja realmente excluir este livro ?")) {
      this.livroService.deleteLivroById(livroId).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Operação realizada com sucesso!';
        this.loadAllLivros();
        this.livroIdUpdate = null;
        this.livroForm.reset();
      });
    }
  }

  resetForm() {
      this.livroForm.reset();
      this.massage = null;
      this.dataSaved = false;
    }
  }
