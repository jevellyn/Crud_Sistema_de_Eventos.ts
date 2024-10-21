import { EventosModel } from "../models/EventosModel";
import { ParticipantesModel } from "../models/ParticipantesModel";
import { prompt } from "../utils/prompt";

export class ParticipantesController {
  async inserir_participante() {
    try {
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
    } catch (error: any) {
      console.log("\n" + error.sqlMessage);
    }
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

    console.log("Digite o CPF para excluir o participante:\n");

    const cpf = prompt("CPF: ");

    const compromissos = await ParticipantesModel.listar_compromisso(cpf);

    if (compromissos.length > 0) {
      console.log("Esse participante está em um evento!!!");

      const escolha = +prompt("Desaja realmente exluir? [1- SIM | 2- NÃO]: ");

      if (escolha !== 1) return;
    }

    await ParticipantesModel.deletar_db(cpf);
    await ParticipantesModel.listar_db();
  }
}
