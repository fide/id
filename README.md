# Fide ID

Canonical specification and SDK for the `did:fide` method.

Fide ID defines stable, portable identifiers for entities in the Fide ecosystem. It depends on the [Fide Vocabulary](https://github.com/fide/vocabulary) for entity type and reference type rules and is used by the [Fide Context Protocol](https://github.com/fide/context-protocol).

Public docs are published at:

- [fide.work/docs/id](https://fide.work/docs/id)

## Status

This repository is currently in alpha.

- The current SDK line is published as `0.0.0-alpha.x`.
- Breaking changes are allowed during alpha.
- Consumers should pin exact versions.

## Repository Structure

- `docs/specification/`: method specification
- `docs/sdk/javascript/`: generated JavaScript SDK reference
- `sdk/javascript/`: JavaScript/TypeScript SDK package
- `scripts/`: SDK docs generation scripts

## JavaScript SDK

The JavaScript SDK package lives in:

- `sdk/javascript/`

Current package name:

- [`@fide-work/id`](https://www.npmjs.com/package/@fide-work/id)

Additional docs:

- [fide.work/docs/id/specification](https://fide.work/docs/id/specification)
- [fide.work/docs/id/sdk/javascript](https://fide.work/docs/id/sdk/javascript)

## License

Licensed under Apache-2.0. See `LICENSE` for the full text.
