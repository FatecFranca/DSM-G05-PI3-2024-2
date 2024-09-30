# DSM-G05-PI3-2024-2
Repositório do GRUPO 05 do Projeto Interdisciplinar do 3º semestre DSM 2024/2. Alunos: Éllen Dias Farias, Gabriel Fillip Ribeiro Ferreira, Habbiner Soares de Andrade, Leonardo Cassio dos Santos.

# Criação do projeto back-end

Executar no terminal:

npx aka-demy/create-express-app

Perguntas feitas pelo comando:
* Ok to proceed? ~> y
* Give a name for the app ~> back-end
* Choose a language ~> JavaScript
* Choose a template engine ~> None
* Choose a package manager ~> npm

# Alternando para a pasta do projeto back-end

No terminal:

cd back-end

# Executando o projeto back-end

npm run dev

# Instalando a biblioteca Prisma

npm install prisma --save-dev

# Inicialização do Prisma

npx prisma init

# (Re)criação do Prisma Client

Toda vez que o arquivo schema.prisma é modificado, é necessário executar o seguinte comando no terminal:

npx prisma generate