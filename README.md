# Nome do Projeto

O projeto de Lista de Tarefas tem como objetivo gerenciar tarefas e o usuário pode ver apenas as suas tarefas

## Acesso ao projeto

[Acessar projeto](https://lista-tarefas-db583.web.app/)

## Recomendação de uso

É recomendado que crie um usuário na area Criar Conta. Caso queira utilizar um usuário de demonstração basta acessar com os dados abaixo:

Email: teste@teste.com <br>
Senha: 123456

## Instalação

Para instalar o projeto, você precisa ter o [Yarn](https://yarnpkg.com/) e o [Node.js](https://nodejs.org/) instalados na sua máquina. Siga as instruções abaixo:

1. Clone o repositório:

   ```bash
   git clone https://github.com/dawanlago/lista-tarefas.git
   cd lista-tarefas
   ```

2. Instale as dependências usando o Yarn:

   ```bash
   yarn install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   yarn dev
   ```

Agora você pode acessar o projeto no seu navegador em `http://localhost:3000` (ou outra porta especificada).

## Estrutura do Projeto

A estrutura do seu projeto é organizada da seguinte forma:

- **`src/assets/scss`**: Armazena os arquivos SCSS que utilizo para classes globais.
- **`src/components`**: Contém todos os componentes da aplicação.
- **`src/pages`**: Contém as páginas do aplicativo, que podem incluir diferentes visualizações da aplicação.
- **`src/plugins`**: Aqui você pode adicionar plugins Vue adicionais que você esteja utilizando.
- **`src/router`**: Gerencia as rotas da aplicação, permitindo a navegação entre diferentes páginas e componentes.
- **`src/services`**: Contém a lógica de persistência de dados e autenticação, usando Firebase com Firestore e Auth.
- **`src/stores`**: Contém as definições do Pinia, que é utilizado como controle de estado da aplicação.
- **`src/utils`**: Contém funções utilitárias que podem ser usadas em diferentes partes do projeto.

## Bibliotecas Utilizadas

- **[Vite](https://vite.dev/)**: Um bundler moderno para projetos front-end.
- **[Vuetify](https://vuetifyjs.com/)**: Biblioteca de componentes Vue que fornece um design elegante e responsivo.
- **[Firebase](https://firebase.google.com/)**: Usado para autenticação e persistência de dados. Utilizo o Firestore para armazenar dados e o Auth para gerenciar autenticações.
- **[Pinia](https://pinia.vuejs.org/)**: Biblioteca para gerenciamento de estado da aplicação, substituindo o Vuex.
- **[Vue Router](https://router.vuejs.org/)**: Usado para gerenciar a navegação entre páginas no aplicativo.

## Persistência de Dados

Os dados são armazenados no Firestore, e a autenticação é gerenciada através do Firebase Auth. O email e o token do usuário autenticado são armazenados no `localStorage` do navegador para garantir a persistência entre as sessões.
