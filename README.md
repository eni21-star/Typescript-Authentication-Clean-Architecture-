```markdown
# Typescript Robust Authentication API

## Overview

This is an Express.js application that handles user authentication, including registration, login, OAuth (Google), email verification, and password reset functionalities. The app uses middlewares like `passport` for OAuth authentication and includes structured error handling for handling common issues such as bad requests, unauthorized access, and conflicts like duplicate email registration.

## Features

- **User Registration**: Register a new user via `/api/v1/register`.
- **User Login**: Authenticate an existing user via `/api/v1/login`.
- **OAuth with Google**: Authenticate users with Google OAuth2.
- **Email Verification**: Verify a user's email after registration.
- **Forgot Password**: Request a password reset link.
- **Password Reset**: Reset the user's password using the reset link.
- **Structured Error Handling**: Centralized error handling for bad requests, conflicts, and unauthorized access.
- **Logging**: Logs HTTP requests and important server actions.

## Project Structure

```bash
├── src
│   ├── routes
│   │   ├── auth
│   │   │   ├── loginRoute.js
│   │   │   ├── verifyMail.js
│   │   │   ├── oauthRoute.js
│   │   │   ├── oauthCallback.js
│   │   │   ├── forgotPasswordRoute.js
│   │   │   └── resetPasswordRoute.js
│   ├── Authentication
│   │   └── api
│   │       └── routes
│   │           └── registerRoute.js
│   └── config
│       └── loggerConfig.js
├── errors
│   └── errors.js
├── app.ts
└── README.md


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/yourproject.git
   cd yourproject
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add your configuration for:
   ```
   FACEBOOK_APP_ID=your_facebook_app_id
   FACEBOOK_APP_SECRET=your_facebook_app_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ...
   ```

4. Run the server:

   ```bash
   npm run start
   ```

## Endpoints

- **User Registration**: `POST /api/v1/register`
- **User Login**: `POST /api/v1/login`
- **Google OAuth**: `GET /api/v1/auth/google`
- **Google OAuth Callback**: `GET /api/v1/auth/google/callback`
- **Email Verification**: `GET /verify`
- **Forgot Password**: `POST /api/v1/forgot-password`
- **Reset Password**: `POST /api/v1/reset-password`

## Error Handling

The app has custom error handling with the following error types:

- **BadreqError**: For handling bad request errors (400).
- **ConflictError**: For handling conflict errors (409), such as trying to register with an existing email.
- **NotFoundError**: For handling resource not found errors (404).
- **UnauthorizedError**: For handling unauthorized access (401).

Example of a structured error response:

```json
{
  "message": "Email already exists",
  "statusCode": 409
}
```

## Logging

The app uses `winston` for logging. All incoming HTTP requests are logged using the `logger` middleware.

## Contribution

Feel free to fork this project and submit pull requests. Any contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
