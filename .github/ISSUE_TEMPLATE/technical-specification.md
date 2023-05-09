---
name: Technical Specification
about: High level architecture for new systems/features
title: "Tech spec: "
labels: tech spec
assignees: ""
---

## Guidelines

A technical specification exists to guide implementation and to clear any ambiguity around what needs to be done in order to ship a project. The level of detail should be enough so that people won't be wondering _how_ something will be done from a high level, but it shouldn't be so much that the tech spec is basically doing the entire project.

When writing technical documents, err on the side of brevity. Say just enough to get your point across.

When writing tech specs, err on the side of decreasing scope instead of increasing scope if faced with the two choices.

Not every section requires a response. Just leave `N/A` under a section if it's not applicable.

When completed please post to discussion board.

**Delete the text above before submitting**

## Summary:

Provide a short (1-2 sentences) overview of the project, including its purpose and goals.

## Scope:

Define the scope of the project, including what is within scope and what is out of scope.

## Data model:

Define any changes to data models, including any added or removed indeces or relations.

## User Stories:

List the ways the user will interact with the project. e.g. "User will be able to edit their profile."

## Implementation Details:

Provide details around how the feature will be implemented, and justify any decisions made. For example, this may include stuff that looks like:

- We are using server-side rendering via Next.js instead of client-side rendering because XYZ.
- To get a user's information from Discord, we will use the provided code to generate an access token from Discord's OAuth API, and then use that access token to hit various endpoints to get user's profile and guild data.

Provide pseudocode/code snippets if you think they are important for understanding the implementation.

## APIs:

Define new API endpoints of the project, including the endpoints, methods, and request/response formats.

## Security/Privacy:

Call out any security or privacy concerns, and what can be done to mitigate them.

## Testing:

Describe the testing approach and strategy for the project, including unit tests, integration tests, and end-to-end tests.

## Open Questions:

Use this space to ask any questions of which you're not sure of the answer, whether it be a technical question or an implementation detail.

## Deployment:

Describe any special considerations needed when deploying the project. For example, if there are breaking schema changes, how do we migrate existing data?
