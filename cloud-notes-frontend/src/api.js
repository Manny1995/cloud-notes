
function getClasses(callback) {
  // var BASE_API = "https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/
  // https://itunes.apple.com/search?term=NWA&entity=album

  var REQUEST_URL = "http://localhost:3001/api/classes";
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


export { getClasses };