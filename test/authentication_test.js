import sinon from 'sinon';
import { expect } from 'chai';
import { getAccessCodeUri, getToken } from '../src/authentication';

describe('authentication', () => {
  describe('getAccessCodeUri', () => {
    it('works', () => {
      getAccessCodeUri();
    });
  });

  describe('getToken', () => {
    it('works', () => {
      getToken();
    });
  });
});
