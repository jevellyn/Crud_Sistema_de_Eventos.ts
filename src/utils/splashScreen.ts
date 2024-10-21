import { EventosModel } from "../models/EventosModel";
import { ParticipantesModel } from "../models/ParticipantesModel";

export async function splashScreen() {
  const eventoQtd = await EventosModel.count();
  const participanteQtd = await ParticipantesModel.count();

  console.log(`
----------------------------------------------------------------------
*                SISTEMA DE EVENTOS
*
* TOTAL DE REGISTROS:
* 
*   1 - EVENTOS: ${eventoQtd}
*   2 - PARTICIPANTES: ${participanteQtd}
*
* CRIADO POR:
*   Julia Evellyn
*   Ana Clara Alves
*   Ezequiel Soeiro Gomes
*   Ian Rodrigues
*   Kauã Fonseca
* 
* 
* PROFESSOR: Prof. M.Sc. Howard Roatti
*
* DISCIPLINA: BANCO DE DADOS - 2024/2
*
----------------------------------------------------------------------`);
}