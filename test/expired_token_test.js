import sinon from 'sinon';
import { expect } from 'chai';
import expiredToken from '../src/expired_token';
import Client from '../src/client';

describe('expiredToken', () => {
  it('refreshes token', () => {
    const apiBase = 'http://jsonip.com';
    const logger = console;
    const token = 'test';
    const secret = 'test';
    const client = new Client({ apiBase, secret, logger, token });

    const [success, error] = expiredToken(client);
    expect(error({ status: 401 })).to.equal(1);
  });
});
