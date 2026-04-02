/**
 * Google Apps Script - Webhook for CartoonTranslator
 *
 * SETUP:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste this code
 * 4. Deploy as Web App (Execute as: Me, Access: Anyone)
 * 5. Copy the deployment URL and set it as NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Source Language',
        'Target Language',
        'Page Count',
        'Text Blocks',
        'User Agent',
        'Referrer'
      ]);
      // Bold the header row
      sheet.getRange(1, 1, 1, 7).setFontWeight('bold');
    }

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.source_lang || '',
      data.target_lang || '',
      data.page_count || 0,
      data.text_count || 0,
      data.user_agent || '',
      data.referrer || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'CartoonTranslator webhook is active' }))
    .setMimeType(ContentService.MimeType.JSON);
}
