
# Description

Moved the pull request template file from `docs/pull_request_template.md` to `.github/pull_request_template.md`.  
Additionally, updated the template content to include a proper issue reference using the `Resolves #[issue]` keyword, which enables automatic issue closing by GitHub when the PR is merged.

This improves contributor guidance and ensures better integration with GitHub’s automation for issue tracking.

## Type of change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [x] This change requires a documentation update
- [ ] This change requires an update to testing

## Issue

- [x] Is this related to a specific issue? If so, please specify:  
      Resolves #532

# Checklist:

- [x] This PR is up to date with the main branch, and merge conflicts have been resolved  
- [x] I have executed `npm run test` and `npm run test:e2e` and all tests have passed successfully or I have included details within my PR on the failure  
- [x] I have executed `npm run lint` and resolved any outstanding errors. Most issues can be solved by executing `npm run format`  
- [x] My code follows the style guidelines of this project  
- [x] I have performed a self-review of my own code  
- [x] I have commented my code, particularly in hard-to-understand areas  
- [x] My changes generate no new warnings
