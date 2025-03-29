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

When developing, open a terminal window and run `npm run dev` to load a local dev server. When a file in the source code is changed either the component or the whole page is reloaded. This is dependent on which file has been changed. Sometimes destructive changes force a full page reload.

When developing for iOS or Android,

## Build for Production

Build and Deployment documentation to follow.

## Known Issues

A few issues were found that have not been addressed for this iteration and are outlined here.

- In ApiQuery.spec.ts, a variable is used before it is assigned. This is on purpose to test a potential undefined parameter.
  - The issue of a potentially undefined parameter can be resolved by a simple refactor, but should the ApiQuery module be transported and used elsewhere, it would still have to be handled.
- Code formatting is not pretty and no steps have been taken to include any formatting rules yet.
- API distance feature does not limit by distance, and this app does not triangulate locations or calculate that information.
- API city search does not accept state or providence.
- API does not return image of the brewery or a description. What is in place is not a very smart way to handle images or website copy.

## Open Source Packages

Brewhaus could not come together without the help of the following packages:

- [Open Brewery DB](https://www.openbrewerydb.org/) - A free dataset and API with public information on breweries, cideries, brewpubs, and bottleshops!
- [Ionic](https://ionicframework.com/) - An open source UI toolkit for building performant, high-quality mobile apps using web technologies.
- [Axios](https://axios-http.com/docs/api_intro) - The most widely-used HTTP client for node.js<sup>&dagger;</sup>!

## Imagery

- https://unsplash.com/photos/people-inside-buildings-WzPdP9pn7go
- https://unsplash.com/photos/clear-drinking-glass-with-beer-2UsNF4Az-Ko
- https://unsplash.com/photos/four-women-holding-drinks-while-laughing-together-during-daytime-nYgy58eb9aw

---

## Footnotes

&dagger; These claims have not been verified.
