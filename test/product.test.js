const { diffbot, expect, customJS, customHeaders } = require('./global');

describe('Product Tests', function() {

  const url = 'https://four-all-ice-creame.myshopify.com/collections/ice-cream-cubes-individual/products/ice-cream-cubes-individual';

  it('should generate the product GET request', async () => {
    const fields = ['links','meta'];
    const discussion = false;
    const timeout = 60000;
    const callback = 'callbackFn';
    const proxy = '168.212.226.204';
    const proxyAuth = 'username:password';

    const request = await diffbot.product({ url, fields, discussion, timeout, callback, proxy, proxyAuth });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/product?token=${diffbot.token}&url=${encodeURIComponent(url)}&fields=${fields.join(',')}&discussion=${discussion}&timeout=${timeout}&callback=${callback}&proxy=${proxy}&proxyAuth=${proxyAuth}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object').that.is.empty;

    return Promise.resolve(true);
  });

  it('should generate the product GET request with the specified fields', async () => {
    const fields = ['links', 'meta'];

    const request = await diffbot.product({ url, fields });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/product?token=${diffbot.token}&url=${encodeURIComponent(url)}&fields=${fields.join(',')}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object').that.is.empty;

    return Promise.resolve(true);
  });

  it('should generate the product GET request with custom headers', async () => {
    let request = await diffbot.product({ url, customJS, customHeaders });

    expect(request.url).to.equal(`https://api.diffbot.com/v3/product?token=${diffbot.token}&url=${encodeURIComponent(url)}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object');
    expect(request.headers['X-Forward-X-Evaluate']).to.equal(customJS.replace(/(\r?\n|\r)\s+/g, ''));
    expect(request.headers['X-Forward-User-Agent']).to.equal(customHeaders['User-Agent']);

    return Promise.resolve(true);
  });

  it('should error on no url', async () => {
    expect(() => {
      return diffbot.product({});
    }).to.throw('missing url');

    return Promise.resolve(true);
  });
});
