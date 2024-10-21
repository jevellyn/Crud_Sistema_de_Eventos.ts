import { EventosModel } from "../models/EventosModel";
import { prompt } from "../utils/prompt";

export class EventosController {
  async inserir_evento() {
    console.log("Digite os dados para criar o evento:\n");

    const descricao = prompt("Descrição: ");
    const tipo = prompt("Tipo: ");
    const data = prompt("Data evento(yyyy-MM-dd): ");
    const limite = +prompt("Limite de participantes: ");
    const duracao = prompt("Duração: ");

    const novoEvento = new EventosModel({
      dataEvento: data,
      descricao: descricao,
      duracaoEvento: duracao,
      limiteParticipantes: limite,
      tipoEvento: tipo,
    });

    await EventosModel.criar_db(novoEvento);
    await EventosModel.listar_db();
  }

  async atualizar_evento() {
    await EventosModel.listar_db();

    console.log("Digite os dados para atualizar o evento:\n");

    const IDEvento = +prompt("Id do evento: ");
    const descricao = prompt("Descrição: ");
    const tipo = prompt("Tipo: ");
    const data = prompt("Data evento(yyyy-MM-dd): ");
    const limite = +prompt("Limite de participantes: ");
    const duracao = prompt("Duração: ");

    const novoEvento = new EventosModel({
      IDEvento: IDEvento,
      dataEvento: data,
      descricao: descricao,
      duracaoEvento: duracao,
      limiteParticipantes: limite,
      tipoEvento: tipo,
    });

    await EventosModel.atualizar_db(novoEvento);
    await EventosModel.listar_db();
  }

  async remover_evento() {
    await EventosModel.listar_db();

    console.log("Digite o ID do evento para excluir:\n");

    const IDEvento = +prompt("ID: ");

    const compromissos = await EventosModel.listar_compromisso(IDEvento);

    if (compromissos.length > 0) {
      return console.log("Existe participantes para esse evento!!!");
    }

    await EventosModel.deletar_db(IDEvento);
    await EventosModel.listar_db();
  }
}
