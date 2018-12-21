// public api
let DataService = {
  // properties
  isFetching: false,
  // methods
  fetch: fetch
};
export default DataService;


// public methods definitions
function fetch(url) {
  DataService.isFetching = true;

  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.onload = onRequestCompleted;
    request.onerror = onRequestFailed;
    request.open('GET', url, true);
    request.send();

    function onRequestCompleted() {
      let json = JSON.parse(this.responseText);
      resolve(json);
    }

    function onRequestFailed(error) {
      reject(error);
    }
  });
}
