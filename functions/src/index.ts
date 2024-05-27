/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

//import {onRequest} from "firebase-functions/v2/https";
//import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { google } from "googleapis";
import * as dotenv from "dotenv";
dotenv.config();

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const SPREADSHEET_ID = functions.config().spreadsheet.id as string;

// Google workspace/sheets auth
async function authorize() {
  const privateKey = functions
    .config()
    .googleapi.private_key.replace(/\\n/g, "\n");
  const clientEmail = functions.config().googleapi.client_email;

  const auth = new google.auth.GoogleAuth({
    credentials: {
      private_key: privateKey,
      client_email: clientEmail,
    },
    scopes: SCOPES,
  });

  return await auth;
}

async function updateSheet(rsvps: { confirmed: string[]; denied: string[] }) {
  try {
    const googleAuth = await authorize();
    const sheets = google.sheets({ version: "v4", auth: googleAuth });

    // google sheets API expects a two dimenional arrays
    const confirmed = rsvps.confirmed.map((name) => [name]);
    const denied = rsvps.denied.map((name) => [name]);

    const maxLength = Math.max(confirmed.length, denied.length);

    const rows = Array.from({ length: maxLength }, (_, i) => [
      confirmed[i] ? confirmed[i][0] : "",
      denied[i] ? denied[i][0] : "",
    ]);

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `A1`, // refers to the position in the sheets
      valueInputOption: "RAW",
      requestBody: {
        values: [["Confirmed", "Denied"], ...rows],
      },
    });
  } catch (error) {
    console.error("Error updating sheets", error);
  }
}

export const updateRSVPs = functions.firestore
  .document("rsvp/rsvp")
  .onWrite(async (change, context) => {
    const rsvps: any = change.after.exists ? change.after.data() : null;

    console.log("RSVP docs", rsvps);
    if (rsvps) {
      await updateSheet(rsvps);
    }
  });
