# Sistema de Eventos em Python fazendo CRUD no MySQL

Esse sistema de eventos é composto por um conjunto de tabelas que representam participantes de eventos, contendo tabelas como: participantes, eventos e participante do evento.

Para iniciar o programa é necessário ter o banco criado, pois as tabelas serão criadas ao iniciar o sistema.

Para executar o sistema é necessário estar na pasta do sistema e executar o script a seguir (esse comando requer o node):
```shell
~$ npm i
```
Em seguida execute o script a seguir: 
```shell
~$ npm start
```

## Organização
- [Diagrama_BD](Diagrama_BD): Nesse diretório está o [diagrama relacional](Diagrama_BD/Eventos.pdf) (lógico) do sistema.
    * O sistema possui três entidades: PARTICIPANTES, PARTICIPANTE_EVENTO E EVENTOS.
- [sql](sql): Nesse diretório estão os scripts para criação das tabelas e inserção de dados fictícios para testes do sistema
    * [create_tables_sistema_eventos.sql](sql/create_tables_sistema_eventos.sql): script responsável pela criação das tabelas e relacionamentos.
    * [insert_tables_sistema_eventos.sql](sql/insert_tables_sistema_eventos.sql): script responsável pela inserção dos registros fictícios para testes do sistema.
- [src](src): Nesse diretório estão os scripts do sistema
    * [conexion](src/conexion/): Nesse repositório encontra-se o [módulo de conexão com o banco de dados MySql](src/conexion/connection.ts). 
    * [controllers](src/controllers/): Nesse diretório encontram-se as classes controladoras, responsáveis por realizar inserção, alteração e exclusão dos registros das tabelas.
      - Exemplo de modulo para atualizar evento:

        ```typescript
        async atualizar_evento() {
        	await EventosModel.listar_db();

        	console.log("Digite os dados para atualizar o evento:\n");

        	const IDEvento = +prompt("Id do evento: ");
        	const descricao = prompt("Descrição: ");
        	const tipo = prompt("Tipo: ");
        	const data = prompt("Data evento(yyyy-MM-dd): ");
        	const limite = +prompt("Limite de participantes: ");
        	const duracao = prompt("Duração: ");

        	const novoEvento = new EventosModel({
            		IDEvento: IDEvento,
            		dataEvento: data,
            		descricao: descricao,
            		duracaoEvento: duracao,
            		limiteParticipantes: limite,
            		tipoEvento: tipo,
        	});

        await EventosModel.atualizar_db(novoEvento);
        	await EventosModel.listar_db();
    	}
        ```
    * [models](src/models/): Nesse diretório encontram-se as classes das entidades descritas no [diagrama relacional](Diagrama_BD/Eventos.pdf)
    * [reports](src/reports/) Nesse diretório encontram-se as classes responsáveis por gerar todos os relatórios do sistema, [eventos por mês](src/reports/eventosPorMes.ts) e [participantes por evento](src/reports/participantesPorEvento.ts)
    * [sql](src/sql/): Nesse diretório encontram-se os scripts utilizados para geração dos relatórios a partir das classes [eventos por mês](src/reports/eventosPorMes.ts) e [participantes por evento](src/reports/participantesPorEvento.ts)
    * [utils](src/utils/): Nesse diretório encontram-se os scripts de [configuração](src/utils/menu.ts) e automatização da [tela de informações iniciais](src/utils/splashScreen.ts)
    * [index.ts](src/index.ts): Script responsável por ser a interface entre o usuário e os módulos de acesso ao Banco de Dados.

### Bibliotecas Utilizadas
- [package.json](package.json): este é o arquivo contendo as dependências.

### Instalando o MySQL
- A versão do Banco de Dados utilizada já vem disponível no repositório padrão do Ubuntu e Mint.
- Antes de instalar o MySQL, abra o terminal e atualiza o cache do repositório apt
  ```shell
  $ sudo apt update
  ```
- Em seguida, instale o servidor MySQL com o comando:
  ```shell
  $ sudo apt install mysql-server
  ```
- Digite "Y" para continuar com a instalação
  ```shell
  Do you want to continue? [Y/n]
  ```
- Após instalar, verifique a instalação e versão com o comando
  ```shell
  $ mysql --Version
  ```
- O servidor será iniciado automaticamente. Verifique o status com o comando: 
  ```shell
  $ sudo systemctl status mysql
  ```

## Criado por:
- Julia Evellyn
- Ana Clara Alves
- Ezequiel Soeiro Gomes
- Gabriel Silva Herculino
- Ian Rodrigues da Silva
- Kauã Fonseca Silva

## Professor:
- Prof. M.Sc. Howard Roatti

## Disciplina:
- Banco de Dados
- 2024/02
