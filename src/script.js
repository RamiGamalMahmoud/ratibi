function processData(data) {
  
    var obj = JSON.parse(data);
    
    var resultsElement = document.getElementById('results');
    resultsElement.innerHTML = '';

    for (const key in obj) {
      console.log(`${key}: ${obj[key]}`);
      resultsElement.innerHTML += `<div class="detail"><span class="label">${key}</span><span class="value">${obj[key]}</span></div>`;
    }

  }

  function onFail(err) {
    alert('لا يوجد بيانات لهذا الرقم');
  }

  function search() {
    const searchTerm = document.getElementById('searchTerm').value;

    if(searchTerm.length === 0) {
      alert("إدخال غير صالح");
      return;
    }

    google
      .script
      .run
      .withSuccessHandler(processData)
      .withFailureHandler(onFail)
      .filterRows(searchTerm);
  }