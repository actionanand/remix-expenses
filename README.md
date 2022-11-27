# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
yarn run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
yarn run build
```

Then run the app in production mode:

```sh
yarn start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```

### Resources

- [Prisma - NextGen NodeJs ORM](https://www.prisma.io/docs/getting-started/quickstart)
- [Installing the Prisma CLI](https://www.prisma.io/docs/concepts/components/prisma-cli/installation)


### Prisma setup

```sh
yarn add -D prisma
```

for `mongodb`:

```bash
npx prisma init --datasource-provider mongodb
```

- Model your data in the `Prisma schema` as below (example):

```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

- invoking the `prisma generate`

```sh
npx prisma generate
```

or

```bash
yarn prisma generate
```

### Splat Route

- if you want to handle undefinded routes or you want to redirect to some other routes, you can use `splat route`. Splat route will be defined by creating a file as `$.jsx` or `$.tsx` inside `routes` directory. The sample content will follow as below:

```js
// splat route
import { redirect } from '@remix-run/node';

export function loader({params}) {
  if(params['*'] === 'exp') {
    return redirect('/expenses');
  }

  throw new Response('Not Found', { status: 404 });
  // throw new Error('Page Not Found!');
  // return null;
}
```