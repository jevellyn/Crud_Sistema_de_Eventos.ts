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
  //tentei aqui
  static async count() {
    const sql = "SELECT COUNT(*) AS participanteQtd FROM PARTICIPANTES";
    const result = await executar_sql(sql);
    return result;
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

  static async deletar_db() {}
}
