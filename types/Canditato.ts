import { Fotos } from "./Fotos";

export type Candidato = {
  numero: number;
  nome: string;
  partido?: string;
  vice?: string;
  fotos: Fotos[];
};
