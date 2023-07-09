# Node.js Project

A server-side project for web apllication with users and cards

## Installation

1. Open vsCode and clone the repository from GitHub:

2. Install the dependencies:

```bash
  npm i
```

3. Run the server

```bash
   npm run dev
```

### my congratulations! Now you can start calling the server using its api.

In order to check it, you can use the postman program

## API Documentation

The following API endpoints are available in this project:

### GET auth/users

- **REST Method:** GET
- **URL Request:** /users
- **Authentication:** admin only
- **Request:**
  - must provide token

Retrieves a list of all users in the system.

### GET auth/users/:id

- **REST Method:** GET
- **URL Request:** /users/:id
- **Authentication:** admin or the registered user
- **Request:**
  - must provide token

### POST auth/register

- **REST Method:** POST
- **URL Request:** /register
- **Authentication:** No
- **Request:**
  - body:
    - `name`: The name of the user. [object]
      - `first`: The first name of the user. [string]
        - Required.
      - `middle`: The middle name of the user. [string]
      - `last`: The last name of the user. [string]
        - Required.
    - `phone`: The phone number of the user. [string]
      - Required.
      - Format: 0XX-XXXXXXX (e.g., 050-0000000)
    - `email`: The email address of the user. [string]
      - Required.
      - Format: valid email address.
      - Unique.
    - `password`: The password for the user account. [string]
      - Required.
      - Format: At least 8 characters long with at least one uppercase letter, one lowercase letter, one digit, and one special character (#?!@$%^&\*-).
    - `image`: The image of the user. [object]
      - `url`: The URL of the image. [string]
        - Format: valid URL.
        - Required.
      - `alt`: The alt text for the image. [string]
        - Required.
    - `address`: The address of the user. [object]
      - `state`: The state of the user's address. [string]
      - `country`: The country of the user's address. [string]
        - Required.
      - `city`: The city of the user's address. [string]
        - Required.
      - `street`: The street of the user's address. [string]
        - Required.
      - `houseNumber`: The house number of the user's address. [number]
        - Required.
        - Minimum length: 1.
      - `zip`: The ZIP code of the user's address. [number]
        - Minimum length: 4.

Registers a new user in the system.

### POST auth/users/login

- **REST Method:** POST
- **URL Request:** /users/login
- **Authentication:** None
- **Request:**
  - body:
    - `email`: The email address of the user. [string]
      - Required.
      - Format: valid email address.
    - `password`: The password for the user account. [string]
      - Required.
      - Format: At least 8 characters long with at least one uppercase letter, one lowercase letter, one digit, and one special character (#?!@$%^&\*-).

Logs in a user with the provided email and password.

### PATCH auth/users/:id

- **REST Method:** PATCH
- **URL Request:** /users/:id
- **Authentication:** admin or the registered user
- **Request:**
  - must provide token

Updates the user role to a business user

### PUT /users/:id

- **REST Method:** PUT
- **URL Request:** /users/:id
- **Authentication:** the registered user only
- **Request:**
  - must provide token
  - body:
    - `name`: The name of the user. [object]
      - `first`: The first name of the user. [string]
        - Required.
      - `middle`: The middle name of the user. [string]
      - `last`: The last name of the user. [string]
        - Required.
    - `phone`: The phone number of the user. [string]
      - Required.
      - Format: 0XX-XXXXXXX (e.g., 050-0000000)
    - `email`: The email address of the user. [string]
      - Required.
      - Format: valid email address.
      - Unique.
    - `image`: The image of the user. [object]
      - `url`: The URL of the image. [string]
        - Format: valid URL.
        - Required.
      - `alt`: The alt text for the image. [string]
        - Required.
    - `address`: The address of the user. [object]
      - `state`: The state of the user's address. [string]
      - `country`: The country of the user's address. [string]
        - Required.
      - `city`: The city of the user's address. [string]
        - Required.
      - `street`: The street of the user's address. [string]
        - Required.
      - `houseNumber`: The house number of the user's address. [number]
        - Required.
        - Minimum length: 1.
      - `zip`: The ZIP code of the user's address. [number]
        - Minimum length: 4.

Updates a specific user by their ID.

### DELETE /users/:id

- **REST Method:** DELETE
- **URL Request:** /users/:id
- **Authentication:** admin or the registered user
- **Request:**
  - must provide token

Deletes a specific user by their ID.

### GET /cards

- **REST Method:** GET
- **URL Request:** /cards
- **Authentication:** None
- **Request:** None

Retrieves a list of all cards.

### GET /cards/my-card

- **REST Method:** GET
- **URL Request:** /cards/my-card
- **Authentication Needed:** owner user only
- **Request:**
  - must provide token

Retrieves the card associated with the authenticated user.

### POST /cards

- **REST Method:** POST
- **URL Request:** /cards
- **Authentication:** business user
- **Request:**
  - must provide token
  - body: -`title`: The title of the card. [string]
    - Required.
    - `subTitle`: The subtitle of the card. [string]
      - Required.
    - `description`: The description of the card. [string]
      - Required.
      - Maximum length: 1024 characters.
    - `phone`: The phone number associated with the card. [string]
      - Required.
      - Format: 0XX-XXXXXXX (e.g., 0502-0000000).
    - `email`: The email address associated with the card. [string]
      - Required.
      - Format: valid email address.
      - Unique.
    - `web`: The website URL associated with the card. [string]
      - Format: valid URL.
    - `image`: The image associated with the card. [object]
      - `url`: The URL of the image. [string]
      - `alt`: The alt text for the image. [string]
    - `address`: The address associated with the card. [object]
      - `state`: The state of the card's address. [string]
      - `country`: The country of the card's address. [string]
        - Required.
      - `city`: The city of the card's address. [string]
        - Required.
      - `street`: The street of the card's address. [string]
        - Required.
      - `houseNumber`: The house number of the card's address. [number]
        - Required.
        - Minimum length: 1.
      - `zip`: The ZIP code of the card's address. [number]
        - Minimum length: 4.

Creates a new card.

### PUT /cards/:id

- **REST Method:** PUT
- **URL Request:** /cards/:id
- **Authentication:** owner user only and admin
- **Request:**
  - must provide token
  - body: -`title`: The title of the card. [string]
    - Required.
    - `subTitle`: The subtitle of the card. [string]
      - Required.
    - `description`: The description of the card. [string]
      - Required.
      - Maximum length: 1024 characters.
    - `phone`: The phone number associated with the card. [string]
      - Required.
      - Format: 0XX-XXXXXXX (e.g., 0502-0000000).
    - `email`: The email address associated with the card. [string]
      - Required.
      - Format: valid email address.
      - Unique.
    - `web`: The website URL associated with the card. [string]
      - Format: valid URL.
    - `image`: The image associated with the card. [object]
      - `url`: The URL of the image. [string]
      - `alt`: The alt text for the image. [string]
    - `address`: The address associated with the card. [object]
      - `state`: The state of the card's address. [string]
      - `country`: The country of the card's address. [string]
        - Required.
      - `city`: The city of the card's address. [string]
        - Required.
      - `street`: The street of the card's address. [string]
        - Required.
      - `houseNumber`: The house number of the card's address. [number]
        - Required.
        - Minimum length: 1.
      - `zip`: The ZIP code of the card's address. [number]
        - Minimum length: 4.

Updates a specific card by its ID.

### PATCH /cards/:id

- **REST Method:** PATCH
- **URL Request:** /cards/:id
- **Authentication:** registered user
- **Request:**
  - must provide token

Add or remove like from the card's likes array

### DELETE /cards/:id

- **REST Method:** DELETE
- **URL Request:** /cards/:id
- **Authentication:** admin or owner user
- **Request:**
  - must provide token

Deletes a specific card by its ID.
