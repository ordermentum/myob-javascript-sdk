import sinon from 'sinon';
import { expect } from 'chai';
import authentication from '../src/authentication';

const FAKE_INSTANCE = {
  accessToken: {
    create() {
      return { refresh() { return Promise.resolve({ result: { token: {} } }); } };
    },
  },
  authorizationCode: {
    authorizeURL() { return 'TEST'; },
    getToken() { return Promise.resolve({}); },
  },
};

describe('authentication', () => {
  let sandbox = null;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getAccessCodeUri', () => {
    it('works', () => {
      const clientId = 'test';
      const secret = 'test';
      const auth = authentication(clientId, secret);
      sandbox.stub(auth, 'instance', FAKE_INSTANCE);
      expect(auth.getAccessCodeUri()).to.equal('TEST');
    });
  });

  describe('refresh', () => {
    it('works', () => {
      const clientId = 'test';
      const secret = 'test';
      const auth = authentication(clientId, secret);
      const token = { accessToken: '123', refreshToken: '123' };
      sandbox.stub(auth, 'instance', FAKE_INSTANCE);
      expect(auth.refresh(token)).to.not.equal(null);
    });
  });

  describe('getAccessCodeUri', () => {
    it('works', () => {
      const clientId = 'test';
      const secret = 'test';
      const auth = authentication(clientId, secret);
      sandbox.stub(auth, 'instance', FAKE_INSTANCE);
      expect(auth.getAccessCodeUri('https://www.google.com')).to.not.equal(null);
    });
  });
});
