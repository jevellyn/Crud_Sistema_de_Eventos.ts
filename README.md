# Sistema de Gerenciamento de Eventos em TypeScript Fazendo Crud com o MySQL

Esse sistema de eventos é composto por um conjunto de tabelas que representam um sistema de eventos, contendo tabelas como: participantes, eventos e participante do evento.

Para iniciar o programa no Linux, é necessário ter o banco `SYS_EVENTO` criado, pois as tabelas serão criadas ao iniciar o sistema e o Node.js deve estar instalado.

## Instalação do Node:

### Passo 1: Instale o NVM (Node Version Manager)

Execute o seguinte comando no terminal para instalar o NVM:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
```
Com o NVM instalado, instale a versão 20 do Node.js executando:
```bash
nvm install 20
```
Para garantir que o Node.js foi instalado corretamente, verifique a versão instalada:
```bash
node -v
```
Para certificar-se de que o NPM (Node Package Manager) foi instalado corretamente, verifique sua versão:
```bash
npm -v
```
# Execução do Sistema
Navegue até a pasta do projeto:
```bash
cd /caminho/do/projeto
```
Instale as dependências:
```bash
npm i
```
Inicie o sistema:
```bash
npm start
```

## Organização
- [Diagrama_BD](Diagrama_BD): Nesse diretório está o [diagrama relacional](Diagrama_BD/Eventos.pdf) (lógico) do sistema.
    * O sistema possui três entidades: PARTICIPANTES, PARTICIPANTE_EVENTO E EVENTOS.

- [sql](sql): Nesse diretório estão os scripts para criação das tabelas e inserção de dados fictícios para testes do sistema.
    * [create_tables_sistema_eventos.sql](sql/create_tables_sistema_eventos.sql): Responsável pela criação das tabelas e relacionamentos.
    * [insert_tables_sistema_eventos.sql](sql/insert_tables_sistema_eventos.sql): Responsável pela inserção dos registros fictícios para testes do sistema.
    * [trigger_check_limite.sql](sql/trigger_check_limite.sql): Este *trigger* impede a inserção de novos participantes em um evento quando o limite de capacidade for atingido, exibindo uma mensagem de erro.

- [src](src): Nesse diretório estão os scripts do sistema

    * [conexion](src/conexion/): Nesse repositório encontra-se o [módulo de conexão com o banco de dados MySql](src/conexion/connection.ts). 

    * [controllers](src/controllers/): Nesse diretório encontram-se as classes controladoras, responsáveis por realizar inserção, alteração e exclusão dos registros das tabelas.

      - Exemplo de módulo para atualizar evento:

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

    * [index.ts](src/index.ts): Este script implementa a função principal do sistema, gerencia a conexão com o banco de dados, exibe um menu interativo para o usuário e processa as escolhas, até que ele opte por encerrar o sistema.

### Bibliotecas Utilizadas
- [package.json](package.json): Este é o arquivo contendo as dependências.

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
  $ mysql --version
  ```
- O servidor será iniciado automaticamente. Verifique o status com o comando: 
  ```shell
  $ sudo systemctl status mysql
  ```
  Para finalizar crie o banco de dados executando o comando:
  ```shell
  CREATE DATABASE IF NOT EXISTS SYS_EVENTO;
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
