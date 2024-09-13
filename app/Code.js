const sheetId = '10MVBiSSPJW212lJvRyLLbKdZHdWU6X595sDDEi__QBE';
function doGet() {
  return HtmlService
    .createTemplateFromFile('index')
    
    .evaluate()
    .addMetaTag("viewport", "width=device-width, initial-scale=1.0");
}

function getData() {

  return SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName('Data')
    .getDataRange()
    .getValues();
}


function filterRows(searchValue) {
  const data = getData();
  const headers = data[0];
  // Filter rows based on the search value  
  const filteredRows = data.filter(row => {
    return row[2] == searchValue || row[3] == searchValue;
  })
    .reduce(rows => rows[0]);

  return JSON.stringify(func(headers, filteredRows));
}

function func(arr1, arr2) {
  const obj = {};
  arr1.forEach((Curr_element, index) => {
    obj[Curr_element] = arr2[index]
  })
  return obj;
};

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent();
}

function getDetails() {
  const details = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName('Options')
    .getRange('B1:B2')
    .getValues();

  return { "year": details[0], "month": details[1] };
}