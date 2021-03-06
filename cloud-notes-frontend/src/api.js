
function getClasses(callback) {
  // var BASE_API = "https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/
  // https://itunes.apple.com/search?term=NWA&entity=album

  var BASE_URL = null || 'http://localhost:3001';
  var REQUEST_URL = "/api/classes";
  fetch(REQUEST_URL)
    .then(function(response) {
      return response.json();
    })
    .then(function(parsed_json) {
      console.log(parsed_json);
      callback(parsed_json.data);
    })
    .catch(function(err) {
      console.error(err);
    });
}

function getNotesForClass(classId, callback) {
  var BASE_URL = null || 'http://localhost:3001';
  var REQUEST_URL = "/api/notes?category=" + classId;
  console.log(classId);
  console.log(REQUEST_URL);
  fetch(REQUEST_URL)
    .then(function(response) {
      return response.json();
    })
    .then(function(parsed_json) {
      callback(parsed_json.data);
    })
    .catch(function(err) {
      console.error(err);
    });
}

export { getClasses, getNotesForClass };
