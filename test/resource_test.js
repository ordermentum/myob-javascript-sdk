import sinon from 'sinon';
import { expect } from 'chai';
import resource from '../src/resources/resource';
import NULL_LOGGER from '../src/logger';

const FAKE_CLIENT = {
  post() {},
  patch() {},
  put() {},
  get() {},
  logger: NULL_LOGGER,
};

describe('resource', () => {
  const path = '/v1/cats';
  const instance = resource(path, 'Cat');
  const cats = instance(FAKE_CLIENT);

  it('return an instance', () => {
    expect(cats.path).to.equal(path);
    expect(cats.client).to.equal(FAKE_CLIENT);
  });

  it('findAll', async () => {
    const cat = { name: 'droppo' };
    const getStub = sinon.stub(FAKE_CLIENT, 'get')
                         .returns(new Promise(resolve => resolve({ Cat: [cat] })));
    await cats.findAll({ species: 'tiger' });
    expect(getStub.called).to.be.equal(true);
    getStub.restore();
  });

  it('findOne', async () => {
    const cat = { name: 'droppo' };
    const getStub = sinon.stub(FAKE_CLIENT, 'get')
                         .returns(new Promise(resolve => resolve({ Cat: [cat] })));
    const response = await cats.findOne({ filter: 'DisplayName eq\'tiger\'' });
    expect(getStub.called).to.be.equal(true);
    expect(response).to.deep.equal(cat);
    getStub.restore();
  });

  it('create', async () => {
    const cat = { name: 'droppo' };
    const postStub = sinon.stub(FAKE_CLIENT, 'post')
                         .returns(new Promise(resolve => resolve(cat)));
    const response = await cats.create(cat);
    expect(postStub.called).to.be.equal(true);
    expect(response).to.deep.equal(cat);
    postStub.restore();
  });

  it('update', async () => {
    const cat = { name: 'droppo' };
    const putStub = sinon.stub(FAKE_CLIENT, 'put')
                         .returns(new Promise(resolve => resolve(cat)));
    const response = await cats.update(cat);
    expect(putStub.called).to.be.equal(true);
    expect(response).to.deep.equal(cat);
    putStub.restore();
  });
});
