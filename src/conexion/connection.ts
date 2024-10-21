import { readFileSync } from "fs";
import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "192.168.13.250",
  port: 3306,
  user: "admin",
  database: "SYS_EVENTO",
  password: "4t8zzgssx8uk2s9",
  multipleStatements: true,
});

export async function executar_sql(sql: string): Promise<any> {
  return await new Promise((resolve, reject) => {
    connection.query(sql, (error, result) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(result);
      }
    });
  });
}

export async function connectDb() {
  connection.connect();

  const createTablesSQL = readFileSync(
    "sql/create_tables_sistema_eventos.sql",
    "utf-8"
  );
  const populateTablesSQL = readFileSync(
    "sql/insert_tables_sistema_eventos.sql",
    "utf-8"
  );
  const createTrigger = readFileSync("sql/trigger_check_limite.sql", "utf-8")

  await executar_sql(createTablesSQL);
  await executar_sql(populateTablesSQL);
  await executar_sql(createTrigger);
}

export function disconnectDb() {
  connection.end();
}
