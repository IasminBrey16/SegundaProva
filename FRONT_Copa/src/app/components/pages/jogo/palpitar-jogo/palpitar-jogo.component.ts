import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Jogo } from "src/app/models/jogo.model";

@Component({
  selector: "app-palpitar-jogo",
  templateUrl: "./palpitar-jogo.component.html",
  styleUrls: ["./palpitar-jogo.component.css"],
})
export class PalpitarJogoComponent implements OnInit {
  jogoId!: number;
  selecaoAId!: number;
  selecaoBId!: number;
  pontuacaoSelecaoA!: number;
  pontuacaoSelecaoB!: number;
  erro!: string;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let { id } = params;
      if (id !== undefined) {
        this.http.get<Jogo>(`https://localhost:5001/api/jogo/buscar/${id}`).subscribe({
          next: (jogo) => {
            this.jogoId = jogo.id!,
            this.selecaoAId = jogo.selecaoAId,
            this.selecaoBId = jogo.selecaoBId,
            this.pontuacaoSelecaoA = jogo.pontuacaoSelecaoA,
            this.pontuacaoSelecaoB = jogo.pontuacaoSelecaoB;
          }
        });
      }
    });
  }

  palpitar(): void {
    let jogo: Jogo = {
      id: this.jogoId,
      selecaoAId: this.selecaoAId,
      selecaoBId: this.selecaoBId,
      pontuacaoSelecaoA: this.pontuacaoSelecaoA,
      pontuacaoSelecaoB: this.pontuacaoSelecaoB
    };
    this.http
      .patch<Jogo>("https://localhost:5001/api/jogo/alterar", jogo)
      .subscribe({
        next: (jogo) => {
          this._snackBar.open("Palpite salvo!", "Ok!", {
            horizontalPosition: "right",
            verticalPosition: "top",
          });
          this.router.navigate(["pages/jogo/listar"]);
        },
        error: (error) => {
          if (error.status == 400) {
            this.erro = "Erro de validação";
          } else if (error.status == 0) {
            this.erro = "Está faltando iniciar a sua API!";
          }
        },
      });
    }
  }
