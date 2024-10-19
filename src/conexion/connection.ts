import { readFileSync } from "fs";
import mysql from "mysql2";

const connection = mysql.createConnection({
    host: "localhost",
    port: 1234,
    user: "admin",
    password: "root",
    multipleStatements: true,
});

export async function executar_sql(sql: string) {
    return await new Promise((resolve, reject) => {
        connection.query(sql, (error, result) => {
            if (error) {
                console.log("Erro ao executar sql:", error.message);
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
    const createTriggersSQL = readFileSync(
        "sql/trigger_insert_participantes_evento.sql",
        "utf-8"
    );

    await executar_sql(createTablesSQL);
    await executar_sql(populateTablesSQL);
    await executar_sql(createTriggersSQL);
}

export function disconnectDb() {
    connection.end();
}
