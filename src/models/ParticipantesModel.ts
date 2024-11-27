import { ObjectId } from "mongodb";
import { db } from "../conexion/connection";

interface IParticipantesModel {
    cpf: string;
    nome: string;
    celular: string;
    IDEvento: string;
  }
  
  export class ParticipantesModel implements IParticipantesModel {
    IDEvento: string;
    cpf: string;
    nome: string;
    celular: string;
  
    constructor(participante: IParticipantesModel) {
        this.IDEvento = participante.IDEvento;
        this.cpf = participante.cpf;
        this.nome = participante.nome;
        this.celular = participante.celular;
      }

    static async listar_db() {
        try {
          const collection = db.collection('participantes');
          const participante = await collection.find().toArray();
          console.table(participante);
        } catch (error) {
          console.error('Erro ao listar participantes:', error);
        }
    }

    static async listar_compromisso(cpf: string) {
        try {
          const collection = db.collection('participante_evento');
    
          const compromissos = await collection.find({ cpf: cpf }).toArray();
    
          return compromissos;
        } catch (error) {
          console.error('Erro ao listar compromissos:', error);
          throw error;
        }
      }

      static async count() {
        try {
          const collection = db.collection('participantes');
          const qtdParticipantes = await collection.countDocuments();
    
          return qtdParticipantes;
        } catch (error) {
          console.error('Erro ao contar participantes:', error);
          throw error;
        }
      }

      static async criar_db(participante: ParticipantesModel) {
        try {
          const collection = db.collection('participantes');
          const eventoCollection = db.collection('participante_evento');
          const eventos = db.collection('eventos');

          const numeroDeParticipantes = await eventoCollection.countDocuments({ eventoId: participante.IDEvento });
    

          const evento = await db.collection('eventos').findOne({_id: new ObjectId(participante.IDEvento)});
          
          const limiteParticipantes = evento?.limiteParticipantes || 0;

          if (numeroDeParticipantes >= limiteParticipantes) {
            console.log('O evento já atingiu o limite de participantes.');
            return
          }

          const resultado = await collection.insertOne({
            cpf: participante.cpf,
            nome: participante.nome,
            celular: participante.celular
          });

          const insertcollection = db.collection('participante_evento');
          console.log(participante)
     
          const resultadoCompromisso = await insertcollection.insertOne({
            eventoId: new ObjectId (participante.IDEvento),
            cpf: participante.cpf
          });
    
          console.log('/nParticipante criado com sucesso:', resultado.insertedId);
          return resultado.insertedId;
        } catch (error) {
          const a = error as any
          console.log(error)
          console.error('Erro ao criar participante');
          throw error;
        }
      }
      
      static async atualizar_db(participante: ParticipantesModel) {
        try {
          const participantesCollection = db.collection('participantes');
          const compromissosCollection = db.collection('participante_evento');
    
          await participantesCollection.updateOne(
            { cpf: participante.cpf }, 
            {
              $set: {
                nome: participante.nome,
                celular: participante.celular
              }
            }
          );
    
          await compromissosCollection.updateOne(
            { cpf: participante.cpf }, 
            {
              $set: { eventoId: participante.IDEvento }
            }
          );
    
          console.log('Participante e compromisso atualizados com sucesso!');
        } catch (error) {
          console.error('Erro ao atualizar participante e compromisso:', error);
          throw error;
        }
      }

      static async deletar_db(cpf: string) {
        try {
          const participantesCollection = db.collection('participantes');
          const compromissosCollection = db.collection('participante_evento');
    
          await compromissosCollection.deleteMany({ cpf: cpf });
    
          await participantesCollection.deleteOne({ cpf: cpf });
    
          console.log('Participante e compromissos deletados com sucesso!');
        } catch (error) {
          console.error('Erro ao deletar participante e compromissos:', error);
          throw error;
        }
      }
}
  