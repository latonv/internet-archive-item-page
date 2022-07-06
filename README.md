# Internet Archive Item Metadata Page

> A small web application for exploring metadata about items in the Internet Archive.

## Building

To run the application locally, clone this repo and then download the dependencies with `npm i`.

Once you have those, you can spin up a local dev server by running this command in the project directory:

```
npm run serve
```

This should automatically open the application in a new browser tab. The application runs at http://localhost:8080 and will watch for changes to the source files and reload as needed.

The js bundle can also be built on its own without running the dev server, with the command:

```
npm run build
```

## Testing

Some unit tests are included in the `tests` directory, and can be run with the command:

```
npm run test
```

These tests don't cover everything at the moment, but they at least check that API data is being correctly parsed by the data classes.