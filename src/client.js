import axios from 'axios';
import NULL_LOGGER from 'null-logger';

import rateLimit from './interceptors/rate_limit';
import expiredToken from './interceptors/expired_token';
import timeoutInterceptor from './interceptors/axios_timeout';
import authentication from './authentication';

const pack = require('../package');

const MYOB_BASE = 'https://api.myob.com/accountright/';

// FIXME: /info is on the root of the host
// we really need both apiBase and companyFileUrl

export default class Client {
  constructor({ clientId = null,
                secret = null,
                token = {}, logger = NULL_LOGGER, callback = async () => {}, username, password,
                timeout = 5000, apiBase = MYOB_BASE }) {
    this.apiBase = apiBase;
    this.token = token || {};
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
    const headers = this.getHeaders(root);
    this.logger.info('Request Headers', headers);

    const instance = this.adapter.create({
      baseURL: this.apiBase,
      timeout: this.timeout,
      responseType: 'json',
      headers: headers,
    });

    rateLimit(instance, 5);

    if (this.clientId) {
      expiredToken(instance, this, 2);
      timeoutInterceptor(instance);
    }

    return instance;
  }

  getHeaders(root = false) {
    const headers = {
      'x-myobapi-version': 'v2',
      'User-Agent': `Ordermentum MYOB Client ${pack.version}`,
    };

    if (this.clientId) {
      headers['x-myobapi-key'] = this.clientId;
      headers.Authorization = `Bearer ${this.token.access_token}`;
    }

    if (!root) {
      headers['x-myobapi-cftoken'] = this.getUserToken();
    }

    return headers;
  }

  get authentication() {
    if (!this.clientId) {
      return null;
    }

    return authentication(this.clientId, this.secret, this.logger);
  }

  getCompanyFiles() {
    return this.getInstance(true)
               .get(this.apiBase)
               .then(response => response.data);
  }

  getInfo() {
    return this.getInstance(true)
               .get('/info')
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
