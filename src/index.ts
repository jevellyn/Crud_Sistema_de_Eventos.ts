import { setTimeout } from "timers/promises";
import { connectDb, disconnectDb } from "./conexion/connection";
//import { Menu } from "./utils/menu";
import { prompt } from "./utils/prompt";

async function main() {
  await connectDb();

  //const menu = new Menu();
  let escolha = 0;

  while (true) {
    //menu.menu_principal();

    escolha = +prompt("\n-> ");

    if (escolha < 1 || escolha > 5) {
      console.log("\nOpção inválida!!!\n");
      await setTimeout(1000);
      continue;
    }

    if (escolha === 5) {
      disconnectDb();
      console.log("\nOBRIGADO POR UTILIZAR NOSSO SISTEMA\n");
      break;
    }

    //await menu.menu_secundario(escolha);
    await setTimeout(200);
  }
}

main();
