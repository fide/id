# Contributing to Fide ID

Thank you for contributing to Fide ID.

This repository is specification-first. The `did:fide` method definition is the core product, and the JavaScript SDK and generated docs are downstream artifacts.

## Current Stability Policy

The repository is currently in alpha.

- Breaking changes are allowed during alpha.
- SDK releases use `0.0.0-alpha.x`.
- Changes should still be deliberate and easy to review.

## Repository Scope

This repository is responsible for:

- `did:fide` syntax and resolution rules
- method operations, security, and privacy guidance
- JavaScript SDK behavior for Fide ID calculation, parsing, and validation
- generated SDK reference docs

Changes that belong in other repositories should stay there:

- base entity and reference typing belongs in `fide/vocabulary`
- statement protocol rules belong in `fide/context-protocol`

## How To Contribute

1. Open or reference an issue describing the change.
2. Update the relevant specification or SDK source files.
3. Regenerate affected docs if needed.
4. Review the generated diff carefully.
5. Submit a focused pull request with a clear explanation of compatibility impact.

## Generated Files

Generated SDK reference docs live under:

- `docs/sdk/javascript/`

If you change the SDK surface, regenerate the docs before submitting your change.

## Local Commands

From `sdk/javascript/`:

```bash
pnpm run generate:docs
pnpm run build
pnpm run check-types
pnpm test
```

## Pull Request Expectations

A good pull request should make it obvious:

- what changed in the method or SDK
- whether the change is breaking, additive, or editorial
- why the change belongs in Fide ID rather than a related repository
- whether generated docs were refreshed

## AI Use

If you used AI assistance to prepare a contribution, disclose that in the pull request.

You are still responsible for understanding the change, reviewing the output, and ensuring the contribution is technically correct.
