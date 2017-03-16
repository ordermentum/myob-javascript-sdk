import sinon from 'sinon';
import { expect } from 'chai';
import expiredToken from '../src/interceptors/expired_token';

describe('expiredToken', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('refreshes token', async () => {
    let method = null;
    let check = null;
    const axios = (config) => {
      check = config;
    };
    axios.interceptors = {
      response: {
        use(resolve, reject) {
          method = reject;
        },
      },
    };

    const client = {
      logger: console,
      token: {},
      callback() {
        return Promise.resolve();
      },
      authentication: {
        refresh() {
          return Promise.resolve({
            access_token: '1234',
          });
        },
      },
    };

    const error = {
      code: {

      },
      response: {
        status: 401,
      },
      data: {
      },
      config: {
        method: 'GET',
        headers: {},
      },
    };

    expiredToken(axios, client);
    expect(method).to.not.equal(null);
    let err = null;
    try {
      await method(error);
    } catch (e) {
      err = e;
    }
    expect(check).to.not.equal(null);
    expect(err).to.be.equal(null);
  });
});
