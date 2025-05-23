# Brewhaus

Plan ahead next time. Find local breweries and see what's on tap!

This website features:

- See all of the breweries!
  - Page by page, because we don't want to overwhelm you.
- Search for breweries by name or location!
- See the brewery up close and person!

## Installation

1. Clone the repository.
2. Install the dependencies.
   1. If building for production, use `npm ci`
   2. Otherwise, you can use `npm i` to install the latest supported version of the dependency.

## Development

```bash
npm run dev
npm run devapi
```

For development, open two terminal windows.

In the first, run `npm run dev` for the local UI server. In the second terminal window, run `npm run devapi` for the express.js server. You can point to [http://localhost:5173](http://localhost:5173) to access the local dev instance in your browser.

When a file in the `src` directory is changed the browser page will automatically reload. If the lightweight API source code is changed, `npm run devapi` must be closed and restarted.

## Build for Production

Build and Deployment documentation to follow.

## Known Issues

A few issues were found that have not been addressed for this iteration and are outlined here.

- In ApiQuery.spec.ts, a variable is used before it is assigned. This is on purpose to test a potential undefined parameter.
  - The issue of a potentially undefined parameter can be resolved by a simple refactor, but should the ApiQuery module be transported and used elsewhere, it would still have to be handled.
- There is no user feedback when "Search near me" has been clicked or when any API request is in progress.
- Code formatting is not pretty and no steps have been taken to include any formatting rules yet.
- Postal code matching is _very_ generic and will even run a search based on a partial ZIP code.
- API distance feature does not limit by distance, and this app does not triangulate locations or calculate that information.
- API city search does not accept state or providence.
- API does not return image of the brewery or a description. What is in place is not a very smart way to handle images or website copy because of CORS limitations. Spinning up an API using express.js or similar would be a smarter solution.
  - This has been addressed by the `devapi` server, but it is not a permanent solution.

## Future plans

- Ionic is good for hybrid mobile apps and PWAs target small screens, but do not work for desktop-focused sites. To that end, Ionic will be replaced with a different Vue-based framework, e.g. PrimeVue or Quasar.
- A more robust API server will be created to act as a proxy to the Open Brewery DB API, as well as (once found) a data source that can include current brews for a website.
- Authentication and user accounts will be added to allow users to save their favorite breweries, beers, and connect with like-minded users.
- Review known issues and address some of them for a better user experience.

## Open Source Packages

Brewhaus could not come together without the help of the following packages:

- [Open Brewery DB](https://www.openbrewerydb.org/) - A free dataset and API with public information on breweries, cideries, brewpubs, and bottleshops!
- [Ionic](https://ionicframework.com/) - An open source UI toolkit for building performant, high-quality mobile apps using web technologies.
- [Axios](https://axios-http.com/docs/api_intro) - The most widely-used HTTP client for node.js<sup>&dagger;</sup>!
- [express.js](https://expressjs.com) - A lightweight node.js webserver, great for mocking APIs or getting around CORs.
- [Bacon Ipsum](https://baconipsum.com/json-api/) - For a more _inspired_ placeholder text.

## Imagery

- https://unsplash.com/photos/people-inside-buildings-WzPdP9pn7go
- https://unsplash.com/photos/four-women-holding-drinks-while-laughing-together-during-daytime-nYgy58eb9aw
- ~~https://unsplash.com/photos/clear-drinking-glass-with-beer-2UsNF4Az-Ko~~

---

## Footnotes

&dagger; These claims have not been verified.
