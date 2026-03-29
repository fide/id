# `@fide-work/id`

JavaScript/TypeScript SDK for calculating, parsing, and validating `did:fide` identifiers.

This package provides the core Fide ID helpers for:

- calculating Fide IDs
- parsing Fide IDs
- validating Fide IDs
- reference identifier normalization helpers

- SDK docs: [fide.work/docs/id/sdk/javascript](https://fide.work/docs/id/sdk/javascript)
- npm: [@fide-work/id](https://www.npmjs.com/package/@fide-work/id)
- Repository: [github.com/fide/id](https://github.com/fide/id)

## Status

This package is in alpha.

- Breaking changes are allowed during alpha.
- Consumers should pin exact versions.

## Install

```bash
pnpm add @fide-work/id
```

## Development

Useful local commands:

- `pnpm run build`
- `pnpm test`

## Notes

- Policy enforcement is on by default.
- Low-level helpers may bypass policy checks via:
  - `dangerouslySkipReferenceTypePolicy`
  - `dangerouslySkipReferenceIdentifierPolicy`
- `calculateFideId(...)` hashes the exact `referenceIdentifier` string it receives.
- `normalizeReferenceIdentifier(...)` and predicate shorthand helpers are available separately when callers need them.

## Dependencies

- `@fide-work/vocabulary` provides the entity type registry used by this package.
