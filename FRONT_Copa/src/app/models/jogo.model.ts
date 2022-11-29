import { Selecao } from "./selecao.model";

export interface Jogo {
  id?: number;
  selecaoA?: Selecao;
  selecaoAId: number;
  selecaoB?: Selecao;
  selecaoBId: number;
  pontuacaoSelecaoA: number;
  pontuacaoSelecaoB: number;
  criadoEm?: string;
}
