# diffbot-api-node

[![npm](https://img.shields.io/npm/v/diffbot-api-node.svg)](https://www.npmjs.com/package/diffbot-api-node)
![npm bundle size](https://img.shields.io/bundlephobia/min/diffbot-api-node)
![npm license](https://img.shields.io/npm/l/diffbot-api-node)
[![codecov](https://codecov.io/gh/theRealPadster/diffbot-api-node/branch/master/graph/badge.svg)](https://codecov.io/gh/theRealPadster/diffbot-api-node)
![github last commit](https://img.shields.io/github/last-commit/therealpadster/diffbot-api-node)
[![Build Status](https://travis-ci.com/theRealPadster/diffbot-api-node.svg?branch=master)](https://travis-ci.com/theRealPadster/diffbot-api-node)

Diffbot-API-Node is a Promise-based library to use the [Diffbot](https://www.diffbot.com/) REST APIs.

## Features

Currently supports the following features:
* [Analyze](#analyze-api) (with HTML POST support)
* [Article](#article-api) (with HTML and plaintext POST support)
* [Discussion](#discussion-api) (with HTML POST support)
* [Event](#event-api-beta) (beta) (with HTML POST support)
* [Image](#image-api) (with HTML POST support)
* [Product](#product-api) (with HTML POST support)
* [Video](#video-api) (with HTML POST support)
* [Knowledge Graph](#knowledge-graph-api)
* [Crawl](#crawl-api)
  * New (all params supported except `customHeaders`)
  * Get (retrieve crawl job results)
  * Details (retrieve crawl job details)
  * Pause
  * Resume
  * Restart
  * Delete
* [Search](#search-api)
* [Account](#account-api)

## Install
```bash
npm install diffbot-api-node
```

## Usage

```javascript
const Diffbot = require('diffbot-api-node')
const diffbot = new Diffbot('your-api-key-goes-here');
```

### Analyze API
Diffbot documentation: https://www.diffbot.com/dev/docs/analyze/
```javascript
  let analyze = await diffbot.analyze({
    url: 'https://four-all-ice-creame.myshopify.com/collections/ice-cream-cubes-individual/products/ice-cream-cubes-individual',
    body: 'optional-html-post-body',
  });
  console.log(analyze.humanLanguage);
  console.log(analyze.title);
  console.log(analyze.type);
  console.log(analyze.objects);
```

### Article API
Diffbot documentation: https://www.diffbot.com/dev/docs/article/
Note: `url` is optional if including plaintext POST body
```javascript
  let article = await diffbot.article({
    url: 'https://www.theverge.com/2020/8/25/21400240/epic-apple-ruling-unreal-engine-fortnite-temporary-restraining-order',
    body: 'optional-html-or-plaintext-post-body',
  });
  console.log(article.objects[0].authors);
  console.log(article.objects[0].publisherRegion);
  console.log(article.objects[0].tags);
```

### Discussion API
Diffbot documentation: https://www.diffbot.com/dev/docs/discussion/
```javascript
  let discussion = await diffbot.discussion({
    url: 'https://www.theverge.com/2020/8/25/21400240/epic-apple-ruling-unreal-engine-fortnite-temporary-restraining-order',
    body: 'optional-html-post-body',
  });
  console.log(discussion.objects[0].title);
  console.log(discussion.objects[0].posts);
  console.log(discussion.objects[0].participants);
  console.log(discussion.objects[0].sentiment);
```

### Event API (beta)
Diffbot documentation: https://docs.diffbot.com/docs/en/api-event
```javascript
  let evt = await diffbot.event({
    url: 'https://www.eventbrite.ca/e/relit-2020-bring-your-brave-tickets-109259768910',
    proxy: '168.212.226.204',
    body: 'optional-html-post-body',
  });
  console.log(evt.objects[0].venue);
  console.log(evt.objects[0].description);
```

### Image API
Diffbot documentation: https://www.diffbot.com/dev/docs/image/
```javascript
  let image = await diffbot.image({
    url: 'https://www.deviantart.com/up-tchi/art/Coral-village-852927725',
    body: 'optional-html-post-body',
  });
  console.log(image.objects[0].title);
  console.log(image.objects[0].url);
  console.log(image.objects[0].naturalHeight);
```

### Product API
Diffbot documentation: https://www.diffbot.com/dev/docs/product/
```javascript
  let product = await diffbot.product({
    url: 'https://www.amazon.com/Resistance-Avalon-Social-Deduction-Game/dp/B009SAAV0C',
    body: 'optional-html-post-body',
  });
  console.log(product.objects);
```

### Video API
Diffbot documentation: https://www.diffbot.com/dev/docs/video/
```javascript
  let video = await diffbot.video({
    url: 'https://www.youtube.com/watch?v=HeiPdaTQTfo',
    body: 'optional-html-post-body',
  });
  console.log(video.objects[0].title);
  console.log(video.objects[0].html);
```

### Knowledge Graph API
Diffbot documentation: https://docs.diffbot.com/kgapi
```javascript
  let kg = await diffbot.knowledgeGraph({
    query: 'type:LocalBusiness location.{country.name:"Canada" city.name:"Ottawa" isCurrent:true}'
  });
  console.log(kg.hits);
  console.log(kg.data);
```

### Crawl API
Diffbot documentation: https://www.diffbot.com/dev/docs/crawl/api.jsp
```javascript
  // Crawl (new)
  let crawl = await diffbot.crawl().new({
    name: 'my-diffbot-crawl',
    seeds: [
      'https://www.cruisebar.com.au/',
      'https://www.sydneyharbourdinnercruises.com.au/',
    ],
  });
  console.log(crawl.response);
  console.log(crawl.jobs);

  // Crawl (get)
  let crawlData = await diffbot.crawl().get({
    name: 'my-diffbot-crawl',
  });
  console.log(crawlData);

  // Crawl (details)
  let crawlDetails = await diffbot.crawl().details({
    name: 'my-diffbot-crawl',
  });
  console.log(crawlDetails.jobs);

  // Crawl (pause)
  let crawlPause = await diffbot.crawl().pause({
    name: 'my-diffbot-crawl',
  });
  console.log(crawlPause);

  // Crawl (resume)
  let crawlResume = await diffbot.crawl().resume({
    name: 'my-diffbot-crawl',
  });
  console.log(crawlResume);

  // Crawl (restart)
  let crawlRestart = await diffbot.crawl().restart({
    name: 'my-diffbot-crawl',
  });
  console.log(crawlRestart);

  // Crawl (delete)
  let crawlDeletion = await diffbot.crawl().delete({
    name: 'my-diffbot-crawl',
  });
  console.log(crawlDeletion);
```

### Search API
Diffbot documentation: https://www.diffbot.com/dev/docs/search/
```javascript
  let search = await diffbot.search({
    name: 'my-diffbot-crawl',
    query: 'type:product',
  });
  console.log(article.objects[0].title);
  console.log(article.objects[0].pageUrl);
```

### Account API
Diffbot documentation: https://docs.diffbot.com/docs/en/api-account
```javascript
  let account = await diffbot.account({
    days: 60,
    invoices: true,
  });
  console.log(account.plan);
  console.log(account.usage);
```

## Testing

The test suite verifies that the requests generated are accurate, as per the docs, without actually making any API calls. The only requests executed are sample calls made to [example.com](https://example.com) and [JSONPlaceholder](https://jsonplaceholder.typicode.com).

By not executing the actual Diffbot API calls, it preserves any API call limits, allows the test suite to run much faster, and ensures that development is possible without needing to have a valid Diffbot API key.

To run the test suite, just run `npm test`.
