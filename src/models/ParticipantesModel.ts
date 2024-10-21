import { executar_sql } from "../conexion/connection";

interface IParticipantesModel {
  cpf: string;
  nome: string;
  celular: string;
  IDEvento: number;
}

export class ParticipantesModel implements IParticipantesModel {
  IDEvento: number;
  cpf: string;
  nome: string;
  celular: string;

  constructor(participante: IParticipantesModel) {
    Object.assign(this, participante);
  }

  static async listar_db() {
    const SQL = "SELECT * FROM PARTICIPANTES";
    const eventos = await executar_sql(SQL);
    console.table(eventos);
  }

  static async listar_compromisso(cpf: string) {
    const SQL = `SELECT * FROM participante_evento WHERE PARTICIPANTE_CPF = "${cpf}"`;
    const eventos = await executar_sql(SQL);
    return eventos;
  }

  static async count() {
    const SQL = "SELECT COUNT(*) as qtdParticipantes FROM PARTICIPANTES";
    const eventos = await executar_sql(SQL);
    return eventos[0].qtdParticipantes;
  }

  static async criar_db(participante: ParticipantesModel) {
    const insertParticipanteSQL = `INSERT INTO PARTICIPANTES (PARTICIPANTE_CPF, NOME_PARTICIPANTE, CELULAR_PARTICIPANTE) 
                                  VALUES("${participante.cpf}", "${participante.nome}", "${participante.celular}")`;

    const insertCompromissoSQL = `INSERT INTO PARTICIPANTE_EVENTO (EVENTO_ID, PARTICIPANTE_CPF) 
                                  VALUES(${participante.IDEvento}, "${participante.cpf}")`;

    await executar_sql(insertParticipanteSQL);
    await executar_sql(insertCompromissoSQL);
  }

  static async atualizar_db(participante: ParticipantesModel) {
    const updateParticipanteSQL = `UPDATE PARTICIPANTES SET
                                    NOME_PARTICIPANTE = "${participante.nome}", 
                                    CELULAR_PARTICIPANTE = "${participante.celular}"
                                  WHERE PARTICIPANTE_CPF = ${participante.cpf}`;

    const updateCompromissoSQL = `UPDATE PARTICIPANTE_EVENTO SET EVENTO_ID = ${participante.IDEvento}
                                  WHERE PARTICIPANTE_CPF = "${participante.cpf}"`;

    await executar_sql(updateParticipanteSQL);
    await executar_sql(updateCompromissoSQL);
  }

  static async deletar_db(cpf: string) {
    const deleteCompromissoSQL = `DELETE FROM PARTICIPANTE_EVENTO WHERE PARTICIPANTE_CPF = "${cpf}"`;
    const deleteParticipanteSQL = `DELETE FROM PARTICIPANTES WHERE PARTICIPANTE_CPF = "${cpf}"`;

    await executar_sql(deleteCompromissoSQL);
    await executar_sql(deleteParticipanteSQL);
  }
}
