# Gympass style app

Aplicativo desenvolvido durante módulo de SOLID da trilha Ignite da Rocketseat.

## Requisitos Funcionais

- [ ] Deve ser possível cadastrar usuário;
- [ ] Deve ser possível autenticar usuário;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível obter o histórico de check-ins de um usuário;
- [ ] Deve ser possível buscar academias próximas do usuário;
- [ ] Deve ser possível buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## Requisitos Não Funcionais

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 items por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token)

## Regras de Negócio

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto da academia (100m);
- [ ] O check-in só pode ser validado em até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;