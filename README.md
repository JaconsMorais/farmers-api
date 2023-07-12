# Setup

Para instalar os pacotes:

```
yarn install
```

Para gerenciar o banco de dados:
```
yarn db:refresh // Reseta o banco de dados e carrega as culturas
yarn db:reset //Reseta banco de dados
yarn db:migrate //Executa migrations
```

Para executar o projeto em dev:

Copie o arquivo .env.example para um novo arquivo .env

Execute:
```
yarn dev
```


#Acesso e autorização
A API usa seções salvas em cookie para gerenciar o acesso.

Cada usuário pode visualizar outros usuários, cada usuário só pode editar produtores e fazendas que ele próprio cadastrou.


