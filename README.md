# Desafio MB We

O projeto foi desenvolvido com vue js 3 via composition API com `<script setup>` + Vite, sem o uso de qualquer outra biblioteca externa.
O Servidor foi desenvolvido com Node.js e express

# Instalação do projeto client
apos clonar o projeto, rode o comando 
`npm install` na raiz do projeto para instalar as dependencias do front
inicie o projeto rodando o comando `npm run dev`

# Instalação do projeto server
acessa pasta do servidor `cd/server` e então execute o comando node index.js, o servidor sera iniciado na portal 3000


# Endpoints 

#### GET /registration

Este endpoint retorna um arquivo HTML.

#### POST /registration

Este endpoint recebe os dados do formulário de registro, valida-os e retorna uma resposta baseada na validação:

-   Em caso de erro, retorna uma mensagem descritiva do erro.
-   Em caso de sucesso, retorna uma mensagem de sucesso confirmando o recebimento dos dados.
