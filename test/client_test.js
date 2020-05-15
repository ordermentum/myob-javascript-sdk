import sinon from 'sinon';
import { expect } from 'chai';
import Client from '../src/client';
import { createClient } from '../src';

describe('Client', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('return an instance', async () => {
    const apiBase = 'https://api.myob.com';
    const logger = console;
    const token = { accessToken: 'test' };
    const callback = (token) => { };
    const secret = 'test';
    const clientId = 'test';
    const client = new Client({ apiBase, callback, secret, clientId, logger, token });
    expect(client.token).to.equal(token);
    expect(client.logger).to.equal(logger);
    expect(client.callback).to.equal(callback);
    expect(client.apiBase).to.equal(apiBase);
  });

  it('http methods', async () => {
    const apiBase = 'http://100.59.95.32:9999/AccountRight/DA29BE38-C480-40F4-8CD1-E3700CDA28EC';
    const username = 'administrator';
    const password = 'test';
    const client = new Client({ username, password, apiBase });
    const instance = {
      post: sandbox.stub(),
      get: sandbox.stub(),
      patch: sandbox.stub(),
      put: sandbox.stub(),
      delete: sandbox.stub(),
    };
    client.instance = instance;
    instance.post.resolves({ data: 'DATA' });
    let data = await client.post('/');
    expect(data).to.equal('DATA');
    expect(instance.post.calledOnce).to.equal(true);

    instance.get.resolves({ data: 'DATA' });
    data = await client.get('/');
    expect(data).to.equal('DATA');

    instance.delete.resolves({ data: 'DATA' });
    data = await client.delete('/');
    expect(data).to.equal('DATA');

    instance.patch.resolves({ data: 'DATA' });
    data = await client.patch('/');
    expect(data).to.equal('DATA');

    instance.put.resolves({ data: 'DATA' });
    data = await client.put('/');
    expect(data).to.equal('DATA');
  });

  it('createClient', async () => {
    const apiBase = 'https://api.myob.com';
    const logger = console;
    const token = { accessToken: 'test' };
    const callback = (token) => { };
    const secret = 'test';
    const clientId = 'test';
    const client = createClient({ apiBase, callback, secret, clientId, logger, token });
    expect(client.callback).to.equal(callback);
  });

  it('hosted', async () => {
    const apiBase = 'http://100.59.95.32:9999/AccountRight/DA29BE38-C480-40F4-8CD1-E3700CDA28EC';
    const logger = console;
    const username = 'administrator';
    const password = 'test';
    const client = new Client({ username, password, apiBase, logger });
    expect(client.token).to.deep.equal({});
    expect(client.clientId).to.equal(null);
    expect(client.authentication).to.equal(null);
    expect(client.apiBase).to.equal(apiBase);
    expect(Object.keys(client.getHeaders())).to.not.include('x-myobapi-key');
    expect(Object.keys(client.getHeaders(true))).to.not.include('x-myobapi-cftoken');
  });

  it('unwraps data', async function () {
    this.timeout(10000);
    const apiBase = 'http://jsonip.com';
    const logger = console;
    const token = { accessToken: 'test' };
    const secret = 'test';
    const clientId = 'test';
    const client = new Client({ apiBase, clientId, secret, logger, token });
    const data = await client.get('');
    expect(data.ip).to.not.equal(null);
    expect(data.status).to.not.equal(null);
  });

  it('throws on errors', async function () {
    this.timeout(10000);
    const apiBase = 'http://httpstat.us';
    const logger = console;
    const token = { accessToken: 'test' };
    const secret = 'test';
    const clientId = 'test';
    const client = new Client({ apiBase, clientId, secret, logger, token });

    let thrown = false;

    try {
      await client.get('500');
    } catch (e) {
      thrown = true;
      expect(e.response.status).to.equal(500);
      expect(e.response.statusText).to.equal('Internal Server Error');
    }

    expect(thrown).to.equal(true);
  });
});
