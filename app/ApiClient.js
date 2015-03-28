
var BASE = 'http://192.168.2.128:3000/api';

class Api {

  get(path) {
    return fetch(`${BASE}/${path}`).then((response) => response.json())
  }

}

module.exports = new Api();