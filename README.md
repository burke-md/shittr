# Shittr

This is a backend assesment project being build with next.js

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).



## Be Aware:
- This project is using postgreSQL databases hosted on Heroku. Prisma requires a temporary shadow db for migrations but does not allow the propper permissions for this. It has been manually added and can be seen in the schema.prisma file.

## Resources:

- Documentation comparing html/react/nextjs [components](https://nextjs.org/blog/forms)

- Prisma [crud opperations](https://www.prisma.io/docs/concepts/components/prisma-client/crud#read)

- Official [documentation](https://developers.google.com/maps/documentation/javascript/react-map) for adding google maps into a react project

- Unofficial [notes](https://medium.com/web-dev-survey-from-kyoto/3-gotchas-of-google-maps-api-when-used-with-next-js-and-eslint-dba627c9657d) on google's react implementation compatibilty with Next.js

- Alternative pre-built map [colour scheme](https://snazzymaps.com/)