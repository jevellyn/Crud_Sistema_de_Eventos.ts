import { readFileSync } from "fs"; 
import { MongoClient, Db } from "mongodb";
import { createCollections } from "../../mongo/create_collections_sistema_eventos";
import { insertEventos } from "../../mongo/insert_sistema_eventos";

const uri = "mongodb://localhost:27017/"; // Substitua pelo seu URI de conexão
const dbName = "SYS_EVENTO"; // Nome do banco de dados

export let db: Db;

export const connectToDatabase = async (): Promise<Db> => {
  if (!db) {
    try {
      const client = new MongoClient(uri);
      await client.connect();
      console.log("Conectado ao MongoDB!");
      db = client.db(dbName); // Seleciona o banco de dados
    } catch (error) {
      console.error("Erro ao conectar ao MongoDB:", error);
      throw error;
    }
  }
  return db;
};

export async function connectDb(){
  await connectToDatabase();


  await createCollections(db)
  await insertEventos(db)

  console.log("Banco de dados pronto para operações."); 
} 