# Gympass style app

Aplicativo desenvolvido durante módulo de SOLID da trilha Ignite da Rocketseat.

## Requisitos Funcionais

- [x] Deve ser possível cadastrar usuário;
- [x] Deve ser possível autenticar usuário;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível obter o histórico de check-ins de um usuário;
- [ ] Deve ser possível buscar academias próximas do usuário;
- [ ] Deve ser possível buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## Requisitos Não Funcionais

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 items por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token)

## Regras de Negócio

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto da academia (100m);
- [ ] O check-in só pode ser validado em até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;