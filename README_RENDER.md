# Deploying to Render (one-click via GitHub)

1. Create a GitHub repo named `faceshift-app` and push this code.
2. Sign into Render (https://render.com) and create a new Web Service.
3. Choose "Connect a repository", select `faceshift-app`.
4. In Render service settings, set Environment -> Environment Variables:
   - MONGODB_URI (use MongoDB Atlas free tier or Render's managed DB)
   - JWT_SECRET
   - STRIPE_SECRET_KEY
   - STRIPE_WEBHOOK_SECRET
   - SUCCESS_URL, CANCEL_URL
5. Deploy. Render will build and expose a public https URL (your-app.onrender.com).
