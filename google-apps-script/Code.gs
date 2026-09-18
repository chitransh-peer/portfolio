/**
 * Google Apps Script web app that receives contact-form submissions from
 * /api/contact and appends them to this spreadsheet.
 *
 * This file is NOT part of the Next.js build — it is kept here as the
 * source of truth for what is deployed inside the Google Sheet. Paste it
 * into Extensions → Apps Script and redeploy after any edit.
 *
 * Setup is documented in the project README.
 */

// The name of the TAB at the bottom of the spreadsheet — not the
// spreadsheet's filename. Created automatically if it doesn't exist.
var SHEET_NAME = 'Submissions';

// Order must match the appendRow call in doPost.
var HEADERS = ['Timestamp', 'Name', 'Email', 'Company', 'Service', 'Message'];

// Must match GOOGLE_SHEETS_SECRET in the Next.js environment. Replace this
// with a long random string before deploying.
var SECRET = 'REPLACE_WITH_A_LONG_RANDOM_STRING';

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json({ ok: false, error: 'empty request' });
    }

    var body = JSON.parse(e.postData.contents);

    // The secret never reaches the browser — only the Next.js server knows
    // it — so anyone who finds this URL still cannot write rows.
    if (body.secret !== SECRET) {
      return json({ ok: false, error: 'unauthorized' });
    }

    var sheet = getOrCreateSheet();

    // Column order must match the sheet's header row:
    // Timestamp | Name | Email | Company | Service | Message
    sheet.appendRow([
      new Date(),
      body.name || '',
      body.email || '',
      body.company || '',
      body.service || '',
      body.message || ''
    ]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

/**
 * Returns the submissions tab, creating it with a header row if it isn't
 * there. Setting this up by hand is the easiest step to get wrong — the
 * tab name is not the spreadsheet's filename — so the script does it.
 *
 * An existing non-empty tab is left completely alone: its headers may not
 * match HEADERS, but rewriting row 1 over someone's data is worse than a
 * mismatch they can see and fix.
 */
function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function json(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
