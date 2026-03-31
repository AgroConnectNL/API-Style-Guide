# AGRI API Style Guide

## AgroConnect Standard

#### Draft February 2026

#### Authors

Bernard van Raaij (Van Raaij Advies)

#### Contributors

Conny Graumans ([AgroConnect](www.agroconnect.nl))

#### Credits

This document has been prepared with grateful use of the documentation of the API Design Rules from the [Kennisplatform API's](https://developer.overheid.nl/communities/kennisplatform-apis). We also used the [Zalando RESTful API and Event Guidelines](https://opensource.zalando.com/restful-api-guidelines/) as a source of inspiration.

---

## Status of This Document

This is a draft that could be altered, removed or replaced by other documents. It is not a recommendation approved by AgroConnect.

## Conformance

As well as sections marked as non-normative, all authoring guidelines, diagrams, examples, and notes in this specification are non-normative. Everything else in this specification is normative.

The key words *MAY*, *MUST*, *MUST NOT*, *NOT RECOMMENDED*, *SHOULD*, and *SHOULD NOT* in this document are to be interpreted as described in [BCP 14](https://www.rfc-editor.org/info/bcp14) [[RFC2119](https://logius-standaarden.github.io/API-Design-Rules/#bib-rfc2119 "Key words for use in RFCs to Indicate Requirement Levels")] [[RFC8174](https://logius-standaarden.github.io/API-Design-Rules/#bib-rfc8174 "Ambiguity of Uppercase vs Lowercase in RFC 2119 Key Words")] when, and only when, they appear in all capitals, as shown here.

## 1. Introduction

More and more organizations in the Agri- and Food domain offer REST APIs (henceforth abbreviated as APIs), in addition to existing interfaces like SOAP and WFS. AgroConnect supports this development. These APIs aim to be developer-friendly and easy to implement. While this is a commendable aim, it does not shield a developer from a steep learning curve getting to know every new API, in particular when every individual API is designed using different patterns and conventions.

This document aims to describe a widely applicable set of design rules for the unambiguous provisioning of REST (aka RESTFul) APIs. The primary goal is to offer guidance for organizations designing new APIs, with the purpose of increasing developer experience (DX) and interoperability between APIs. Hopefully, many organizations (especially AgroConnect members) will adopt these design rules in their corporate API strategies and provide feedback about exceptions and additions to subsequently improve these design rules.

With this in mind, AgroConnect adopts "API First" as a key engineering principle. API development begins with API specification outside the code and ideally involves ample peer-review feedback to achieve high-quality APIs. API First encompasses a set of quality-related standards. We encourage organization in the Agri-0 and Food domein to follow them to ensure that APIs:

- are easy to understand and learn
- are general and abstracted from specific implementation and use cases
- are robust and easy to use
- have a common look and feel
- follow a consistent RESTful style and syntax
- are consistent with other orrganizations’ APIs

Ideally, all APIs in the Agri- and Food domain will look as if the same author created them.

## 2. Normative API Design Rules

The list of API Design Rules in the *AGRI API Style Guide* is partially based on the [NLGov REST API Design Rules](https://gitdocumentatie.logius.nl/publicatie/api/adr/) as published by Forum Standaardisatie ([REST-API Design Rules | Forum Standaardisatie](https://www.forumstandaardisatie.nl/open-standaarden/rest-api-design-rules)). Our set of rules is composed of:

- rules **inherited **from the *REST-API Design Rules* (short: _ADR_): these rules apply unmodified but guiding examples can be changed to the Agri- and Food context 
- rules adapted from the _REST-API Design Rules_ which are **customized **(including examples)
- rules which are not part of the  _REST-API Design Rules_ and whoch are specifically designed for this *AGRI API Style Guide*.

### 2.1 Our rules

### 2.1.1 Basic Meta Information and Versioning [Mxxx]

The API specification, also referred to as the API contract, serves as the primary reference for third parties developing client implementations. Its objective is to provide client developers with comprehensive details required to implement conformant clients. The rules in this section define the mandated publication format and the specific elements that must be included in the specification. This section also defines the versioning rules for the specification to ensure controlled evolution and maintain backward compatibility after the initial formal release.

### [M001] API Specification **MUST** be specified and published using OpenAPI

We use the standard provided by the [OpenAPI Initiative](https://www.openapis.org/) to define API specifications, so the API contract **MUST **be specified using OpenAPI. API designers **SHOULD** provide the API specification using a single self-contained YAML file for better readability. The specification **MAY** be published using a single JSON file.

Inherited ADR:

- [/core/doc-openapi](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/doc-openapi): Use OpenAPI Specification for documentation
- [/core/publish-openapi](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/publish-openapi): Publish OAS document at a standard location in JSON-format

### [M002] API Specification **MUST** contain API meta information 

API specifications **MUST** contain the following [OpenAPI meta information](https://spec.openapis.org/oas/latest.html#info-object):

- `#/info/title` a (unique) identifying, functional descriptive name of the API
- `#/info/version` the API specification document version following [**MUST** use semantic versioning](https://opensource.zalando.com/restful-api-guidelines/#116)
- `#/info/description` a proper description of the API
- `#/info/contact/{name,url,email}` contact info of the team owning the API specification

Inherited ADR:

- [/core/doc-openapi-contact](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/doc-openapi-contact): Document contact information for publicly available APIs

### [M003] API Specification **MUST** be written using U.S. English

API specification **MUST** be wrtiten in U.S. English. 

Customized ADR:

This rule differs slightly from the ADR rules which allow English but prefer Dutch. 

- [/core/doc-language](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/doc-language): Publish documentation in Dutch unless there is existing documentation in English
- [/core/interface-language](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/interface-language): Define interfaces in Dutch unless there is an official English glossary available

### [M004] API Specification and implementation **MUST** use semantic versioning

OpenAPI requires the definition of API specification version via `#/info/version`. Note, this API specification document version is distinct from the OpenAPI Specification version (also required, e.g. `openapi: 3.0.4`), or the API Implementation version — see [Basic Terminology](https://opensource.zalando.com/restful-api-guidelines/#terminology).

We expect API designers to comply to [Semantic Versioning 2.0](http://semver.org/spec/v2.0.0.html) with the standard version format `major.minor.patch` as follows:

- Increment the `MAJOR` version when you make incompatible API changes after having aligned the changes with consumers. Consumers *have to adapt* their clients to be able to use this version
- Increment the `MINOR` version when you add new functionality in a backwards-compatible manner. Consumers only have to adapt their clients to the new version to be able to use the new features, though can use existing features from earlier versions working without modifying their client software implementation
- Optionally increment the `PATCH` version when you make backwards-compatible bug fixes or editorial changes not affecting the functionality. Consumers do not have to modify their software implementation to use this newer version

Inherited ADR:

- [/core/semver](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/semver): Adhere to the Semantic Versioning model when releasing API changes
- [/core/deprecation-schedule](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/deprecation-schedule): Include a deprecation schedule when deprecating features or versions
- [/core/transition-period](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/transition-period): Schedule a fixed transition period for a new major API version
- [/core/changelog](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/changelog): Publish a changelog for API changes between versions

### [M005] The MAJOR version **MUST **be specified in the HTTP request header

To support simultaneously deployed `major` versions, clients **MUST **indicate the targeted major API version in the HTTP headers using the `Major-Version` header parameter. The recommended format is `v1`, `v2`, and so on. 

URL-based versioning (as in `../v1/growers/...`) **SHOULD NOT** be used, because the URL represents the unique address of a resource (and not the API), which itself is not versioned.

Customized ADR:

This rule differs from the ADR rule [/core/uri-version](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/uri-version) which _does_ prescribe URI-based versioning:

- [](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/semver)[/core/uri-version](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/uri-version): Include the major version number in the URI

### [M006] The full API version **MUST** be returned in the HTTP response header

For tracing and debugging purposes, the full API version (i.e., `major.minor.patch`) **MUST **be returned to the client in the `API-Version` HTTP response header.

Inherited ADR:

- [/core/version-header](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/version-header): Return the full version number in a response header

### [M007] The identification of the client software package **MAY **be specified in the HTTP request header

Although APIs are client-agnostic, the client **MAY **pass the name and software version which is calling the API in the standard HTTP header `User-Agent`.

### [M008] A unique, server-side assigned request identfier **MUST **be returned in the HTTP response header

For tracing and debugging purposes, a unique, server-side assigned request identifier (preferably a UUID) **MUST **be returned to the client in the `Request-Id` HTTP response header. Note that a request identifier tracks a specific request (and its downstream calls) on a resource, while a resource identifier (typically the URL path) uniquely identifies the target resource itself.

### [M009] The request date-time **MUST** be returned in the HTTP response header

For tracing and debugging purposes, a unique, server-side generated date-time timestamp **MUST** be returned to the client in the `Request-Date-Time` HTTP response header. 

### 2.1.2 Security [Sxxx]

Related ADR Rules:

- [/core/transport/tls](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/transport/tls): Secure connections using TLS
- [/core/transport/security-headers](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/transport/security-headers): Use mandatory security headers in API all responses
- [/core/transport/cors](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/transport/cors): Use CORS to control access
- [/core/transport/no-sensitive-uris](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/transport/no-sensitive-uris): No sensitive information in URIs

### 2.1.3 URLs and Resources ([Uxxx]

The key abstraction of information in REST is a Resource. Any information that we can name can be a resource. Each resource is identified by a unique address, the Uniform Resource Identifier ([=URI=]), which is part of the Uniform Resource Locator ([=URL=]). This section defines the rules for naming resources and constructing URLs.

### [U001] URLs **SHOULD NOT** use /api as base path

In most cases, all resources provided by a service are part of the public API, and therefore should be made available under the root "/" base path.

### [U002] Nouns **MUST** be used to name resources

Resources **MUST **be referred to using nouns (instead of verbs) that represent entities meaningful to the API consumer. 

Inherited ADR:

- [/core/naming-resources](https://gitdocumentatie.logius.nl/publicatie/api/adr/#/core/naming-resources): Use nouns to name resources

### [U003] Resource names **MUST** be plural

Resources respresent collections and therefore always **MUST **be referred to with a plural noun

Inherited ADR:

- [/core/naming-collections](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/naming-collections): Use plural nouns to name collection resources

### [U003] Resources and sub-(or child-)resources **MUST** be identified via path segments

Hierarchical relationships between resources **MUST **be represented as resources with sub-resources in the [=URI=] path.

Inherited ADR:

- [/core/nested-child](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/nested-child): Use nested URIs for child resources
- [/core/resource-operations](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/resource-operations): Model resource operations as a sub-resource or dedicated resource

### [U004] All path segments identifying the resource **MUST** use be written in kebab-case 

Path segments of a [=URI=] **MUST **only contain lowercase letters, digits or hyphens. This is also known as [kebab-case](https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case). Hyphens **MUST **only be used to deliniate distinct words. This also implies that diacritics **MUST **be normalized and special characters **MUST **be omitted. Followin gthis rule a [=URI=] must match regex `^[a-z][a-z\-0-9]*$`. The first character **MUST **be a lower case letter, and subsequent characters can be a lower case letter, or a dash(`-`), or a number.

Another implication of this rule is that file extensions **MUST NOT** be used (since a `"."` is not permitted in a [=URI=]. Resources **SHOULD **use the `Accept` header for content negotation.

The last path segment **MAY **start with `_`, which is used as a convention to implement [operations](#/core/resource-operations)

Rationale

Some web servers and frameworks do not handle case sensitivity or special characters of URIs well. The use of kebab-case path segments ensures compatibility with a broad range of systems. It is a more common implementation choice for path segments than camelCase or snake_case. Information (such as names of objects) that requires special characters can be part of the request body instead of being in the URI.

### [U005] URL Paths **MUST** use be normalized without empty path segments and trailing slashes

You **MUST NOT **specify paths with duplicate or trailing slashes, e.g. `/growers//crops` or `/growers/`. As a consequence, you **MUST **also not specify or use path variables with empty string values.

When requesting a resource including a trailing slash, this **MUST** result in a `404` (not found) error response and not a redirect. This forces API consumers to use the correct [=URI=].

This rule does not apply to the root resource (append `/` to the service root URL).

Rationale

Leaving off trailing slashes, and not implementing a redirect, forces API consumers to use the correct URI. This avoids confusion and ambiguity.

Customized ADR:

- [/core/no-trailing-slash](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/no-trailing-slash): Leave off trailing slashes from URIs

### [U006] Query parameters **MUST **be written in lowerCamelCase 

Query parameters (a.k.a query keys) in a [=URI=] **MUST **be lowerCamelCase matching regex `^\$?[a-z][a-z\d]*([A-Z][a-z\d]*)*$`. Query parameters only contain letters and digits, where the first letter of each word is capitalized, except for the first letter (MUST NOT be a digit) of the entire compound word. This is also known as [lower camelCase](https://developer.mozilla.org/en-US/docs/Glossary/Camel_case). This also implies that diacritics **MUST **be normalized and special characters MUST be omitted.

Rationale

Query keys are often converted to JSON object keys, where camelCase is the naming convention to avoid compatibility issues with JavaScript when deserializing objects.

### 2.1.4 Adherance to RESTFul principles [Rxxx]

The REST architectural style prescribes [six principles](https://restfulapi.net/) that API platforms must adhere to. This section defines rules to ensure the RESTfulness of the APIs. Since the HTTP protocol is intrinsically client-server, no additional rules are necessary to enforce this principle.

### [R001] APIs **MUST **be Stateless

APIs **MUST **be stateless and therefore servers **MUST NOT** store any session state information of client. This mandates that each request from the client to the server **MUST **contain all of the information necessary to understand and complete the request. The server cannot take advantage of any previously stored context information on the server. For this reason, the client application must entirely keep the session state.

Inherited ADR:

- [core/stateless](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/stateless): Do not maintain session state on the server

### [R002] APIs **MUST **provide a full representation of the resource in the response payload

As a consequence of the Uniform Interface principle, each response to an API request **MUST **contain the complete resource representation available on the server at the time that the response was generated. In case the resource does not exist (anymore) an empty body **MUST **be provided.

### [R003] A server side unique identifier **MUST **be assigned to each created resource and returned to the client

As a consequence of the Uniform Interface principle, the API interface must uniquely identify each resource involved in the interaction between the client and the server. When creating a new resource (typically as a result of a `POST` operation), a server-generated unique identifier (preferably a UUID) **MUST **be assigned to the resource and returned to the client in the response. For succeeding operations (`PUT`, `PATCH`, `DELETE`, `GET`) on this resource provided by the server, the resource **MUST **be identified using this server-generated unique identifier as a path parameter.

In addition, resources **MAY **be identified using secondary identifiers assigned by other entities. The API platform **MAY **support these identifiers as resource identifiers in subsequent operations  (`PUT`, `PATCH`, `DELETE`, `GET`) .

### [R004] APIs **SHOULD NOT** expose implementation details of the underlying application, development platforms/frameworks or database systems/persistence models

The Layered System principle allows an architecture to be composed of hierarchical layers by constraining component behavior. In a layered system, each component cannot see beyond the immediate layer they are interacting with. APIs therefore **MUST **hide irrelevant implementation details. An API **SHOULD NOT **expose implementation details of the underlying application, development platforms/frameworks or database systems/persistence models because:

- The primary motivation behind this design rule is that an API design **MUST** focus on usability for the client, regardless of the implementation details under the hood.
- The API, application and infrastructure **MUST** be able to evolve independently to ease the task of maintaining backwards compatibility for APIs during an agile development process.
- The API design of Convenience,- and Process API types **SHOULD NOT** be a 1-on-1 mapping of the underlying domain- or persistence model.
- The API design of a System API type **MAY **be a mapping of the underlying persistence model.
- The API **SHOULD NOT** expose information about the technical components being used, such as development platforms/frameworks or database systems.
- The API **SHOULD** offer client-friendly attribute names and values, while persisted data may contain abbreviated terms or serializations which might be cumbersome for consumption.

Inherited ADR:

- [/core/hide-implementation](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/hide-implementation): Hide irrelevant implementation details

### [R005] APIs **SHOULD NOT** support client side caching

Although one of the six REST principles is cacheable data, API platforms **SHOULD NOT** implement client-side caching of data retrieved via API calls unless it is strictly necessary for performance optimization.

### 2.1.5 JSON Payloads

Additional information in an API request or response that is not part of the HTTP method, [=URL=], or header must be exchanged in the payload. The rules in this section apply to the payloads.

### [P001] APIs **MUST **use JSON as payload data interchange format

API **MUST **use JSON ([RFC 7159](https://tools.ietf.org/html/rfc7159)) to represent structured (resource) data passed with HTTP requests and responses as body payload. 

### [P002] APIs **MUST **use standard JSON media types

The standard media type `application/json` (or `application/problem+json` to support problem JSON, see: XXXXXXXXXX) **MUST **be used as `content-type` (or `accept`) header information.

### [P003] Property names **MUST **be lowerCamelCase

All property names **MUST **be lowerCamelCase matching regex `^\$?[a-z][a-z\d]*([A-Z][a-z\d]*)*$`. 

### [P004] Array properties **SHOULD **have a plural names

Properties names of arrays **SHOULD **be pluralized to indicate that they contain multiple values. This implies in turn that object names SHOULD be singular 

### [P005] Properties with value `null` and absent properties **MUST** be handled the same way

OpenAPI 3.x allows to mark properties as `required` and as `nullable` to specify whether properties may be absent (`{}`) or can have the value `null` (`{"example":null}`). If a property is defined to be not `required` _and_ `nullable` (see 2nd row in Table below), this rule demands that both cases **MUST** be handled in the exact same manner by specification.

| required | nullable | {}     | {"example":null} |
| -------- | -------- | ------ | ---------------- |
| true     | true     | ❌ No  | ✔ Yes           |
| false    | true     | ✔ Yes | ✔ Yes           |
| true     | false    | ❌ No  | ❌ No            |
| false    | false    | ✔ Yes | ❌ No            |

### [P006] Date properties **MUST NOT** have a time component if only the date is relevant

Properties representing dates (without time) **MUST** use `date` format and **MUST **exclude time components. Including time portions leads to timezone conversion errors where clients may interpret 2026-03-25T00:00:00 as local midnight

### [P007] Date, datetime and time properties **MUST **use RFC9745/ISO8601 date format

All date, datetime and time fields in requests and responses **MUST **adhere to [[RFC9557]] and [[ISO8601-1]] format. Each field in the OpenAPI specification **MUST **set `"type":"string"` and set `"format"` to the OpenAPI format as listed in the following table:

| Field type | ISO8601 format | OpenAPI format         |
| ---------- | -------------- | ---------------------- |
| Date       | full-date      | "format": "date"       |
| Datetime   | date-time      | "format": "date-time"  |
| Time       | partial-time   | "format": "time-local" |

RFC9557 is a profile on ISO8601, but is not a strict subset of allowed notations. Practically, to adhere to both, the following limitations MUST be applied to RFC9557:

- In a field with a date-time value, the date and time component **MUST **be separated by a "T" in uppercase.
- The timezone offset "Z" **MUST **be uppercase.
- "-00:00" **MUST NOT** be used as timezone offset.

### [P008] APIs **MUST **allow all timezone offsets in requests and **SHOULD** use UTC in responses

APIs **MUST** accept any timezone offset in fields in requests containing a datetime. Fields in responses containing a datetime **SHOULD **be in UTC (e.g. Z as timezone offset).

### [P009] Response payloads **MUST **use the standard error payload

When an API request results in an error (HTTP 4xx of HTTP-5xx), the reponse payload **MUST **contain the "Problem Details for HTTP APIs" as speciffied in [RFC 9457](https://datatracker.ietf.org/doc/html/rfc9457).

### 2.1.6 HTTP methods and responses [Hxxx]

Although the REST architectural style does not impose a specific protocol, REST APIs are typically implemented using HTTP [[RFC9110]].

### [H001] API Operations **MUST **use only standard HTTP methods

An API Operation (HTTP-Method plus resource) **MUST **adhere to the HTTP method semantics defined in [[RFC9110]].

The HTTP specifications offer a set of standard methods, where every method is designed with explicit semantics. Adhering to the HTTP specification is crucial, since HTTP clients and middleware applications rely on standardized characteristics. Exception to this rule is the HTTP `PATCH` method, which is not described in RFC9110 but which is allowed (see: ????????????)

The following table shows the effect the HTTP method MUST have when used in a (succesful) request.

| Method   | Operation      | Description                                                                                          |
| -------- | -------------- | ---------------------------------------------------------------------------------------------------- |
| `GET`    | Read           | Retrieve a resource representation for the given [=URI=]. Data is only retrieved and never modified. |
| `POST`   | Create         | Create a new resource instance as part of a collection. This operation is not relevant for singular resources. This method can also be used for [exceptional cases](#/core/resource-operations). |
| `PUT`    | Update         | Replace an existing resource with the given [=URI=] (full update). The resource MAY be created when does not exists. |
| `PATCH`  | Partial Update | Partially updates an existing resource. The request only contains the resource modifications instead of the full resource representation. |
| `DELETE` | Delete         | Remove a resource with the given [=URI=].                                                            |

| Method   | CRUD                  | Collection Resource (e.g. /users)                                                                    | Single Resouce (e.g. /users/123)                                                 |
| -------- | --------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `GET`    | Read                  | 200 (OK), list of users. Use pagination, sorting, and filtering to navigate big lists                | 200 (OK), single user. 404 (Not Found), if ID not found or invalid               |
| `POST`   | Create                | 201 (Created), ‘Location’ header with link to /users/{id} containing new ID                          | Avoid using POST on a single resource                                            |
| `PUT`    | Update/Replace        | 405 (Method not allowed), unless you want to update every resource in the entire collection of resource | 200 (OK) or 204 (No Content). Use 404 (Not Found), if ID is not found or invalid |
| `PATCH`  | Partial Update/Modify | 405 (Method not allowed), unless you want to modify the collection itself                            | 200 (OK) or 204 (No Content). Use 404 (Not Found), if ID is not found or invalid |
| `DELETE` | Delete                | 405 (Method not allowed), unless you want to delete the whole collection — use with caution          | 200 (OK). 404 (Not Found), if ID not found or invalid                            |

Related ADR Rules:

- [/core/http-methods](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/http-methods): Only apply standard HTTP methods

Rules:

- [/core/http-safety](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/http-safety): Adhere to HTTP safety and idempotency semantics for operations
- [/core/http-response-code](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/http-response-code): Adhere to HTTP status codes to convey appropriate errors

The following table shows some examples of the use of standard HTTP methods:

| Request                      | Description                                |
| ---------------------------- | ------------------------------------------ |
| `GET /rijksmonumenten`       | Retrieves a list of national monuments.    |
| `GET /rijksmonumenten/12`    | Retrieves an individual national monument. |
| `POST /rijksmonumenten`      | Creates a new national monument.           |
| `PUT /rijksmonumenten/12`    | Modifies national monument #12 completely. |
| `PATCH /rijksmonumenten/12`  | Modifies national monument #12 partially.  |
| `DELETE /rijksmonumenten/12` | Deletes national monument #12.             |

The HTTP specification [[rfc9110]] offers a set of standard methods, where every method is designed with explicit semantics. HTTP also defines other methods, e.g. `HEAD`, `OPTIONS`, `TRACE`, and `CONNECT`.

The OpenAPI Specification 3.0 [Path Item Object](https://spec.openapis.org/oas/v3.0.1#path-item-object) also supports these methods, except for `CONNECT`.

According to [RFC 9110 9.1](https://www.rfc-editor.org/rfc/rfc9110#name-overview) the `GET` and `HEAD` HTTP methods MUST be supported by the server, all other methods are optional.

In addition to the standard HTTP methods, a server may support other optional methods as well, e.g. `PROPFIND`, `COPY`, `PURGE`, `VIEW`, `LINK`, `UNLINK`, `LOCK`, `UNLOCK`, etc.

If an optional HTTP request method is sent to a server and the server does not support that HTTP method for the target resource, an HTTP status code `405 Method Not Allowed` shall be returned and a list of allowed methods for the target resource shall be provided in the `Allow` header in the response as stated in [RFC 9110 15.5.6](https://www.rfc-editor.org/rfc/rfc9110#name-405-method-not-allowed).

How to test

Analyse the OpenAPI Description to confirm all supported methods are either `post`, `put`, `get`, `delete`, or `patch`.

### [H00x] API Operations **MUST **adhere to HTTP safety and idempotency semantics for operations

API operations **MUST **adhere to HTTP safety and idempotency semantics for operations. 

Request methods are considered **safe **if their defined semantics are essentially read-only. The client does not request, and does not expect, any state change on the origin server as a result of applying a safe method to a target resource.

**Idempotency **essentially means that the effect of a successfully performed request on a server resource is independent of the number of times it is executed. For example, in arithmetic, adding zero to a number is an idempotent operation. An idempotent HTTP method is a method that can be invoked many times without different outcomes. It should not matter if the method has been called only once, or ten times over. The result should always be the same.

The following table describes which HTTP methods **MUST **behave as safe and/or idempotent:

| Method    | Safe | Idempotent |
| --------- | ---- | ---------- |
| `GET`     | Yes  | Yes        |
| `HEAD`    | Yes  | Yes        |
| `OPTIONS` | Yes  | Yes        |
| `POST`    | No   | No         |
| `PUT`     | No   | Yes        |
| `PATCH`   | No   | No         |
| `DELETE`  | No   | Yes        |

Rationale

The HTTP protocol [[rfc9110]] specifies whether an HTTP method **SHOULD** be considered safe and/or idempotent. These characteristics are important for clients and middleware applications, because they **SHOULD** be taken into account when implementing caching and fault tolerance strategies.

Request methods are considered *safe* if their defined semantics are essentially read-only; i.e., the client does not request, and does not expect, any state change on the origin server as a result of applying a safe method to a target resource. A request method is considered *idempotent* if the intended effect on the server of multiple identical requests with that method is the same as the effect for a single such request.

### [H00x] API Responses **MUST** use standard HTTP status codes to convey appropriate errors

API Responses **MUST** use standard HTTP status codes to convey appropriate errors. Always use the semantically appropriate HTTP [status code](https://www.rfc-editor.org/rfc/rfc9110#name-status-codes) ([[rfc9110]]) for the response.

Rationale

The server **SHOULD NOT** only use `200` for success and `404` for error states. Use the semantically appropriate status code for success or failure.

In case of an error, the server **SHOULD NOT** pass technical details (e.g. call stacks or other internal hints) to the client. The error message **SHOULD **be generic to avoid revealing additional details and expose internal information which can be used with malicious intent.

## Statelessness

One of the key constraints of the REST architectural style is stateless communication between client and server. It means that every request from client to server must contain all of the information necessary to understand the request. The server cannot take advantage of any stored session context on the server as it didn’t memorize previous requests. Session state must therefore reside entirely on the client.

To properly understand this constraint, it is important to make a distinction between two different kinds of state:

- *Session state*: information about the interactions of an end user with a particular client application within the same user session, such as the last page being viewed, the login state or form data in a multi-step registration process. Session state must reside entirely on the client (e.g. in the user's browser).
- *Resource state*: information that is permanently stored on the server beyond the scope of a single user session, such as the user's profile, a product purchase or information about a building. Resource state is persisted on the server and must be exchanged between client and server (in both directions) using representations as part of the request or response payload. This is actually where the term *REpresentational State Transfer (REST)* originates from.

It is a misconception that there should be no state at all. The stateless communication constraint should be seen from the server's point of view and states that the server should not be aware of any *session state*.

Stateless communication offers many advantages, including:

- *Simplicity* is increased because the server does not have to memorize or retrieve session state while processing requests
- *Scalability* is improved because not having to incorporate session state across multiple requests enables higher concurrency and performance
- *Observability* is improved since every request can be monitored or analyzed in isolation without having to incorporate session context from other requests
- *Reliability* is improved because it eases the task of recovering from partial failures since the server does not have to maintain, update or communicate session state. One failing request does not influence other requests (depending on the nature of the failure of course).

Do not maintain session state on the server

Statement

In the context of REST APIs, the server MUST NOT maintain or require any notion of the functionality of the client application and the corresponding end user interactions.

Rationale

To achieve full decoupling between client and server, and to benefit from the advantages mentioned above, session state MUST NOT reside on the server. Session state MUST therefore reside entirely on the client.

The client of a REST API could be a variety of applications such as a browser application, a mobile or desktop application and even another server serving as a backend component for another client. REST APIs should therefore be completely client-agnostic.

## Relationships

Resources are often interconnected by relationships. Relationships can be modelled in different ways depending on the cardinality, semantics and more importantly, the use cases and access patterns the REST API needs to support.

Use nested URIs for child resources

Statement

When having a child resource which can only exist in the context of a parent resource, the [=URI=] SHOULD be nested.

Rationale

In this use case, the child resource does not necessarily have a top-level collection resource. The best way to explain this design rule is by example.

When modelling resources for a news platform including the ability for users to write comments, it might be a good strategy to model the [=collection resources=] hierarchically:

https://api.example.org/v1/articles/123/comments

The platform might also offer a photo section, where the same commenting functionality is offered. In the same way as for articles, the corresponding sub-collection resource might be published at:

https://api.example.org/v1/photos/456/comments

These nested sub-collection resources can be used to post a new comment (`POST` method) and to retrieve a list of comments (`GET` method) belonging to the parent resource, i.e. the article or photo. An important consideration is that these comments could never have existed without the existence of the parent resource.

From the consumer's perspective, this approach makes logical sense, because the most obvious use case is to show comments below the parent article or photo (e.g. on the same web page) including the possibility to paginate through the comments. The process of posting a comment is separate from the process of publishing a new article. Another client use case might also be to show a global *latest comments* section in the sidebar. For this use case, an additional resource could be provided:

https://api.example.org/v1/comments

If this would have not been a meaningful use case, this resource should not exist at all. Because it does not make sense to post a new comment from a global context, this resource would be read-only (only `GET` method is supported) and may possibly provide a more compact representation than the parent-specific sub-collections.

The [=singular resources=] for comments, referenced from all 3 collections, could still be modelled on a higher level to avoid deep nesting of URIs (which might increase complexity or problems due to the URI length):

https://api.example.org/v1/comments/123

https://api.example.org/v1/comments/456

Although this approach might seem counterintuitive from a technical perspective (we simply could have modelled a single `/comments` resource with optional filters for article and photo) and might introduce partially redundant functionality, it makes perfect sense from the perspective of the consumer, which increases developer experience.

## Operations

Model resource operations as a sub-resource or dedicated resource

Statement

Model resource operations as a sub-resource or dedicated resource.

Rationale

There are resource operations which might not seem to fit well in the CRUD interaction model. For example, approving a submission or notifying a customer. Depending on the type of the operation, there are three possible approaches:

1. Re-model the resource to incorporate extra fields supporting the particular operation. For example, an approval operation can be modelled in a boolean attribute `goedgekeurd` that can be modified by issuing a `PATCH` request against the resource. A drawback of this approach is that the resource does not contain any metadata about the operation (when and by whom was the approval given? Was the submission rejected in an earlier stage?). Furthermore, this requires a fine-grained authorization model, since approval might require a specific role.
2. Treat the operation as a sub-resource. For example, model a sub-collection resource `/inzendingen/12/beoordelingen` and add an approval or rejection by issuing a `POST` request. To be able to retrieve the review history (and to consistently adhere to the REST principles), also support the `GET` method for this resource. The `/inzendingen/12` resource might still provide a `goedgekeurd` boolean attribute (same as approach 1) which gets automatically updated in the background after adding a review. This attribute SHOULD however be read-only.
3. In exceptional cases, the approaches above still do not offer an appropriate solution. An example of such an operation is a global search across multiple resources. In this case, the creation of a dedicated resource, possibly nested under an existing resource, is the most obvious solution. Use the imperative mood of a verb, maybe even prefix it with a underscore to distinguish these resources from regular resources. For example: `/search` or `/_search`. Depending on the operation characteristics, `GET` and/or `POST` method MAY be supported for such a resource.

## Documentation

An API is as good as the accompanying documentation. The documentation has to be easily findable, searchable and publicly accessible. Most developers will first read the documentation before they start implementing. Hiding the technical documentation in PDF documents and/or behind a login creates a barrier for both developers and search engines.

Use OpenAPI Specification for documentation

Statement

API documentation MUST be provided in the form of an OpenAPI definition document which conforms to the OpenAPI Specification (from v3 onwards).

Rationale

The OpenAPI Specification (OAS) [[OPENAPIS]] defines a standard, language-agnostic interface to RESTful APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection. When properly defined, a consumer can understand and interact with the remote service with a minimal amount of implementation logic.

 API documentation MUST be provided in the form of an OpenAPI definition document which conforms to the OpenAPI Specification (from v3 onwards). As a result, a variety of tools can be used to render the documentation (e.g. Swagger UI or ReDoc) or automate tasks such as testing or code generation. The OAS document SHOULD provide clear descriptions and examples.

How to test

Parse the resource at the provided location as an OpenAPI Description and confirm all $refs are resolvable and paths are defined.

Document contact information for publicly available APIs

Statement

OpenAPI definition document SHOULD include the [`info.contact`](https://spec.openapis.org/oas/v3.0.1.html#contact-object) object for publicly available APIs. Contact information SHOULD NOT be a generic contact address for the whole organisation.

Rationale

The OpenAPI Specification (OAS) [[OPENAPIS]] can include contact information to make clear how to reach out to API owners in case of issues or questions. This is relevant for publicly available APIs (such as OData) where no pre-existing communication channel exists between provider and consumer of the API. For internal APIs (where communication channels such as chat or issue trackers are likely already known), the `info.contact` MAY be provided.

Relevant contact information can include an email address and issue tracker.

```
{
  "name": "Gebouwen API beheerder",
  "url": "https://www.github.com/ministerie/gebouwen/issues",
  "email": "teamgebouwen@ministerie.nl"
}
```

How to test

Parse the OpenAPI Description to confirm the `info.contact` object is present.

Publish documentation in Dutch unless there is existing documentation in English

Statement

You SHOULD write the OAS document in Dutch.

Rationale

In line with design rule [/core/interface-language](#/core/interface-language), the OAS document (e.g. descriptions and examples) SHOULD be written in Dutch. If relevant, you MAY refer to existing documentation written in English.

Publish OAS document at a standard location in JSON-format

Statement

To make the OAS document easy to find and to facilitate self-discovering clients, there SHOULD be one standard location where the OAS document is available for download.

Rationale

It MUST be possible for clients (such as Swagger UI or ReDoc) to retrieve the document without having to authenticate. Furthermore, the CORS policy for this [=URI=] MUST allow external domains to read the documentation from a browser environment.

The standard location for the OAS document is a URI called `openapi.json` or `openapi.yaml` within the base path of the API. This can be convenient, because OAS document updates can easily become part of the CI/CD process.

At least the JSON format MUST be supported. When having multiple (major) versions of an API, every API version SHOULD provide its own OAS document(s).

An API having base path `https://api.example.org/v1` MUST publish the OAS document at:

https://api.example.org/v1/openapi.json

Optionally, the same OAS document MAY be provided in YAML format:

https://api.example.org/v1/openapi.yaml

How to test

- Step 1: The API MUST meet the prerequisites to be tested. These include that an OAS file (openapi.json) is publicly available, parsable, all $refs are resolvable and paths are defined.
- Step 2: The openapi.yaml document MAY be available. If available it MUST contain YAML, be readable and parsable.
- Step 3: The openapi.yaml document MUST contain the same OpenAPI Description as the openapi.json document.
- Step 4: The CORS header Access-Control-Allow-Origin MUST allow all origins.

## Versioning

Changes in APIs are inevitable. APIs should therefore always be versioned, facilitating the transition between changes.

Include a deprecation schedule when deprecating features or versions

Statement

Implement well-documented deprecation schedules that are communicated in a timely fashion.

Rationale

Managing change is important. In general, good documentation and timely communication regarding deprecation schedules are the most important for API users. When deprecating features or versions, a deprecation schedule MUST be published. This document SHOULD be published on a public web page. Furthermore, active clients SHOULD be informed by e-mail once the schedule has been updated or when versions have reached end-of-life.

Schedule a fixed transition period for a new major API version

Statement

Old versions MUST remain available for a limited and fixed deprecation period.

Rationale

When releasing a new major API version, the old version MUST remain available for a limited and fixed deprecation period. Offering a deprecation period allows clients to carefully plan and execute the migration from the old to the new API version, as long as they do this prior to the end of the deprecation period. A maximum of 2 major API versions MAY be published concurrently.

Include the major version number in the URI

Statement

The [=URI=] of an API MUST include the major version number.

Rationale

The [=URI=] of an API (base path) MUST include the major version number, prefixed by the letter `v`. This allows the exploration of multiple versions of an API in the browser. The minor and patch version numbers are not part of the [=URI=] and MAY not have any impact on existing client implementations.

An example of an `openapi.yaml` for an API with a base path `https://api.example.org/v1` and current version 1.0.2:

```
openapi: 3.0.0
   info:
      version: '1.0.2'
   servers:
      - description: test environment
      url: https://api.test.example.org/v1
      - description: production environment
      url: https://api.example.org/v1
```

How to test

Parse the `url` field in the `servers` mentioned in the OpenAPI Description to confirm that a version number is present with prefix `v` and only contains the *major* version number.

Publish a changelog for API changes between versions

Statement

Publish a changelog.

Rationale

When releasing new (major, minor or patch) versions, all API changes MUST be documented properly in a publicly available changelog.

Adhere to the Semantic Versioning model when releasing API changes

Statement

Implement Semantic Versioning.

Rationale

Version numbering MUST follow the Semantic Versioning [[SemVer]] model to prevent breaking changes when releasing new API versions. Release versions are formatted using the `major.minor.patch` template (examples: 1.0.2, 1.11.0). Pre-release versions MAY be denoted by appending a hyphen and a series of dot separated identifiers (examples: 1.0.2-rc.1, 2.0.0-beta.3). When releasing a new version which contains backwards-incompatible changes, a new major version MUST be released. Minor and patch releases MUST only contain backwards compatible changes (e.g. the addition of an endpoint or an optional attribute).

How to test

Parse the `info.version` field in the OpenAPI Description to confirm it adheres to the Semantic Versioning format.

Return the full version number in a response header

Statement

Return the API-Version header.

Rationale

Since the URI only contains the major version, it is useful to provide the full version number in the response headers for every API call. This information could then be used for logging, debugging or auditing purposes. In cases where an intermediate networking component returns an error response (e.g. a reverse proxy enforcing access policies), the version number MAY be omitted.

The version number MUST be returned in an HTTP response header named `API-Version` (case-insensitive) and SHOULD NOT be prefixed.

An example of an API version response header:

API-Version: 1.0.2

How to test

A response includes a header "API-Version" with a number matching the version number set in the `info.version` field of the OpenAPI Description.

## Transport Security

This section describes security principles, concepts and technologies to apply when working with APIs.

Controls need to be applied for the security objectives of integrity, confidentiality and availability of the API (which includes the services and data provided thereby).

The [architecture section of the API strategy](https://docs.geostandaarden.nl/api/API-Strategie-architectuur/) contains architecture patterns for implementing transport security.

The scope of this section is limited to generic security controls that directly influence the visible parts of an API.

Effectively, only security standards directly applicable to interactions are discussed here.

In order to meet the complete security objectives, every implementer MUST also apply a range of controls not mentioned in this section.

Note: security controls for signing and encrypting of application level messages are part of separate extensions: [Signing](https://geonovum.github.io/KP-APIs/API-strategie-modules/signing-jades/) and [Encryption](https://geonovum.github.io/KP-APIs/API-strategie-modules/encryption/).

Secure connections using TLS

Statement

One should secure all APIs assuming they can be accessed from any location on the internet. Information MUST be exchanged over TLS-based secured connections. No exceptions, so everywhere and always. This is [required by law](https://wetten.overheid.nl/BWBR0048156/2023-07-01).

One MUST follow the latest NCSC guidelines [[NCSC 2025]].

Rationale

Since the connection is always secured, the access method can be straightforward. This allows the application of basic access tokens instead of encrypted access tokens.

How to test

The usage of TLS is machine testable. Follow the latest NCSC guidelines on what is required to test. The serverside is what will be tested, only control over the server is assumed for testing. A testing client will be employed to test adherence of the server. Supporting any protocols, algorithms, key sizes, options or ciphers that are deemed insufficient or phased out by NCSC will lead to failure on the automated test. Both positive and negative scenarios are part of the test: testing that a subset of *Good* and *Sufficient* configurations are supported and configurations deemed *Insufficient* or marked for *Phase out*. A manual exception to the automated test results can be made when configurations designated for *Phase out* are supported; The API provider will have to provide clear documentation regarding the phase out schedule.

No sensitive information in URIs

Statement

Do not put any sensitive information in URIs

Rationale

Even when using TLS connections, information in URIs is not secured. URIs can be cached and logged outside of the servers controlled by clients and servers. Any information contained in them should therefore be considered readable by anyone with access to the network (in the case of the internet, the whole world) and MUST NOT contain any sensitive information. This includes client secrets used for authentication, privacy sensitive information such as BSNs or any other information which should not be shared.

Be aware that queries (anything after the '?' in a URI) are also part of a URI.

### HTTP-level Security

The guidelines and principles defined in this section are client agnostic.

When implementing a client agnostic API, one SHOULD at least facilitate that multi-purpose generic HTTP-clients like browsers are able to securely interact with the API.

When implementing an API for a specific client it may be possible to limit measures as long as it ensures secure access for this specific client.

Nevertheless it is advised to review the following security measures, which are mostly inspired by the [OWASP REST Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html).

Even while remaining client agnostic, clients can be classified in four major groups.

This is in line with common practice in [[[?OAuth2]]].

The groups are:

1. Web applications.
2. Native applications.
3. Browser-based applications.
4. System-to-system applications.

This section contains elements that apply to the generic classes of clients listed above.

Although not every client implementation has a need for all the specifications referenced below, a client agnostic API SHOULD provide these to facilitate any client to implement relevant security controls.

Most specifications referenced in this section are applicable to the first three classes of clients listed above.

Security considerations for native applications are provided in [[[rfc8252]]], much of which can help non-OAuth2 based implementations as well.

For browser-based applications a subsection is included with additional details and information.

System-to-system (sometimes called machine-to-machine) may have a need for the listed specifications as well.

Note that different usage patterns may be applicable in contexts with system-to-system clients, see above under Client Authentication.

Realizations may rely on internal usage of HTTP-Headers.

Information for processing requests and responses can be passed between components, that can have security implications.

For instance, this is common practice between a reverse proxy or TLS-offloader and an application server.

Additional HTTP headers are used in such example to pass an original IP-address or client certificate.

Implementations MUST consider filtering both inbound and outbound traffic for HTTP-headers used internally.

The primary focus of inbound filtering is to prevent injection of malicious headers on requests.

For outbound filtering, the main concern is leaking of information.

Use mandatory security headers in all API responses

Statement

Return API security headers in all server responses to instruct the client to act in a secure manner

Rationale

There are a number of security related headers that can be returned in the HTTP responses to instruct browsers to act in specific ways. However, some of these headers are intended to be used with HTML responses, and as such may provide little or no security benefits on an API that does not return HTML. The following headers SHOULD be included in all API responses:

| Header                                            | Rationale                                                                                            |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `Cache-Control: no-store`                         | Prevent sensitive information from being cached.                                                     |
| `Content-Security-Policy: frame-ancestors 'none'` | To protect against drag-and-drop style clickjacking attacks.                                         |
| `Content-Type`                                    | To specify the content type of the response. This SHOULD be `application/json` for JSON responses.   |
| `Strict-Transport-Security`                       | To require connections over HTTPS and to protect against spoofed certificates.                       |
| `X-Content-Type-Options: nosniff`                 | To prevent browsers from performing MIME sniffing, and inappropriately interpreting responses as HTML. |
| `X-Frame-Options: DENY`                           | To protect against drag-and-drop style clickjacking attacks.                                         |
| `Access-Control-Allow-Origin`                     | To relax the 'same origin' policy and allow cross-origin access. See [/core/transport/cors](#/core/transport/cors) for more information. |

The headers below are only intended to provide additional security when responses are rendered as HTML. As such, if the API will never return HTML in responses, then these headers may not be necessary. You SHOULD include the headers as part of a defense-in-depth approach if there is any uncertainty about the function of the headers, the types of information that the API returns or information it may return in the future.

| Header                                        | Rationale                                                              |
| --------------------------------------------- | ---------------------------------------------------------------------- |
| `Content-Security-Policy: default-src 'none'` | The majority of CSP functionality only affects pages rendered as HTML. |
| `Feature-Policy: 'none'`                      | Feature policies only affect pages rendered as HTML.                   |
| `Referrer-Policy: no-referrer`                | Non-HTML responses should not trigger additional requests.             |

In addition to the above listed HTTP security headers, web- and browser-based applications SHOULD apply [[[SRI]]]. When using third-party hosted contents, e.g. using a Content Delivery Network, this is even more relevant. While this is primarily a client implementation concern, it may affect the API when it is not strictly segregated or for example when shared supporting libraries are offered.

How to test

The presence of the mandatory security headers can be tested in an automated way. A test client makes a call to the API root. The response is tested for the presence of mandatory headers.

Use CORS to control access

Statement

Use CORS to restrict access from other domains for applicable resources

Rationale

Different resources can have different uses, as some resources are publicly available whereas others are restricted to several domains.

 Modern web browsers use Cross-Origin Resource Sharing (CORS) to minimize the risk associated with cross-site HTTP-requests.

By default browsers only allow 'same origin' access to resources.

 This means that responses on requests to another `[scheme]://[hostname]:[port]` than the `Origin` request header of the initial request will not be processed by the browser.

 To enable cross-site requests APIs can return a `Access-Control-Allow-Origin` response header.

An allowlist SHOULD be used to determine the validity of different cross-site requests.

 To do this, check the `Origin` header of the incoming request and check if the domain in this header is on the allowlist.

 If this is the case, set the incoming `Origin` header in the `Access-Control-Allow-Origin` response header.

Using a wildcard `*` in the `Access-Control-Allow-Origin` response header is NOT RECOMMENDED, because it disables CORS-security measures.

 However, if the resource has to be accessed by numerous other origins that are not known up front (such as all resources in an open API, or the `openapi.json` as required by [/core/publish-openapi](#/core/publish-openapi)), you MAY use `*`.

How to test

Tests of this design rule can only be performed when the intended client is known to the tester. A test can be performed when this information is provided by the API provider. Otherwise no conclusive test result can be reached.

### Browser-based applications

A specific subclass of clients are browser-based applications, that require the presence of particular security controls to facilitate secure implementation.

Clients in this class are also known as *user-agent-based* or *single-page-applications* (SPA).

All browser-based applications SHOULD follow the best practices specified in [OAuth 2.0 for Browser-Based Apps](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps-22).

These applications can be split into three architectural patterns:

- JavaScript applications with a backend; with this class of applications, the backend is the confidential client and should intermediate any interaction, with tokens never ending up in the browser.

  Effectively, these are not different from regular web-application for this security facet, even though they leverage JavaScript for implementation.
- JavaScript applications that share a domain with the API (resource server); these can leverage cookies marked as HTTP-Only, Secure and SameSite.
- JavaScript applications without a backend; these clients are considered public clients, and are potentially more vulnerable to several types of attacks, including Cross-Site Scripting (XSS), Cross Site Request Forgery (CSRF) and OAuth token theft.

  In order to support these clients, the Cross-Origin Resource Sharing (CORS) policy mentioned above is critical and MUST be supported.

### Validate content types

A REST request or response body SHOULD match the intended content type in the header.

Otherwise this could cause misinterpretation at the consumer/producer side and lead to code injection/execution.

- Reject requests containing unexpected or missing content type headers with HTTP response status `406 Not Acceptable` or `415 Unsupported Media Type`.
- Avoid accidentally exposing unintended content types by explicitly defining content types e.g. Jersey (Java) `@consumes("application/json"); @produces("application/json")`.

  This avoids XXE-attack vectors for example.

It is common for REST services to allow multiple response types (e.g. `application/xml` or `application/json`, and the client specifies the preferred order of response types by the Accept header in the request.

- Do NOT simply copy the `Accept` header to the `Content-type` header of the response.
- Reject the request (ideally with a `406 Not Acceptable` response) if the Accept header does not specifically contain one of the allowable types.

Services (potentially) including script code (e.g. JavaScript) in their responses MUST be especially careful to defend against header injection attacks.

- Ensure the intended Content-Type headers are sent in the response, matching the body content, e.g. `application/json` and not `application/javascript`.

## Normative modules

The following modules are normative for all REST API's.

Apply the geospatial module for geospatial data

Statement

The [[[ADR-GEO]]] version 1.0.x MUST be applied when providing geospatial data or functionality.

Geospatial data refers to information that is associated with a physical location on Earth, often expressed by its 2D/3D coordinates.

Rationale

The [[[ADR-GEO]]] formalizes as set of rules regarding:

1. How to encode geospatial data in request and response payloads.
2. How resource collections can be filtered by a given bounding box.
3. How to deal with different coordinate systems (CRS).

Apply the signing module for signing payloads

Statement

The [[[ADR-signing]]] version 1.0.x MUST be applied when signing payloads.

This rule does not dictate signing.

 Instead, it only applies in situations where there is a need for assurance of end to end message integrity and authenticity between client application and server application.

 In those situations, [[[ADR-signing]]] specifies how to sign.

Rationale

The [[[ADR-signing]]] formalizes as set of rules regarding:

1. How to sign data in request and response payloads.
2. Which header to specify the signature.

Apply the encryption module for encrypting payloads

Statement

The [[[ADR-encryption]]] version 1.0.x MUST be applied when encrypting payloads.

This rule does not dictate encryption.

 Instead, it only applies in situations where there is a need for end to end message payload confidentiality between client application and server application.

 In those situations, [[[ADR-encryption]]] specifies how to encrypt.

Rationale

The [[[ADR-encryption]]] formalizes as set of rules regarding:

1. How to encrypt data in request and response payloads.
2. The flow of operations between client and server.

If both the signing and encryption modules apply, use the following flow of operations:

Signing in combination with encryption