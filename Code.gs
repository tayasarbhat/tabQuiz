// Google Apps Script code
function doGet(e) {
  const sheet = e.parameter.sheet || 'Sheet1';
  const questions = getQuestionsFromSheet(sheet);
  
  return ContentService.createTextOutput(JSON.stringify({
    questions: questions
  })).setMimeType(ContentService.MimeType.JSON);
}

function getQuestionsFromSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    return [];
  }

  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const questions = [];

  // Skip header row
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[0]) continue; // Skip empty rows
    
    const options = [row[1], row[2], row[3], row[4]].filter(Boolean); // Get non-empty options
    
    questions.push({
      question: row[0],
      options: options,
      answer: parseInt(row[5]) - 1, // Convert 1-based to 0-based index
      explanation: row[6] || ''
    });
  }

  return questions;
}

// Optional: Add function to validate spreadsheet structure
function validateSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    throw new Error(`Sheet "${sheetName}" not found`);
  }

  const headers = sheet.getRange(1, 1, 1, 7).getValues()[0];
  const expectedHeaders = [
    'Question',
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Correct Answer (1-4)',
    'Explanation'
  ];

  const missingHeaders = expectedHeaders.filter((header, index) => 
    headers[index] !== header
  );

  if (missingHeaders.length > 0) {
    throw new Error(`Missing or incorrect headers: ${missingHeaders.join(', ')}`);
  }
}

// Optional: Add function to test the API
function testAPI() {
  const sheets = ['Sheet1', 'Sheet2', 'Sheet3', 'Sheet4'];
  
  sheets.forEach(sheet => {
    try {
      validateSheet(sheet);
      const questions = getQuestionsFromSheet(sheet);
      Logger.log(`${sheet}: Found ${questions.length} questions`);
    } catch (error) {
      Logger.log(`Error in ${sheet}: ${error.message}`);
    }
  });
}