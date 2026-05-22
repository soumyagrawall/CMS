# Lumora Backend

Node.js, Express.js, and MySQL backend for the Lumora AI-powered social media and image-generation frontend.

The current handoff state is demo/MVP complete. The API can run without MySQL in demo mode so frontend flows can be reviewed immediately. The database/cloud teammate can later connect MySQL, S3/cloud storage, and a real AI provider.

## Tech Stack

- Node.js
- Express.js
- MySQL with `mysql2` connection pooling
- JWT authentication
- bcrypt password hashing
- Zod validation
- Multer uploads
- Centralized error handling
- Vanilla HTML/CSS/JS frontend served by Express

## Folder Structure

```text
backend/
  scripts/
    run-schema.js
  src/
    config/
    controllers/
    database/
    middleware/
    models/
    routes/
    services/
    styles/
    utils/
    validations/
  uploads/
Frontend/
  assets/
    css/
    js/
  lumora_*/
```

## Setup

```bash
cd E:\CMS\backend
npm install
copy .env.example .env
npm run dev
```

The app runs at:

```text
http://localhost:5000
```

Frontend pages:

- `GET /login`
- `GET /signup`
- `GET /feed`
- `GET /create`
- `GET /explore`
- `GET /post`
- `GET /profile`
- `GET /settings`
- `GET /notifications`
- `GET /support`

## Environment Variables

See `.env.example`.

Important variables:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=lumora
DB_USER=root
DB_PASSWORD=password
JWT_SECRET=your_jwt_secret
DEMO_AUTH_ENABLED=true
DEMO_EMAIL=demo@lumora.test
DEMO_PASSWORD=demo12345
UPLOAD_DIR=uploads/images
OPENAI_API_KEY=your_key
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_NAME=
AWS_REGION=
```

## Demo Login

Use this while MySQL is not ready:

```text
Email: demo@lumora.test
Password: demo12345
```

`DEMO_AUTH_ENABLED=true` allows only the fixed demo credentials to bypass database login. Set it to `false` when MySQL auth is ready.

## Database Setup

Start MySQL, update `.env`, then run:

```bash
npm run db:schema
```

This executes:

```text
src/database/schema.sql
```

The schema creates users, images, tags, comments, likes, saves, follows, notifications, and analytics tables.

For production-like boot behavior:

```env
REQUIRE_DB_ON_START=true
DEMO_AUTH_ENABLED=false
```

## Running

Development:

```bash
npm run dev
```

Production-style:

```bash
npm start
```

Build local frontend CSS:

```bash
npm run build:css
```

## API Response Format

Success:

```json
{
  "success": true,
  "message": "OK",
  "data": {}
}
```

Paginated success:

```json
{
  "success": true,
  "message": "Feed loaded",
  "data": {},
  "meta": {
    "page": 1,
    "limit": 20
  }
}
```

Error:

```json
{
  "success": false,
  "message": "Validation failed",
  "details": []
}
```

Passwords and password hashes are never returned from API responses.

## API Routes Summary

Health:

- `GET /health`

Auth:

- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`

Users:

- `GET /api/v1/users/me`
- `PATCH /api/v1/users/me`
- `GET /api/v1/users/search?q=demo`
- `GET /api/v1/users/:id`

Images:

- `GET /api/v1/images/feed`
- `POST /api/v1/images/upload`
- `GET /api/v1/images/:id`

AI:

- `POST /api/v1/ai/images/generate`
- `POST /api/v1/ai/captions/generate`

Social:

- `POST /api/v1/social/images/:imageId/like`
- `POST /api/v1/social/images/:imageId/save`
- `GET /api/v1/social/images/:imageId/comments`
- `POST /api/v1/social/images/:imageId/comments`
- `POST /api/v1/social/users/:userId/follow`

Search:

- `GET /api/v1/search?q=architecture`
- `GET /api/v1/search/tags?q=art`

Analytics:

- `POST /api/v1/analytics/events`
- `GET /api/v1/analytics/images/:imageId`

Notifications:

- `GET /api/v1/notifications`
- `PATCH /api/v1/notifications/:id/read`

## Postman

Import:

```text
postman/Lumora.postman_collection.json
```

Collection variables:

- `baseUrl`: `http://localhost:5000`
- `token`: auto-filled after demo login

## Uploads

Local upload directory is configurable:

```env
UPLOAD_DIR=uploads/images
MAX_UPLOAD_MB=8
```

Cloud teammate can replace local upload serving with S3 or another object store. The service boundary is `src/services/imageService.js`.

## Deployment Notes

Before deployment:

- Set `NODE_ENV=production`
- Set a strong `JWT_SECRET`
- Set `DEMO_AUTH_ENABLED=false`
- Set `REQUIRE_DB_ON_START=true`
- Configure MySQL credentials
- Configure cloud storage variables
- Configure AI provider key
- Run `npm run build:css`
- Ensure `uploads/` is backed by persistent storage or S3

## Handoff Status

Complete:

- Backend architecture
- REST API modules
- Demo auth
- Demo data fallback
- MySQL schema
- Frontend serving
- Local CSS build
- Postman collection

Pending for database/cloud teammate:

- MySQL installation and schema execution
- Production DB credentials
- Cloud deployment
- S3/cloud upload integration
- Real AI provider integration
