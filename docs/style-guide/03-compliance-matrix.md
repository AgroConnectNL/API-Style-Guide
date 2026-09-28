## <a id="chapter3"></a>3. Compliancy matrixes NLGov REST API Design Rules

The AGRI API Style Guide (AASG) follows the API Design Rules from the NL API Strategie published in the [NLGov REST API Design Rules](https://gitdocumentatie.logius.nl/publicatie/api/adr/) (short: _ADR_).  Our set of rules is composed of:

- rules **inherited** from the ADR: these rules apply unmodified but guiding examples can be changed to the Agri- and Food context.  An API specification that complies with **inherited** AASG rules thereby _also complies_ with the ADR, and _vice versa_.
- ADR rules which have been **extended** for the AASG by adding extra constraints to make them more strict. An API specification that complies with **extended** AASG rules thereby _also complies_ with the ADR, but not vice versa.
- ADR rules which are **customized** for the AASG. An API specification that follows **customized** AASG rules therefore _does not comply_ with the ADR.
- rules which are not part of the _ADR_ and which are specifically designed for the AASG. Following these rules _does not affect_ compliance with the ADR.

### Compliance Matrix: AASG Rules to ADR Rules

Following table offers an overview which ADR-rules are inherited, customized or ignored in the AGRI API Style Guide (AASG).í

| AASG Rule     | ADR Rule                                                                       | Adoption   | Remark                                                                                               |
| ------------- | ------------------------------------------------------------------------------ | ---------- | ---------------------------------------------------------------------------------------------------- |
| [M001](#m001) | `/core/doc-openapi`<br>`/core/publish-openapi`                                 | Inherited  | OpenAPI specification required                                                                       |
| [M002](#m002) | `/core/doc-openapi-contact`                                                    | Inherited  | API meta information and contact required                                                            |
| [M003](#m003) | `/core/doc-language`<br>`/core/interface-language`                             | Customized | AASG prefers U.K. English in specification. ADR allows English but prefers Dutch                     |
| [M004](#m004) | `/core/semver`                                                                 | Inherited  | Semantic versioning required                                                                         |
| [M005](#m005) | `/core/deprecation-schedule`<br>`/core/transition-period`<br>`/core/changelog` | Inherited  | These 3 ADR rules are merged in one AASG rule                                                        |
| [M006](#m006) | `/core/uri-version`                                                            | Customized | AASG prefers major version in request header. ADR in URI                                             |
| [M007](#m007) | None                                                                           | AASG only  | Optional client software identifier header                                                           |
| [M008](#m008) | `/core/version-header`                                                         | Inherited  | Full API version in response header                                                                  |
| [M009](#m009) | None                                                                           | AASG only  | Server-side request identifier in response                                                           |
| [M010](#m010) | None                                                                           | AASG only  | Request date-time in response header                                                                 |
| [U001](#u001) | None                                                                           | AASG only  | Do not use `/api` or `/services` as base path                                                        |
| [U002](#u002) | `/core/naming-resources`                                                       | Inherited  | Resource names must be nouns                                                                         |
| [U003](#u003) | `/core/naming-collections`                                                     | Inherited  | Collection resource names must be plural                                                             |
| [U004](#u004) | `/core/path-segments-kebab-case`                                               | Inherited  | Path segments must use kebab-case                                                                    |
| [U005](#u005) | `/core/no-trailing-slash`                                                      | Extended   | Normalize paths without trailing slashes. <br>AASG also defines rules for empty path segments (causing `..//..`in URIs) |
| [U006](#u006) | `/core/query-keys-camel-case`                                                  | Inherited  | Query parameters must be lowerCamelCase                                                              |
| [U007](#u007) | `/core/nested-child`<br>`/core/resource-operations`                            | Inherited  | Child resources identified via path segments                                                         |
| [R001](#r001) | `/core/stateless`                                                              | Inherited  | APIs must be stateless                                                                               |
| [R002](#r002) | None                                                                           | AASG only  | Must return full resource representation                                                             |
| [R003](#r003) | None                                                                           | AASG only  | Unique resource ID assigned and returned                                                             |
| [R004](#r004) | `/core/hide-implementation`                                                    | Inherited  | Hide implementation details from clients                                                             |
| [R005](#r005) | None                                                                           | AASG only  | GET operations may support client-side caching                                                       |
| [P001](#p001) | None                                                                           | AASG only  | JSON is required as payload format                                                                   |
| [P002](#p002) | None                                                                           | AASG only  | Standard JSON media types must be used                                                               |
| [P003](#p003) | None                                                                           | AASG only  | Schema names must be singular                                                                        |
| [P004](#p004) | None                                                                           | AASG only  | Schema names must be CamelCase (PascalCase)                                                          |
| [P005](#p005) | None                                                                           | AASG only  | Property names must be lowerCamelCase                                                                |
| [P006](#p006) | None                                                                           | AASG only  | Array properties must have plural names                                                              |
| [P007](#p007) | None                                                                           | AASG only  | Null and absent properties handled identically                                                       |
| [P008](#p008) | `/core/date-time/date-omit-time-portion`                                       | Inherited  | Date-only fields omit time components                                                                |
| [P009](#p009) | `/core/date-time/format`                                                       | Inherited  | Use RFC9557/ISO8601 formats                                                                          |
| [P010](#p010) | `/core/date-time/timezone`                                                     | Inherited  | Accept all offsets, prefer UTC responses                                                             |
| [P011](#p011) | None                                                                           | AASG only  | GET and DELETE must not have request payload                                                         |
| [P012](#p012) | None                                                                           | AASG only  | PATCH must use JSON Patch                                                                            |
| [P013](#p013) | `/core/error-handling/problem-details`                                         | Inherited  | Error responses use Problem Details                                                                  |
| [P014](#p014) | None                                                                           | AASG only  | RFC 8288-based links array required for hypermedia links                                             |
| [H001](#h001) | `/core/http-methods`                                                           | Extended   | Only use standard HTTP methods.<br>AASG does not allow PUT to be used for insert-or-update           |
| [H002](#h002) | `/core/http-safety`                                                            | Inherited  | HTTP safety and idempotency semantics required                                                       |
| [H003](#h003) | `/core/http-response-code`                                                     | Inherited  | Use standard HTTP status codes for errors                                                            |
| [H004](#h004) | None                                                                           | AASG only  | Support standard response codes for methods                                                          |
| [H005](#h005) | None                                                                           | AASG only  | PUT must not be insert-or-update                                                                     |
| [H006](#h006) | `/core/error-handling/invalid-input`                                           | Inherited  | Invalid input must result in HTTP 400 Bad Request                                                    |
| [H007](#h007) | `/core/error-handling/all-errors`                                              | Inherited  | Bundle all bad request errors together in one response                                               |
| [H008](#h008) | None                                                                           | AASG only  | 401 must only be used for authentication failures                                                    |

### Compliance Matrix: ADR Rules to AASG Rules

The following table provides a reverse lookup showing how each ADR (REST-API Design Rules) rule is adopted in the AGRI API Style Guide (AASG).

| ADR Rule                                 | AASG Rule     | Adoption   | Remark                                                                                     |
| ---------------------------------------- | ------------- | ---------- | ------------------------------------------------------------------------------------------ |
| List of technical rules                  |               |            |                                                                                            |
| `/core/no-trailing-slash`                | [U005](#u005) | Extended   | AASG Inherits this rule and adds additional constraints for empty path segments            |
| `/core/path-segments-kebab-case`         | [U004](#u004) | Inherited  | Use kebab-case for path segments                                                           |
| `/core/query-keys-camel-case`            | [U006](#u006) | Inherited  | Use camelCase for query parameters                                                         |
| `/core/date-time/date-omit-time-portion` | [P006](#p006) | Inherited  | Date-only fields omit time components                                                      |
| `/core/date-time/format`                 | [P007](#p007) | Inherited  | Use RFC9557/ISO8601 formats                                                                |
| `/core/date-time/timezone`               | [P008](#p008) | Inherited  | Accept all offsets, prefer UTC responses                                                   |
| `/core/error-handling/problem-details`   | [P013](#p013) | Inherited  | Error responses use Standard Problem Details                                               |
| `/core/error-handling/invalid-input`     | [H006](#h006) | Inherited  | Invalid input must result in 400 Bad Request                                               |
| `/core/doc-openapi`                      | [M001](#m001) | Inherited  | OpenAPI specification required                                                             |
| `/core/doc-openapi-contact`              | [M002](#m002) | Inherited  | API meta information and contact required                                                  |
| `/core/publish-openapi`                  | [M001](#m001) | Inherited  | OpenAPI specification required                                                             |
| `/core/uri-version`                      | [M006](#m006) | Customized | AASG prefers major version in request header                                               |
| `/core/semver`                           | [M004](#m004) | Inherited  | Semantic versioning required                                                               |
| `/core/version-header`                   | [M008](#m008) | Inherited  | Full API version in response header                                                        |
| `/core/transport/tls`                    | [S001](#s001) | Inherited  | Use TLS for secure communication                                                           |
| `/core/transport/security-headers`       | [S003](#s003) | Inherited  | Use security headers                                                                       |
| `/core/transport/cors`                   | [S004](#s004) | Inherited  | Use CORS for cross-origin resource sharing                                                 |
| List of functional rules                 |               |            |                                                                                            |
| `/core/naming-resources`                 | [U002](#u002) | Inherited  | Resource names must be nouns                                                               |
| `/core/naming-collections`               | [U003](#u003) | Inherited  | Collection resource names must be plural                                                   |
| `/core/interface-language`               | [M003](#m003) | Customized | AASG prefers U.K. (British) English in specification                                       |
| `/core/hide-implementation`              | [R004](#r004) | Inherited  | Hide implementation details from clients                                                   |
| `/core/http-methods`                     | [H001](#h001) | Extended   | Only use standard HTTP methods.<br>AASG does not allow PUT to be used for insert-or-update |
| `/core/http-safety`                      | [H002](#h002) | Inherited  | HTTP safety and idempotency semantics required                                             |
| `/core/http-response-code`               | [H003](#h003) | Inherited  | Use standard HTTP status codes for errors                                                  |
| `/core/stateless`                        | [R001](#r001) | Inherited  | APIs must be stateless                                                                     |
| `/core/nested-child`                     | [U007](#u007) | Inherited  | Child resources identified via path segments                                               |
| `/core/resource-operations`              | [U007](#u007) | Inherited  | Child resources identified via path segments                                               |
| `/core/error-handling/all-errors`        | [H007](#h007) | Inherited  | Bundle all bad request errors together in one response                                     |
| `/core/doc-language`                     | [M003](#m003) | Customized | AAASG prefers U.K. (British) English in documentation                                      |
| `/core/deprecation-schedule`             | [M005](#m005) | Inherited  | Transition between major versions                                                          |
| `/core/transition-period`                | [M005](#m005) | Inherited  | Transition between major versions                                                          |
| `/core/changelog`                        | [M005](#m005) | Inherited  | Add change log for each version                                                            |
| `/core/transport/no-sensitive-uris`      | [S002](#s002) | Inherited  | Do not include sensitive information in URIs                                               |
| `/core/modules/geospatial`               | -             | ADR Only   | Not explicitly implemented in AASG                                                         |
| `/core/modules/signing`                  | -             | ADR Only   | Not explicitly implemented in AASG                                                         |
| `/core/modules/encryption`               | -             | ADR Only   | Not explicitly implemented in AASG                                                         |

