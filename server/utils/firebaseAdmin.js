import admin from "firebase-admin";
import fs from "fs";
import path from "path";

// Path to your Firebase service account key
const serviceAccountPath = path.resolve(
  "firebaseServiceAccountKey.json"
);

// Read service account
const serviceAccount = JSON.parse(
  fs.readFileSync(serviceAccountPath, "utf8")
);

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export default admin;
