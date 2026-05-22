# Lumora Backend API Requirements

This contract was inferred from the existing static frontend screens:

- `lumora_login`: email/password login and token validation.
- `lumora_signup`: full name, username, email, password signup.
- `lumora_refined_feed`: authenticated feed, search entry, create/upload entry, activity, profile.
- `lumora_create_post`: image upload, AI image generation, AI caption generation, title, caption, tags.
- `lumora_post_detail`: image detail, follow, like, save, share, comments.
- `lumora_dynamic_search_grid`: image/user/tag search and category exploration.
- `lumora_profile`, `lumora_settings_corrected`, `lumora_notifications`: profile, settings, notifications, privacy.

## Response Envelope

All endpoints return:

```json
{
  "success": true,
  "message": "OK",
  "data": {},
  "meta": { "page": 1, "limit": 20 }
}
```

Errors return:

```json
{
  "success": false,
  "message": "Validation failed",
  "details": []
}
```

## Auth Flow

The frontend should store `data.token` after signup/login and send:

```http
Authorization: Bearer <jwt>
```

Endpoints:

- `POST /api/v1/auth/signup`
  Body: `{ "fullName": "Evelyn Thorne", "username": "@evelyn_curates", "email": "evelyn@studio.com", "password": "password123" }`
- `POST /api/v1/auth/login`
  Body: `{ "email": "name@example.com", "password": "password123" }`
- `GET /api/v1/auth/me`

## Image Upload Flow

The create screen's upload tab should send multipart form data:

- `image`: JPEG, PNG, WEBP, or GIF file.
- `title`: creation title.
- `caption`: optional story/caption.
- `tags`: comma-separated tags such as `art,mood,editorial`.

Endpoint:

- `POST /api/v1/images/upload`

## AI Image Generation Flow

The AI Generate tab maps to:

- `POST /api/v1/ai/images/generate`
  Body: `{ "prompt": "soft light interior", "style": "editorial", "title": "Morning Study", "caption": "", "tags": ["interior"] }`

The backend currently uses a provider-ready mock image URL. Replace `aiService.generateImage` when a real AI image provider is selected.

Caption helper:

- `POST /api/v1/ai/captions/generate`
  Body: `{ "prompt": "soft light interior", "title": "Morning Study", "tags": ["interior"] }`

## Feed And Social Flow

- `GET /api/v1/images/feed?page=1&limit=20`
- `GET /api/v1/images/:id`
- `POST /api/v1/social/images/:imageId/like`
- `POST /api/v1/social/images/:imageId/save`
- `GET /api/v1/social/images/:imageId/comments`
- `POST /api/v1/social/images/:imageId/comments`
  Body: `{ "body": "This perspective on light is inspiring." }`
- `POST /api/v1/social/users/:userId/follow`

Likes, saves, follows are toggle endpoints because the frontend has single action buttons.

## Search Flow

- `GET /api/v1/search?q=architecture&page=1&limit=20`
  Returns `{ images, users, tags }`.
- `GET /api/v1/search/tags?q=photo`
  Returns tag suggestions.
- `GET /api/v1/users/search?q=evelyn`
  Returns user-only results.

## User And Settings Flow

- `GET /api/v1/users/me`
- `PATCH /api/v1/users/me`
  Body: `{ "fullName": "Evelyn Thorne", "bio": "...", "website": "https://example.com", "location": "Paris", "avatarUrl": "https://...", "isPrivate": false }`
- `GET /api/v1/users/:id`

## Notifications

- `GET /api/v1/notifications?page=1&limit=20`
- `PATCH /api/v1/notifications/:id/read`

## Analytics And Event Tracking

The frontend can track view, save, share, download, search, upload, generation, and caption events:

- `POST /api/v1/analytics/events`
  Body: `{ "imageId": 1, "eventType": "share", "metadata": { "surface": "post_detail" } }`
- `GET /api/v1/analytics/images/:imageId`

Image detail automatically tracks `view` events.
