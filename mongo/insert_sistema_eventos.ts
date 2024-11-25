import { Db } from "mongodb";

export async function insertEventos(db: Db) {
  await db.collection('eventos').insertMany([
    {
      tipoEvento: "Conferência",
      descricaoEvento: "Conferência sobre Inteligência Artificial",
      dataEvento: new Date("2024-11-10"),
      limiteParticipantes: 200,
      duracaoEvento: "4 hr"
    },
    {
      tipoEvento: "Workshop",
      descricaoEvento: "Workshop de Desenvolvimento Web",
      dataEvento: new Date("2024-11-15"),
      limiteParticipantes: 50,
      duracaoEvento: "6 hr"
    },
    {
      tipoEvento: "Seminário",
      descricaoEvento: "Seminário sobre Sustentabilidade",
      dataEvento: new Date("2024-11-20"),
      limiteParticipantes: 150,
      duracaoEvento: "3 hr 30 min"
    },
    {
      tipoEvento: "Festa Infantil",
      descricaoEvento: "Festa Infantil com Tema Super-Heróis",
      dataEvento: new Date("2024-12-05"),
      limiteParticipantes: 30,
      duracaoEvento: "3 hr"
    },
    {
      tipoEvento: "Show",
      descricaoEvento: "Show de Rock ao Vivo",
      dataEvento: new Date("2024-12-10"),
      limiteParticipantes: 500,
      duracaoEvento: "2 hr 30 min"
    },
    {
      tipoEvento: "Palestra",
      descricaoEvento: "Palestra sobre Gestão de Tempo",
      dataEvento: new Date("2025-01-10"),
      limiteParticipantes: 80,
      duracaoEvento: "1 hr 30 min"
    }
  ]);
}
