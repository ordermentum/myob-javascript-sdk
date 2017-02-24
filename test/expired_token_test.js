import sinon from 'sinon';
import { expect } from 'chai';
import axios from 'axios';
import expiredToken from '../src/interceptors/expired_token';

describe('expiredToken', () => {
  it('refreshes token', () => {
    const instance = axios.create();
    expiredToken(instance);
  });
});
