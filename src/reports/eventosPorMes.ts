import { readFileSync } from "fs";
import { executar_sql } from "../conexion/connection";

export async function eventosPorMes() {
  const relatorioSQL = readFileSync(
    "src/sql/rel_eventos_agrupados_por_mes.sql",
    "utf-8"
  );

  const relatorioResult = await executar_sql(relatorioSQL);

  console.table(relatorioResult);
}