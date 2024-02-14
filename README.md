# Gympass style app

This is an API was developed during the SOLID module of Rocketseat's Ignite track, featuring clean code practices as well.
It is similar to a GymPass application, making it possible for a user to register his\her account and check-in nearby gyms, in a close-to-reality scenario.

## Functionalities

- User can register an account
- User can register gyms
- User can check in in Gyms nearby
- User is authenticated
- User can search gyms based on query parameters
- User can check check-ins metrics & history

## Technologies Used

- Node.js
- Typescript
- Fastify
- Zod
- PostgreSQL
- Docker
- Vitest
- Supertest

## Installing the Project

```
git clone *projet-url*

cd *projects-directory*

npm install
```

## Load Docker Image (PostgreSQL)

*Reminder: Docker software must be installed previously.

```
docker compose up -d
```

## Functional Requirements

- [x] User registration must be possible.
- [x] User authentication must be possible.
- [x] It must be possible to obtain the profile of a logged-in user.
- [x] It must be possible to obtain the number of check-ins performed by the logged-in user.
- [x] It must be possible to obtain the check-in history of a user.
- [x] It must be possible to search for gyms near the user (up to 10km).
- [x] It must be possible to search for gyms by name.
- [x] The user must be able to check-in at a gym.
- [x] Validating a user's check-in must be possible.
- [x] It must be possible to register a gym.

## Non-Functional Requirements

- [x] The user's password needs to be encrypted.
- [x] Application data must be persisted in a PostgresSQL database.
- [x] All data lists must be paginated with 20 items per page.
- [x] The user must be identified by a JWT (JSON Web Token).

## Business Rules

- [x] The user should not be able to register with a duplicate email.
- [x] The user cannot make 2 check-ins on the same day.
- [x] The user cannot check-in if not near the gym (100m).
- [x] The check-in can only be validated up to 20 minutes after it is created.
- [x] The check-in can only be validated by administrators.
- [x] The gym can only be registered by administrators.

## Routes

### User

#### Register User

```http
  POST /user
```

| Body Data   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Mandatory**. Users name |
| `email` | `string` | **Mandatory**. Users email. |
| `password` | `string` | **Mandatory**. Users password. |


#### Authenticate User

```http
  POST /authenticate
```

| Body Data   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Mandatory**. Users email. |
| `password` | `string` | **Mandatory**. Users password. |

#### Refresh Token

```http
  PATCH /token/refresh
```


#### Profile

```http
  GET /me
```

### Gym

#### Create a Gym

```http
  POST /gyms
```

| Body Data   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `title` | `string` | **Mandatory**. Gyms title. |
| `description` | `string` | **Mandatory**. Gyms description. |
| `phone` | `string` | **Mandatory**. Gyms phone. |
| `latitude` | `number` | **Mandatory**. Gyms latitude position. |
| `longitude` | `number` | **Mandatory**.  Gyms longitude position. |

#### Find Gyms

```http
  GET /gyms/search
```

| Query Data   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `q` | `string` | **Mandatory**. Query search field. |
| `page` | `number` | **Mandatory**. Pagination number for search. |

#### Fetch Nearby Gyms

```http
  GET /gyms/nearby
```

| Query Data   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `latitude` | `number` | **Mandatory**. Users latitude position. |
| `longitude` | `number` | **Mandatory**. Users longitude position. |

### Check In

#### Create a Check In

```http
  POST /gyms/:gymId/check-ins
```

| Param Data   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `gymId` | `string` | **Mandatory**. Gym's ID that the check-in is being made in. |

| Body Data   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `latitude` | `number` | **Mandatory**. Users latitude position. |
| `longitude` | `number` | **Mandatory**. Users longitude position. |


#### Validate Check In

```http
  PATCH /check-ins/:checkInId/validate
```

| Param Data   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `checkInId` | `string` | **Mandatory**. Check-In ID that's being validated. |

#### Check-Ins History

```http
  GET /check-ins/history
```

| Query Data   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `page` | `number` | **Mandatory**. Pagination number to search check-ins history. |

#### Check-Ins Metrics

```http
  GET /check-ins/metrics
```

## Take Aways

- Environment Variables validation with Zod
- Build Docker compose file to run PostgreSQL image
- Principle of inverse dependency and single responsibility
- Automated tests through Github Actions
- Build test environment for Vitest
- Build application separating layers (HTTP, Repository, Use-Case)
