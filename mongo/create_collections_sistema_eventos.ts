import { Db } from "mongodb";

export async function createCollections(db:Db) {
  await db.dropCollection('eventos');
  await db.dropCollection('participantes');
  await db.dropCollection('participante_evento');
  await db.createCollection("eventos", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["tipoEvento", "descricaoEvento", "dataEvento", "limiteParticipantes", "duracaoEvento"],
        properties: {
          tipoEvento: { bsonType: "string", description: "Tipo de evento" },
          descricaoEvento: { bsonType: "string", description: "Descrição do evento" },
          dataEvento: { bsonType: "date", description: "Data do evento" },
          limiteParticipantes: { bsonType: "number", description: "Número máximo de participantes" },
          duracaoEvento: { bsonType: "string", description: "Duração do evento" },
        }
      }
    }
  });
  
  await db.createCollection("participantes", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["cpf", "nome", "celular"],
        properties: {
          cpf: { bsonType: "string", description: "CPF do participante" },
          nome: { bsonType: "string", description: "Nome do participante" },
          celular: { bsonType: "string", description: "Número de celular" },
        }
      }
    }
  });
  await db.createCollection("participante_evento", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["eventoId", "cpf"],
        properties: {
          eventoId: {
            bsonType: "objectId",
            description: "ID do evento (referência à coleção eventos)",
          },
          cpf: {
            bsonType: "string",
            description: "ID do participante (referência à coleção participantes)",
          },
        },
      },
    },
  });
}
