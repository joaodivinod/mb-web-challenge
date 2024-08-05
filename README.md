# Desafio MB We

O projeto foi desenvolvido com Vue.js 3 utilizando a Composition API e o `<script setup>`, configurado com Vite. Não foram usadas bibliotecas externas adicionais no front-end. O servidor foi desenvolvido com Node.js e Express.

# Instalação do Projeto Client
Após clonar o projeto, siga os passos abaixo para configurar e iniciar o ambiente do front-end:
-   Navegue até a raiz do projeto.
- Instale as dependências necessárias executando o comando:
`npm install`
 - Inicie o projeto com o comando:
`npm run dev`

# Instalação do Projeto Server
Para configurar e iniciar o servidor back-end, siga os passos abaixo:
- Navegue até a pasta do servidor:
`cd server`
- Inicie o servidor executando o comando:
 `node index.js`
O servidor será iniciado na porta 3000.

## endpoints 

#### GET /registration

Este endpoint retorna um arquivo HTML.

#### POST /registration

Este endpoint recebe os dados do formulário de registro, valida-os e retorna uma resposta baseada na validação:

-   Em caso de erro, retorna uma mensagem descritiva do erro.
-   Em caso de sucesso, retorna uma mensagem de sucesso confirmando o recebimento dos dados.
