import { executar_sql } from "../conexion/connection";

interface IEventosModel {
  IDEvento?: number;
  tipoEvento: string;
  descricao: string;
  dataEvento: string;
  limiteParticipantes: number;
  duracaoEvento: string;
}

export class EventosModel implements IEventosModel {
  IDEvento?: number;
  tipoEvento: string;
  descricao: string;
  dataEvento: string;
  limiteParticipantes: number;
  duracaoEvento: string;

  constructor(eventoModel: IEventosModel) {
    Object.assign(this, eventoModel);
  }

  static async listar_db() {
    const SQL = "SELECT * FROM EVENTOS";
    const eventos = await executar_sql(SQL);
    console.table(eventos);
  }

  static async listar_compromisso(IDEvento: number) {
    const SQL = `SELECT * FROM participante_evento WHERE EVENTO_ID = ${IDEvento}`;
    const eventos = await executar_sql(SQL);
    return eventos;
  }

  static async count() {
    const SQL = "SELECT COUNT(*) as qtdEventos FROM EVENTOS";
    const eventos = await executar_sql(SQL);
    return eventos[0].qtdEventos;
  }

  static async criar_db(evento: EventosModel) {
    const SQL = `INSERT INTO 
                  EVENTOS(TIPO_EVENTO, DESCRICAO_EVENTO, DATA_EVENTO, LIMITE_PARTICIPANTES, DURACAO_EVENTO) 
                  VALUES("${evento.tipoEvento}",
                        "${evento.descricao}",
                        "${evento.dataEvento}",
                        ${evento.limiteParticipantes},
                        "${evento.duracaoEvento}")`;

    await executar_sql(SQL);
  }

  static async atualizar_db(evento: EventosModel) {
    const SQL = `UPDATE EVENTOS 
                  SET TIPO_EVENTO = "${evento.tipoEvento}", 
                      DESCRICAO_EVENTO = "${evento.descricao}", 
                      DATA_EVENTO = "${evento.dataEvento}", 
                      LIMITE_PARTICIPANTES = ${evento.limiteParticipantes}, 
                      DURACAO_EVENTO = "${evento.duracaoEvento}"
                  WHERE EVENTO_ID = ${evento.IDEvento}`;

    await executar_sql(SQL);
  }

  static async deletar_db(IDEvento: number) {
    const SQL = `DELETE FROM EVENTOS WHERE EVENTO_ID = ${IDEvento}`;

    await executar_sql(SQL);
  }
}
