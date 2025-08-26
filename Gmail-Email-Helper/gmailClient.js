import * as dotenv from "dotenv";
dotenv.config();
import { google } from "googleapis";


export function createGmailClient() {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
  );

  oAuth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });

  console.log("✅ Gmail OAuth client created successfully");

  return google.gmail({ version: "v1", auth: oAuth2Client });
}