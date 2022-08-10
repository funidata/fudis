# Releases

## Versioning

- Use [semantic versioning](https://semver.org/). (Required for all NPM packages.)
- The meaning of a "breaking change" is somewhat ambiguous when it comes to component libraries and UI in general. We will se how it goes and draw up more specific versioning guidelines, if necessary.

## Changelog

- Probably necessary, at least after `v1`..?

## Release Pipeline

Releasing to NPM is automatically handled by GitHub Actions workflow upon satisfying the following conditions:

- Changes pushed or merged to the `main` branch.
- Tests pass.
- Version number has been incremented (compared to the current release on NPM).
