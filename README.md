# Sistema de Gerenciamento de Eventos em TypeScript Fazendo Crud com o MySQL

Esse sistema de eventos é composto por um conjunto de tabelas que representam um sistema de eventos, contendo tabelas como: participantes, eventos e participante do evento.

Para iniciar o programa no Linux, é necessário ter o Node.js deve estar instalado.

## Instalação do Node:

### Passo 1: Instale o NVM (Node Version Manager)

- Execute o seguinte comando no terminal para instalar o NVM:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
```
- Com o NVM instalado, instale a versão 20 do Node.js executando:
```bash
nvm install 20
```
- Para garantir que o Node.js foi instalado corretamente, verifique a versão instalada:
```bash
node -v
```
- Para certificar-se de que o NPM (Node Package Manager) foi instalado corretamente, verifique sua versão:
```bash
npm -v
```
# Execução do Sistema
- Navegue até a pasta do projeto:
```bash
cd /caminho/do/projeto
```
- Instale as dependências:
```bash
npm i
```
- Inicie o sistema:
```bash
npm start
```

## Organização
- [Diagrama_BD](Diagrama_BD): Nesse diretório está o [diagrama relacional](Diagrama_BD/Eventos.pdf) (lógico) do sistema.
    * O sistema possui três entidades: PARTICIPANTES, PARTICIPANTE_EVENTO E EVENTOS.

- [mongo](mongo): Nesse diretório estão os scripts para criação das tabelas e inserção de dados fictícios para testes do sistema.
    * [create_collections_sistema_eventos.ts](mongo\create_collections_sistema_eventos.ts): Responsável pela criação das tabelas e relacionamentos.
    * [insert_sistema_eventos.ts](mongo\insert_sistema_eventos.ts): Responsável pela inserção dos registros fictícios para testes do sistema.

- [src](src): Nesse diretório estão os scripts do sistema

    * [conexion](src/conexion/): Nesse repositório encontra-se o [módulo de conexão com o banco de dados MongoDb](src/conexion/connection.ts). 

    * [controllers](src/controllers/): Nesse diretório encontram-se as classes controladoras, responsáveis por realizar inserção, alteração e exclusão dos registros das tabelas.

      - Exemplo de módulo para atualizar evento:

        ```typescript
        async atualizar_evento() {
          await EventosModel.listar_db();

          console.log("Digite os dados para atualizar o evento:\n");

          const IDEvento = prompt("Id do evento: ");
          const descricao = prompt("Descrição: ");
          const tipo = prompt("Tipo: ");
          const data = prompt("Data evento(yyyy-MM-dd): ");
          const limite = +prompt("Limite de participantes: ");
          const duracao = prompt("Duração: ");

          const novoEvento = new EventosModel({
            IDEvento: IDEvento,
            dataEvento: new Date(data),
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

    * [utils](src/utils/): Nesse diretório encontram-se os scripts de [configuração](src/utils/menu.ts) e automatização da [tela de informações iniciais](src/utils/splashScreen.ts)

    * [index.ts](src/index.ts): Este script implementa a função principal do sistema, gerencia a conexão com o banco de dados, exibe um menu interativo para o usuário e processa as escolhas, até que ele opte por encerrar o sistema.

### Bibliotecas Utilizadas
- [package.json](package.json): Este é o arquivo contendo as dependências.

### Instalando o MySQL
- O MongoDB pode ser instalado a partir do repositório oficial do MongoDB para garantir que você obtenha a versão mais recente.

- Adicione a chave GPG pública para garantir que os pacotes baixados sejam autênticos:
  ```shell
  $ curl -fsSL https://pgp.mongodb.com/server-6.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg --dearmor
  ```
- Adicione o repositório oficial do MongoDB ao seu sistema:
  ```shell
  echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
  ```
- Atualize a lista de pacotes para incluir os do MongoDB:
  ```shell
  $ sudo apt update
  ```
- Instale o MongoDB com o seguinte comando:
  ```shell
  $ sudo apt install mongodb-org
  ```
- Digite "Y" para confirmar a instalação: 
  ```shell
  Do you want to continue? [Y/n]
  ```
- Após a instalação, confirme se o MongoDB foi instalado corretamente e exiba a versão:
  ```shell
  $ mongod --version
  ```


## Criado por:
- Julia Evellyn
- Ana Clara Alves
- Ezequiel Soeiro Gomes

## Professor:
- Prof. M.Sc. Howard Roatti

## Disciplina:
- Banco de Dados
- 2024/02
