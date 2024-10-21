import { readFileSync } from "fs";
import { executar_sql } from "../conexion/connection";

export async function participantesPorEvento() {
  const relatorioSQL = readFileSync(
    "src/sql/rel_numero_participantes_por_evento.sql",
    "utf-8"
  );

  const relatorioResult = await executar_sql(relatorioSQL);

  console.table(relatorioResult);
}