# faceshift-app

Repository generated for FaceShift.AI — ready to deploy to Render via GitHub.

Quickstart:
1. Create a GitHub repo named `faceshift-app` and push this content.
2. On Render, create a new Web Service, connect your GitHub repo and deploy (Node).
3. Set environment variables in Render: MONGODB_URI, JWT_SECRET, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET.

This repo contains a minimal Express backend with:
- Auth (register / login with JWT)
- File upload endpoint for face processing (placeholder)
- Stripe checkout endpoint
- Dockerfile and render.yaml for 1-click deploy
