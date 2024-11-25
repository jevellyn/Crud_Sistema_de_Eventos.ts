import { ObjectId } from "mongodb";
import { db } from "../conexion/connection";

interface IEventosModel {
    IDEvento?: string;
    tipoEvento: string;
    descricao: string;
    dataEvento: Date;
    limiteParticipantes: number;
    duracaoEvento: string;
}

export class EventosModel implements IEventosModel {
    IDEvento?: string
    tipoEvento: string;
    descricao: string;
    dataEvento: Date;
    limiteParticipantes: number;
    duracaoEvento: string;

    constructor(evento: IEventosModel) {
        this.IDEvento = evento.IDEvento;
        this.tipoEvento = evento.tipoEvento;
        this.descricao = evento.descricao;
        this.dataEvento = evento.dataEvento;
        this.limiteParticipantes = evento.limiteParticipantes;
        this.duracaoEvento = evento.duracaoEvento;
      }

    static async listar_db() {
        try {
          const collection = db.collection('eventos');
          const eventos = await collection.find({}).toArray();
          console.table(eventos);
        } catch (error) {
          console.error('Erro ao listar eventos:', error);
        }
    }

    static async listar_compromisso(IDEvento: string) {
        try {
          const collection = db.collection('participante_evento');
    
          const participantes = await collection.find({IDEvento}).toArray();
    
          return participantes;
        } catch (error) {
          console.error('Erro ao listar participantes:', error);
          throw error;
        }
      }

      static async criar_db(evento: EventosModel) {
        try {
          const collection = db.collection('eventos');
          const resultado = await collection.insertOne({
            tipoEvento: evento.tipoEvento,
            descricaoEvento: evento.descricao,
            dataEvento: evento.dataEvento,
            limiteParticipantes: evento.limiteParticipantes,
            duracaoEvento: evento.duracaoEvento
          });
          console.log('Evento criado com sucesso:', resultado.insertedId);
          return resultado.insertedId;
        } catch (error) {
          console.error('Erro ao criar evento:', error);
          throw error;
        }
      }

      static async count() {
        try {
          const collection = db.collection('eventos');
          const qtdEventos = await collection.countDocuments();
    
          return qtdEventos;
        } catch (error) {
          console.error('Erro ao contar eventos:', error);
          throw error;
        }
      }

      static async atualizar_db(evento: EventosModel) {
        try {
          const collection = db.collection('eventos');
    
          const resultado = await collection.updateOne(
            {_id: new ObjectId(evento.IDEvento) }, 
            { $set: {
                tipoEvento: evento.tipoEvento,
                descricaoEvento: evento.descricao,
                dataEvento: evento.dataEvento,
                limiteParticipantes: evento.limiteParticipantes,
                duracaoEvento: evento.duracaoEvento
              }
            }
          );
    
          console.log('Documentos modificados:', resultado.modifiedCount);
        } catch (error) {
          console.error('Erro ao atualizar evento:', error);
          throw error;
        }
      }

      static async deletar_db(IDEvento: string) {
        try {
          const collection = db.collection('eventos');
          const resultado = await collection.deleteOne({ _id: new ObjectId(IDEvento)});

          console.log('Documentos excluídos:', resultado.deletedCount);
        } catch (error) {
          console.error('Erro ao deletar evento:', error);
          throw error;
        }
      }
}