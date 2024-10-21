import { EventosModel } from "../models/EventosModel";
import { ParticipantesModel } from "../models/ParticipantesModel";
import { prompt } from "../utils/prompt";

export class ParticipantesController {
  async inserir_participante() {
    await EventosModel.listar_db();

    console.log("Digite os dados para criar o participante:\n");

    const cpf = prompt("CPF: ");
    const nome = prompt("Nome: ");
    const celular = prompt("Celular: ");
    const IDEvento = +prompt("ID do evento: ");

    const novoParticipante = new ParticipantesModel({
      IDEvento,
      cpf,
      nome,
      celular,
    });

    await ParticipantesModel.criar_db(novoParticipante);
    await ParticipantesModel.listar_db();
  }

  async atualizar_participante() {
    await EventosModel.listar_db();
    await ParticipantesModel.listar_db();

    console.log("Digite os dados para atualizar o participante:\n");

    const cpf = prompt("CPF: ");
    const nome = prompt("Nome: ");
    const celular = prompt("Celular: ");
    const IDEvento = +prompt("ID do evento: ");

    const novoParticipante = new ParticipantesModel({
      IDEvento,
      cpf,
      nome,
      celular,
    });

    await ParticipantesModel.atualizar_db(novoParticipante);
    await ParticipantesModel.listar_db();
  }

  async remover_participante() {
    await ParticipantesModel.listar_db();
  }
}
