# Lumora Backend Handoff

## Current Status

Backend is complete for demo/MVP handoff.

The Express app serves both:

- Backend API: `http://localhost:5000/api/v1`
- Frontend pages: `http://localhost:5000/login`, `/feed`, `/create`, etc.

Demo mode is enabled so the app can be explored without MySQL.

## Demo Credentials

```text
Email: demo@lumora.test
Password: demo12345
```

## What Works Now

- Auth routes
- Demo login/signup
- JWT token creation and protected routes
- User profile routes
- Feed route
- Image detail route
- Image upload route
- AI image generation mock
- AI caption generation mock
- Likes
- Saves
- Comments
- Follows
- Search
- Analytics events
- Notifications
- Health check
- Frontend serving
- Local Tailwind CSS build
- Postman collection

## What Is Mocked In Demo Mode

When MySQL is unavailable and `DEMO_AUTH_ENABLED=true`, these use in-memory demo data:

- Auth session for fixed demo credentials
- Feed data
- Search results
- Image creation fallback
- Likes/saves/comments/follows
- Notifications
- Analytics responses

AI image generation currently uses a mock placeholder provider unless a real provider is wired.

## What Requires Database Work

Database/cloud teammate should:

- Install/start MySQL
- Configure `.env`
- Run:

```bash
npm run db:schema
```

- Verify real signup/login
- Verify feed with persisted images
- Review indexes and relations
- Set:

```env
DEMO_AUTH_ENABLED=false
REQUIRE_DB_ON_START=true
```

## What Requires Cloud Work

Pending cloud tasks:

- Backend deployment
- Production environment variables
- Domain/CORS configuration
- S3 or equivalent object storage
- Persistent upload storage
- Real AI provider key/configuration
- Production MySQL hosting
- HTTPS and deployment health checks

## Important Files

- `README.md`: setup and API summary
- `.env.example`: required environment variables
- `src/database/schema.sql`: MySQL schema
- `scripts/run-schema.js`: Node-based schema runner
- `postman/Lumora.postman_collection.json`: API testing collection
- `src/app.js`: Express middleware and route setup
- `src/routes/`: API route definitions
- `src/controllers/`: HTTP handlers
- `src/services/`: business logic
- `src/models/`: MySQL queries
- `src/utils/demoStore.js`: demo-mode in-memory data

## Known Limitations

- Demo data is in memory and resets on server restart.
- Demo auth is not production auth.
- AI image generation is mocked.
- Uploads are local filesystem based.
- MySQL is not currently connected in this local environment.
- CI/CD is not configured because it is not required for this phase.

## Handoff Recommendation

Do not continue polishing backend architecture before DB/cloud integration.

Next best work:

- Connect MySQL
- Disable demo auth
- Verify real DB-backed auth/feed/uploads
- Replace local uploads with cloud storage
- Replace mock AI provider with a real provider
- Run the Postman collection after every integration step
