const fs = require('fs');

// Check if a full FIREBASE_CONFIG JSON string is provided in environment variables
let configStr = process.env.FIREBASE_CONFIG;

if (!configStr) {
  // Otherwise check for individual environment variables
  const config = {
    apiKey: process.env.FIREBASE_API_KEY || "",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.FIREBASE_APP_ID || "",
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || ""
  };
  configStr = JSON.stringify(config, null, 2);
}

const fileContent = `/**
 * Generated dynamically during Vercel build
 */
const FIREBASE_CONFIG = ${configStr};
`;

fs.writeFileSync('env.js', fileContent, 'utf8');
console.log('✅ env.js generated successfully for deployment.');
