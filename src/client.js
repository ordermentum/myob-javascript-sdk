import axios from 'axios';

import rateLimit from './rate_limit';
import expiredToken from './expired_token';

const pack = require('../package');

export default class Client {
  constructor({ clientId,
                secret,
                token, refreshToken, logger, callback, username, password,
                timeout = 3000, apiBase = 'https://api.myob.com/accountright/' }) {
    this.apiBase = apiBase;
    this.token = token;
    this.logger = logger;
    this.callback = callback;
    this.adapter = axios;
    this.username = username;
    this.password = password;
    this.clientId = clientId;
    this.secret = secret;
    this.refreshToken = refreshToken;
    this.timeout = timeout;
    this.instance = this.getInstance();
  }

  getInstance() {
    this.logger.trace('Request Headers', this.getHeaders());

    const instance = this.adapter.create({
      baseURL: this.apiBase,
      timeout: this.timeout,
      responseType: 'json',
      headers: this.getHeaders(),
    });

    rateLimit(instance, 5);
    expiredToken(instance, this);
    return instance;
  }

  getHeaders() {
    return {
      'x-myobapi-key': this.secret,
      'x-myobapi-version': 'v2',
      'x-myobapi-cftoken': this.getUserToken(),
      'User-Agent': `Ordermentum MYOB Client ${pack.version}`,
      Authorization: `Bearer ${this.token}`,
    };
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
