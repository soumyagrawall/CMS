# Lumora CMS: Cloud Engineer Handoff Document

## 1. Project Overview
**Lumora** is a custom Content Management System (CMS) and social image-sharing platform. We have recently completed the core full-stack integration. 
- **Frontend:** Vanilla HTML/CSS/JS (Dynamic DOM manipulation via `lumora-api.js`).
- **Backend:** Node.js / Express.js API.
- **Database:** MySQL 8.0 (Schema fully applied and connected).

## 2. Current State & Completed Milestones
- **Database:** The local in-memory demo data has been completely stripped out. The application is now successfully reading and writing to a live MySQL database.
- **Authentication:** JWT-based user signup and login are fully operational.
- **Feed Rendering:** The frontend dynamically fetches and renders images from the backend API.
- **Local Uploads (The Problem):** Currently, when a user uploads an image, the backend uses `multer` (DiskStorage) to save the raw image file to the local `backend/uploads/` directory, and serves it statically. 

## 3. Your Task: Cloud Storage Integration
We need you to migrate the image upload pipeline from **local disk storage** to a **cloud storage provider** (e.g., AWS S3, Cloudinary, or Google Cloud Storage). The MySQL database should continue storing the metadata and the resulting public Image URLs.

### 4. Files You Need to Modify

#### A. `backend/src/middleware/uploadMiddleware.js`
This file currently uses `multer.diskStorage`. You will need to replace this with your cloud provider's multer engine (e.g., `multer-s3` or `multer-storage-cloudinary`).
*   **Action:** Install the necessary AWS/Cloudinary SDKs, configure authentication, and export the updated `uploadImage` multer middleware.

#### B. `backend/src/services/imageService.js`
Currently, this service takes the local file path and converts it to a localhost URL:
```javascript
const fileToPublicUrl = (file) => {
  const relative = path.relative(process.cwd(), file.path).replace(/\\/g, "/");
  return `${env.apiBaseUrl}/${relative}`;
};
```
*   **Action:** Update the `createUploadedImage` function. When using cloud-based multer, `req.file.location` (for S3) or `req.file.path` (for Cloudinary) will already contain the fully resolved public cloud URL. You can remove `fileToPublicUrl` entirely and just pass the cloud URL directly into the MySQL database insert block.

#### C. `backend/.env` & `backend/src/config/env.js`
*   **Action:** Add the necessary cloud provider credentials (e.g., `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `S3_BUCKET_NAME`). Parse these in `env.js` so they are safely accessible across the app.

## 5. Security & CSP Considerations
We are using `helmet` for security. The Content Security Policy (CSP) is configured in `backend/src/app.js`.
*   **Action:** If you use a custom S3 bucket URL, you must add the new domain to the `img-src` directive in `app.js`, otherwise the browser will block the cloud images from loading on the frontend.

---
*Feel free to review the `package.json` for current dependencies, and run `npm run dev` in the backend folder to start the local testing server.*
