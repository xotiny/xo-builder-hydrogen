# Hydrogen template: Demo Store

## Getting started

```bash
npm i @xotiny/xb-react-elements@latest
```

## Modify the files for integration

### `root.tsx`

```diff
+ import {XoBuilder} from '@xotiny/xb-react-elements';
+ import wcJs from '~/wc/wc.js?url';
...

+ <XoBuilder.Root>
  <html lang={locale.language}>
+   <XoBuilder.Root.Head jsUrls={[wcJs]}>
-    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta
        name="msvalidate.01"
        content="A352E6A0AF9A652267361BBB572B8468"
      />
      <link rel="stylesheet" href={styles}></link>
      <Meta />
      <Links />
-    </head>
+   </XoBuilder.Root.Head>
    <body>
      {data ? (
        <Analytics.Provider
          cart={data.cart}
          shop={data.shop}
          consent={data.consent}
        >
          <PageLayout
            key={`${locale.language}-${locale.country}`}
            layout={data.layout}
          >
            {children}
          </PageLayout>
        </Analytics.Provider>
      ) : (
        children
      )}
      <ScrollRestoration nonce={nonce} />
      <Scripts nonce={nonce} />
    </body>
  </html>
+ </XoBuilder.Root>
```

### `entry.server.tsx`

```diff
+ import {XoBuilder} from '@xotiny/xb-react-elements';

...

+ const {nonce, header, NonceProvider} = XoBuilder.createContentSecurityPolicy({
- const {nonce, header, NonceProvider} = createContentSecurityPolicy({
  shop: {
    checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
    storeDomain: context.env.PUBLIC_STORE_DOMAIN,
  },
  scriptSrc: [
    'self',
    'https://cdn.shopify.com',
    'https://shopify.com',
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com',
    ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:*'] : []),
  ],
});
```

### [`($locale)._index.tsx`](https://github.com/xotiny/xo-builder-hydrogen/blob/main/app/routes/(%24locale)._index.tsx)

### [`($locale).products.$handle.tsx`](https://github.com/xotiny/xo-builder-hydrogen/blob/main/app/routes/(%24locale).products.%24handle.tsx)

### [`($locale).collections.$handle.tsx`](https://github.com/xotiny/xo-builder-hydrogen/blob/main/app/routes/(%24locale).collections.%24handle.tsx)

### [`($locale).pages.$handle.tsx`](https://github.com/xotiny/xo-builder-hydrogen/blob/main/app/routes/(%24locale).pages.%24handle.tsx)

### [`($locale).blogs.$blogHandle.$handle.tsx`](https://github.com/xotiny/xo-builder-hydrogen/blob/main/app/routes/(%24locale).blogs.%24blogHandle.%24handle.tsx)