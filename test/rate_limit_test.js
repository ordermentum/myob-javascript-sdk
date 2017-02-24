import sinon from 'sinon';
import { expect } from 'chai';
import axios from 'axios';
import rateLimit from '../src/interceptors/rate_limit';

describe('rateLimit', () => {
  it('works', () => {
    const instance = axios.create();
    rateLimit(instance);
  });
});
