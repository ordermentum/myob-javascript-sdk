import axios from 'axios';

import rateLimit from './interceptors/rate_limit';
import expiredToken from './interceptors/expired_token';
import authentication from './authentication';

const pack = require('../package');

export default class Client {
  constructor({ clientId,
                secret,
                token = { }, logger, callback = () => {}, username, password,
                timeout = 5000, apiBase = 'https://api.myob.com/accountright/' }) {
    this.apiBase = apiBase;
    this.token = token;
    this.logger = logger;
    this.callback = callback;
    this.adapter = axios;
    this.username = username;
    this.password = password;
    this.clientId = clientId;
    this.secret = secret;
    this.timeout = timeout;
    this.callback = callback;
    this.instance = this.getInstance(false);
  }

  getInstance(root) {
    this.logger.info('Request Headers', this.getHeaders(root));

    const instance = this.adapter.create({
      baseURL: this.apiBase,
      timeout: this.timeout,
      responseType: 'json',
      headers: this.getHeaders(root),
    });

    rateLimit(instance, 5);
    expiredToken(instance, this, 2);
    return instance;
  }

  getHeaders(root = false) {
    const headers = {
      'x-myobapi-key': this.clientId,
      'x-myobapi-version': 'v2',
      'User-Agent': `Ordermentum MYOB Client ${pack.version}`,
      Authorization: `Bearer ${this.token.access_token}`,
    };

    if (!root) {
      headers['x-myobapi-cftoken'] = this.getUserToken();
    }

    return headers;
  }

  get authentication() {
    return authentication(this.clientId, this.secret, this.logger);
  }

  getCompanyFiles() {
    return this.getInstance(true)
               .get('https://api.myob.com/accountright/')
               .then(response => response.data);
  }

  getUserToken() {
    return new Buffer(`${this.username}:${this.password}`)
                    .toString('base64');
  }

  get(...args) {
    return this.instance.get(...args)
    .then(r => r.data);
  }

  post(...args) {
    return this.instance.post(...args)
    .then(r => r.data);
  }

  patch(...args) {
    return this.instance.patch(...args)
    .then(r => r.data);
  }

  put(...args) {
    return this.instance.put(...args)
    .then(r => r.data);
  }

  delete(...args) {
    return this.instance.delete(...args)
    .then(r => r.data);
  }
}
