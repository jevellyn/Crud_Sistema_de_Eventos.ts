import { EventosController } from "../controllers/EventosController";
import { ParticipantesController } from "../controllers/ParticipantesController";
import { eventosPorMes } from "../reports/eventosPorMes";
import { participantesPorEvento } from "../reports/participantesPorEvento";
import { prompt } from "./prompt";
import { splashScreen } from "./splashScreen";

export class Menu {
  private readonly eventosController = new EventosController();
  private readonly participantesController = new ParticipantesController();

  async menu_principal() {
    await splashScreen();

    console.log(`
Menu Principal
  1 - Relatórios
  2 - Inserir Registros
  3 - Atualizar Registros
  4 - Remover Registros
  5 - Sair`);
  }

  async menu_secundario(tipo: number) {
    switch (tipo) {
      case 1:
        await this.menu_relatorios();
        break;
      case 2:
        await this.menu_entidades("criar");
        break;
      case 3:
        await this.menu_entidades("atualizar");
        break;
      case 4:
        await this.menu_entidades("deletar");
        break;
      case 5:
        break;
    }
  }

  async menu_relatorios() {
    console.log(`
Relatorio
  1 - Eventos p/ mês
  2 - Participantes p/ evento
  3 - Voltar`);

    const escolha = +prompt("\n-> ");

    switch (escolha) {
      case 1:
        await eventosPorMes();
        prompt("\nPressione ENTER para continuar: ");
        console.clear();
        break;
      case 2:
        await participantesPorEvento();
        prompt("\nPressione ENTER para continuar: ");
        console.clear();
        break;
      case 3:
        break;
    }
  }

  async menu_entidades(acao: "criar" | "atualizar" | "deletar") {
    console.log(`
Entidades
  1 - Participante
  2 - Evento
  3 - Voltar`);

    const escolha = +prompt("\n-> ");

    switch (escolha) {
      case 1:
        if (acao === "criar") {
          await this.participantesController.inserir_participante();
        } else if (acao === "atualizar") {
          await this.participantesController.atualizar_participante();
        } else {
          await this.participantesController.remover_participante();
        }
        prompt("\nPressione ENTER para continuar: ");
        console.clear();
        break;
      case 2:
        if (acao === "criar") {
          await this.eventosController.inserir_evento();
        } else if (acao === "atualizar") {
          await this.eventosController.atualizar_evento();
        } else {
          await this.eventosController.remover_evento();
        }
        prompt("\nPressione ENTER para continuar: ");
        console.clear();
        break;
      case 3:
        break;
    }
  }
}
