# AGRI API Style Guide

## AgroConnect Standard

Draft version April 2026

This document replaces the current  _Guideline API Development Agrifood, v2.2.0_ (20260209.AgroConnect_Guideline_API_developement_v2_2_0.docx)

#### Author

Bernard van Raaij ([Van Raaij Advies](mailto:bernard@vanraaijadvies.nl))

#### Contributors

Conny Graumans ([AgroConnect](www.agroconnect.nl))

#### Credits

This document has been prepared with grateful acknowledgement of the documentation of the API Design Rules from the [Kennisplatform API's](https://developer.overheid.nl/communities/kennisplatform-apis). We also used the [Zalando RESTful API and Event Guidelines](https://opensource.zalando.com/RESTful-api-guidelines/) as a source of inspiration.

---

## Status of This Document

This is a draft that could be altered, removed or be replaced by other documents. It is not a recommendation approved by AgroConnect.

## Conformance

_As well as sections marked as non-normative, all authoring guidelines, diagrams, examples, and notes in this specification are non-normative. Everything else in this specification is normative._

The key words "**MUST**", "**MUST NOT**", "**REQUIRED**", "**SHALL**", "**SHALL NOT**", "**SHOULD**", "**SHOULD NOT**", "**RECOMMENDED**", "**NOT RECOMMENDED**", "**MAY**", and "**OPTIONAL**" in this document are to be interpreted as described in [BCP 14](https://www.rfc-editor.org/info/bcp14) [[RFC2119](https://datatracker.ietf.org/doc/html/rfc2119)]  [[RFC8174](https://datatracker.ietf.org/doc/html/rfc8174)] when, and only when, they appear in all capitals, as shown here.

## 1. Introduction

More and more organizations in the Agri- and Food domain offer REST APIs (abbreviated as APIs), in addition to existing interfaces like SOAP and WFS. AgroConnect supports this development. These APIs aim to be developer-friendly and easy to implement. While this is a commendable aim, it does not shield a developer from a steep learning curve getting to know every new API, in particular when every individual API is designed using different patterns and conventions.

This document aims to describe a widely applicable set of design rules for the unambiguous provisioning of REST (aka RESTful) APIs. The primary goal is to offer guidance for organizations designing new APIs, with the purpose of increasing developer experience (DX) and interoperability between APIs. Hopefully, many organizations (especially AgroConnect members) will adopt these design rules in their corporate API strategies and provide feedback about exceptions and additions to subsequently improve these design rules.

With this in mind, AgroConnect adopts "API First" as a key engineering principle. API development begins with API specification outside the code and ideally involves ample peer-review feedback to achieve high-quality APIs. API First encompasses a set of quality-related standards. We encourage organizations in the Agri- and Food domain to follow them to ensure that APIs:

- are easy to understand and learn
- are general and abstracted from specific implementation and use cases
- are robust and easy to use
- have a common look and feel
- follow a consistent RESTful style and syntax
- are consistent with other orrganizations’ APIs

Ideally, all APIs in the Agri- and Food domain will look as if the same author created them.

## 2. Normative API Design Rules

This chapter containts the list of API Design Rules in the *AGRI API Style Guide. The rules concern the followig categories:*

1. Basic Meta information and Versioning
2. Security 
3. URLs and Resources
4. Adherence to RESTful principles
5. Payloads
6. HTTP methods and responses 

The list of API Design Rules in this Guide is partially based on the [NLGov REST API Design Rules](https://gitdocumentatie.logius.nl/publicatie/api/adr/) as published by Forum Standaardisatie ([REST-API Design Rules | Forum Standaardisatie](https://www.forumstandaardisatie.nl/open-standaarden/rest-api-design-rules)). Our set of rules is composed of:

- rules **inherited** from the *REST-API Design Rules* (short: _ADR_): these rules apply unmodified but guiding examples can be changed to the Agri- and Food context 
- rules adapted from the _REST-API Design Rules_ which are **customized** (including examples)
- rules which are not part of the _REST-API Design Rules_ and which are specifically designed for this *AGRI API Style Guide*.

### 2.1 Basic Meta Information and Versioning [Mxxx]

The API specification, also referred to as the API contract, serves as the primary reference for third parties developing client implementations. Its objective is to provide client developers with comprehensive details required to implement conformant clients. The rules in this section define the mandated publication format and the specific elements that must be included in the specification. This section also defines the versioning rules for the specification to ensure controlled evolution and maintain backward compatibility after the initial formal release.

### [M001] API Specification **MUST** be specified and published using OpenAPI

We use the standard provided by the [OpenAPI Initiative](https://www.openapis.org/) to define API specifications, so the API contract **MUST** be specified using OpenAPI. API designers **SHOULD** provide the API specification using a single self-contained YAML file for better readability. The specification **MAY** be published using a single JSON file.

Inherited ADR:

- [/core/doc-openapi](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/doc-openapi): Use OpenAPI Specification for documentation
- [/core/publish-openapi](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/publish-openapi): Publish OAS document at a standard location in JSON-format

### [M002] API Specification **MUST** contain API meta information 

API specifications **MUST** contain the following [OpenAPI meta information](https://spec.openapis.org/oas/latest.html#info-object):

- `#/info/title` a (unique) identifying, functional descriptive name of the API
- `#/info/version` the API specification document version following [**MUST** use semantic versioning](https://opensource.zalando.com/RESTful-api-guidelines/#116)
- `#/info/description` a proper description of the API
- `#/info/contact/{name,url,email}` contact info of the team owning the API specification

Inherited ADR:

- [/core/doc-openapi-contact](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/doc-openapi-contact): Document contact information for publicly available APIs

### [M003] API Specification **MUST** be written using U.S. English

The API specification **MUST** be written in U.S. English. 

Customized ADR:

This rule differs slightly from the ADR rules which allow English but prefer Dutch. 

- [/core/doc-language](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/doc-language): Publish documentation in Dutch unless there is existing documentation in English
- [/core/interface-language](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/interface-language): Define interfaces in Dutch unless there is an official English glossary available

### [M004] API Specification and implementation **MUST** use semantic versioning

OpenAPI requires the definition of API specification version via `#/info/version`. Note, this API specification document version is distinct from the OpenAPI Specification version (also required, e.g. `openapi: 3.0.4`), or the API Implementation version — see [Basic Terminology](https://opensource.zalando.com/RESTful-api-guidelines/#terminology).

We expect API designers to comply with [Semantic Versioning 2.0](http://semver.org/spec/v2.0.0.html) with the standard version format `major.minor.patch` as follows:

- Increment the `MAJOR` version when you make incompatible API changes after having aligned the changes with consumers. Consumers *have to adapt* their clients to be able to use this version
- Increment the `MINOR` version when you add new functionality in a backwards-compatible manner. Consumers only have to adapt their clients to the new version to be able to use the new features, though they can use existing features from earlier versions working without modifying their client software implementation
- Optionally increment the `PATCH` version when you make backwards-compatible bug fixes or editorial changes not affecting the functionality. Consumers do not have to modify their software implementation to use this newer version

Inherited ADR:

- [/core/semver](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/semver): Adhere to the Semantic Versioning model when releasing API changes
- [/core/deprecation-schedule](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/deprecation-schedule): Include a deprecation schedule when deprecating features or versions
- [/core/transition-period](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/transition-period): Schedule a fixed transition period for a new major API version
- [/core/changelog](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/changelog): Publish a changelog for API changes between versions

### [M005] The MAJOR version **MUST** be specified in the HTTP request header

To support multiple simultaneously deployed `major` versions, clients **MUST** indicate the targeted major API-version in the HTTP request header using the `Major-Version` header parameter. The recommended format is `v1`, `v2`, and so on. 

URL-based versioning (as in `../v1/growers/...`) **SHOULD NOT** be used, because the URL represents the unique address of a resource (and not the API), which itself is not versioned.

Customized ADR:

This rule differs from the ADR rule [/core/uri-version](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/uri-version) which _does_ prescribe URI-based versioning:

- [](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/semver)[/core/uri-version](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/uri-version): Include the major version number in the URI

### [M006] The full API version **MUST** be returned in the HTTP response header

For tracing and debugging purposes, the full API version (i.e. `major.minor.patch`) **MUST** be returned to the client in the `API-Version` HTTP response header.

Inherited ADR:

- [/core/version-header](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/version-header): Return the full version number in a response header

### [M007] The identification of the client software package **MAY** be specified in the HTTP request header

Although APIs are client-agnostic, the client **MAY** pass the name and software version which is calling the API in the standard HTTP request header `User-Agent`.

### [M008] A unique, server-side assigned request identifier **MUST** be returned in the HTTP response header

For tracing and debugging purposes, a unique, server-side assigned request identifier (preferably a UUID) **MUST** be returned to the client in the `Request-Id` HTTP response header. Note that a request identifier tracks a specific request (and its downstream calls) on a resource, while a resource identifier (typically the URL path) uniquely identifies the target resource itself, which can be subject of multiple different requests.

### [M009] The request date-time **MUST** be returned in the HTTP response header

For tracing and debugging purposes, a unique, server-side generated date-time timestamp **MUST** be returned to the client in the `Request-Date-Time` HTTP response header. 

### 2.2 Security [Sxxx] (under construction)

Related ADR Rules:

- [/core/transport/tls](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/transport/tls): Secure connections using TLS
- [/core/transport/security-headers](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/transport/security-headers): Use mandatory security headers in API all responses
- [/core/transport/cors](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/transport/cors): Use CORS to control access
- [/core/transport/no-sensitive-uris](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/transport/no-sensitive-uris): No sensitive information in URIs

### 2.3 URLs and Resources ([Uxxx])

The key abstraction of information in REST is a _resource_. Any information that we can name can be a resource. Each resource is identified by a unique address, the Uniform Resource Identifier (URI), which is part of the Uniform Resource Locator (URL). We distinghuish two types of resources:

- **Collection** (resources): a resource that represents a _set of items_ of the same type. An example is the collection (list) of growers on a crop management platform which can be accessed with the URI `.../growers`
- **Singleton** (resources): a resource that represents _one specific item_ from that set. An example is a specific grower on a crop management platform who has GLN (Global Location Number) issued by GS1 with value 8700292113955 as unique identification which can be accessed with the URI `.../growers/com.gs1.codelists.gln/8700292113955`

This section defines the rules for naming resources and constructing URLs to identify them.

### [U001] URLs **SHOULD NOT** use /api as base path

URLs **SHOULD NOT** use `/api` as base path. In most cases, all resources provided by a service are part of the public API, and therefore should be made available under the root "/" base path.

### [U002] Nouns **MUST** be used to name resources

Resources **MUST** be referred to using nouns (instead of verbs) that represent entities meaningful to the API consumer. 

Inherited ADR:

- [/core/naming-resources](https://gitdocumentatie.logius.nl/publicatie/api/adr/#/core/naming-resources): Use nouns to name resources

### [U003] Resource names **MUST** be plural

Resources represent collections and therefore always **MUST** be referred to with a plural noun. Singleton resources always are referred to with the (plural) name of the collection resource it belongs to, followed by their resource identifier.

Inherited ADR:

- [/core/naming-collections](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/naming-collections): Use plural nouns to name collection resources

### [U003] Resources and sub-(or child-)resources **MUST** be identified via path segments

Hierarchical relationships between resources **MUST** be represented as resources with sub-resources in the URI path.

Inherited ADR:

- [/core/nested-child](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/nested-child): Use nested URIs for child resources
- [/core/resource-operations](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/resource-operations): Model resource operations as a sub-resource or dedicated resource

### [U004] All path segments identifying the resource **MUST** be written in kebab-case 

Path segments of a URI **MUST** only contain lowercase letters, digits or hyphens. This is also known as [kebab-case](https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case). Hyphens **MUST** only be used to delineate distinct words. This also implies that diacritics **MUST** be normalized and special characters **MUST** be omitted. Following this rule, each URI-segment must match regex `^[a-z][a-z\-0-9]*$`. The first character **MUST** be a lower case letter, and subsequent characters can be a lower case letter, or a dash(`-`), or a number.

Another implication of this rule is that file extensions **MUST NOT** be used (since a `"."` is not permitted in a URI). Resources **SHOULD** use the `Accept` header for content negotiation.

The last path segment **MAY** start with `_`, which is used as a convention to implement [operations](#/core/resource-operations)

Rationale

Some web servers and frameworks do not handle case sensitivity or special characters of URIs well. The use of kebab-case path segments ensures compatibility with a broad range of systems. It is a more common implementation choice for path segments than camelCase or snake_case. Information (such as names of objects) that requires special characters can be part of the request body instead of being in the URI.

### [U005] URL Paths **MUST** be normalized without empty path segments and trailing slashes

You **MUST NOT** specify paths with duplicate or trailing slashes, e.g. `.../growers//crops` or `.../growers/`. As a consequence, you **MUST NOT** specify or use path variables with empty string values.

When requesting a resource including a trailing slash, this **MUST** result in a `404 Not Found` error response and not in a redirect. This forces API consumers to use the correct URI.

This rule does not apply to the root resource (append `/` to the service root URL).

Customized ADR:

- [/core/no-trailing-slash](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/no-trailing-slash): Leave off trailing slashes from URIs

### [U006] Query parameters **MUST** be written in lowerCamelCase 

Query parameters (a.k.a query keys) in a URI **MUST** be lowerCamelCase matching regex `^\$?[a-z][a-z\d]*([A-Z][a-z\d]*)*$`. Query parameters only contain letters and digits and the first character **MUST** be a lower case letterwhere (**MUST NOT** be a digit) . The first letter of each word is capitalized, except for the first letter of the entire compound word. This is also known as [lower camelCase](https://developer.mozilla.org/en-US/docs/Glossary/Camel_case). This also implies that diacritics **MUST** be normalized and special characters **MUST** be omitted.

Rationale

Query keys are often converted to JSON object keys, where lowerCamelCase is the naming convention to avoid compatibility issues with JavaScript when deserializing objects.

### 2.4 Adherence to RESTful principles [Rxxx]

The REST architectural style prescribes [six principles](https://RESTfulapi.net/) that API platforms **SHOULD** adhere to. This section defines rules to ensure the RESTfulness of the APIs. Since the HTTP protocol is intrinsically client-server, no additional rules are necessary to enforce this principle.

### [R001] APIs **MUST** be Stateless

APIs **MUST** be stateless and therefore servers **MUST NOT** store any _session_ _state _information of the client. This mandates that each request from the client to the server **MUST** contain all of the information necessary to understand and complete the request. The server cannot take advantage of any previously stored context information on the server. For this reason, the client application must entirely keep the session state.

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

Inherited ADR:

- [core/stateless](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/stateless): Do not maintain session state on the server

### [R002] APIs **MUST** provide a full representation of the resource in the response payload

As a consequence of the Uniform Interface principle, each response to an API request **MUST** contain the complete resource representation available on the server at the time that the response was generated. In case the resource does not exist (anymore) an empty body **MUST** be provided.

### [R003] A server-side unique resource identifier **MUST** be assigned to each created resource and returned to the client

As a consequence of the Uniform Interface principle, the API interface must uniquely identify each resource involved in the interaction between the client and the server. When creating a new resource (typically as a result of a `POST` operation), a server-side generated unique identifier (preferably a UUID) **MUST** be assigned to the resource and returned to the client in the response as the `id`. For subsequent  operations (`PUT`, `PATCH`, `DELETE`, `GET`) on this resource provided by the server, the resource **MUST** be identified in the URI using this server-generated unique identifier as a path parameter.

In addition, resources **MAY** be identified using secondary identifiers assigned by other entities. The API platform **MAY** support these identifiers as resource identifiers in subsequent operations  (`PUT`, `PATCH`, `DELETE`, `GET`) .

### [R004] APIs **SHOULD NOT** expose implementation details of the underlying application, development platforms/frameworks or database systems/persistence models

The Layered System principle allows an architecture to be composed of hierarchical layers by constraining component behavior. In a layered system, each component cannot see beyond the immediate layer they are interacting with. APIs therefore **MUST** hide irrelevant implementation details. An API **SHOULD NOT** expose implementation details of the underlying application, development platforms/frameworks or database systems/persistence models because:

- The primary motivation behind this design rule is that an API design **MUST** focus on usability for the client, regardless of the implementation details under the hood.
- The API, application and infrastructure **MUST** be able to evolve independently to ease the task of maintaining backwards compatibility for APIs during an agile development process.
- The API design of Convenience- and Process API types **SHOULD NOT** be a 1-on-1 mapping of the underlying domain- or persistence model.
- The API design of a System API type **MAY** be a mapping of the underlying persistence model.
- The API **SHOULD NOT** expose information about the technical components being used, such as development platforms/frameworks or database systems.
- The API **SHOULD** offer client-friendly attribute names and values, while persisted data may contain abbreviated terms or serializations which might be cumbersome for consumption.

Inherited ADR:

- [/core/hide-implementation](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/hide-implementation): Hide irrelevant implementation details

### [R005] APIs **MAY** support client-side caching in `GET` operations

The cacheable REST principle requires that APIs **MAY** support client-side caching of frequently accessed resources in `GET` operations. The response **MUST** implicitly or explicitly label itself as cacheable or non-cacheable, using the standard HTTP response header variables (`Expires`, `Cache-Control`, `ETag`and/or `Last-Modified`). If the response is cacheable, the client application gets the right to reuse the response data later for equivalent requests and a specified period.

APIs **MUST NOT** use caching in other operations than `GET`.

### 2.5 Payloads

Additional information in an API request or response that is not part of the HTTP method, URL, or headers must be exchanged in the payload. The rules in this section apply to the payloads.

### [P001] APIs **MUST** use JSON as payload data interchange format

APIs **MUST** use JSON ([RFC 7159](https://tools.ietf.org/html/rfc7159)) to represent structured (resource) data passed with HTTP requests and responses as body payload. 

### [P002] APIs **MUST** use standard JSON media types

The standard media types `application/json` (normal operations), `application/json-patch+json` (`PATCH` operations) or `application/problem+json` (to support problem JSON, see: XXXXXXXXXX) **MUST** be used as `Content-Type` (or `Accept`) header information.

### [P003] Property names **MUST** be lowerCamelCase

All property names **MUST** be lowerCamelCase matching regex `^\$?[a-z][a-z\d]*([A-Z][a-z\d]*)*$`. 

### [P004] Array properties **MUST** have a plural name

Properties names of arrays **MUST** be pluralized to indicate that they contain multiple values. This implies in turn that object names **MUST** be singular. 

### [P005] Properties with value `null` and absent properties **MUST** be handled the same way

OpenAPI 3.x allows to mark properties as `required` and as `nullable` to specify whether properties may be absent (as in: `{}`) or can have the value `null` (as in: `{"example":null}`). If a property is defined to be not `required` _and_ `nullable` (see 2nd row in Table below), this rule demands that both cases **MUST** be handled in the exact same manner by specification.

| required | nullable | `{}`   | `{"example":null}` |
| -------- | -------- | ------ | ------------------ |
| true     | true     | ❌ No  | ✔ Yes             |
| false    | true     | ✔ Yes | ✔ Yes             |
| true     | false    | ❌ No  | ❌ No              |
| false    | false    | ✔ Yes | ❌ No              |

### [P006] Date properties **MUST NOT** have a time component if only the date is relevant

Properties representing dates (without time) **MUST** use `date` format and **MUST** exclude time components. Including time portions reduces understandability and increases complexity due to timezone conversions.

Inherited ADR:

- /core/date-time/date-omit-time-portion: Omit time portion for date fields

### [P007] Date, datetime and time properties **MUST** use RFC9745/ISO8601 formats

OpenAPI does not know date, datetime or time data types, though represents dates, datetimes and times as strings with the appropriate  format. All date, datetime and time fields in requests and responses **MUST** adhere to [[RFC9557]] and [[ISO8601-1]] formats. Each field in the OpenAPI specification **MUST** set `type: string` and set `format` to the OpenAPI format as listed in the following table:

| Field type | ISO8601 format | OpenAPI format (yaml)                  | Syntax                                                                                               | Examples                                                                                             |
| ---------- | -------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Date       | full-date      | `type: string`<br>`format: date`       | `YYYY-DD-MM`                                                                                         | `2026-04-08`                                                                                         |
| Datetime   | date-time      | `type: string`<br>`format: date-time`  | `YYYY-DD-MMThh:mi:ssZ`<br>`YYYY-DD-MMThh:mi:ss±hh:mm`<br>`YYYY-DD-MMThh:mi:ss.sssZ`<br>`YYYY-DD-MMThh:mi:ss.sss±hh:mm` | `2026-04-08T13:17:49Z`<br>`2026-04-08T15:17:49+02:00`<br>`2026-04-08T13:17:49.824Z`<br>`2026-04-08T15:17:49.824+02:00` |
| Time       | partial-time   | `type: string`<br>`format: time-local` | `hh:mm`<br>`hh:mm:ss`                                                                                | `15:17`<br>`15:17:49`                                                                                |

RFC9557 is a profile on ISO8601, but is not a strict subset of allowed notations. Practically, to adhere to both, the following limitations MUST be applied to RFC9557:

- In a field with a date-time value, the date and time components **MUST** be separated by a "T" in uppercase.
- The timezone offset "Z" (meaning UTC) **MUST** be uppercase.
- "-00:00" **MUST NOT** be used as timezone offset. "+00:00" **MAY** be used as timezone offset to indicate an offset of 0h and 0m.

Inherited ADR:

- /core/date-time/format: Use standard format for date, datetime and time

### [P008] APIs **MUST** allow all timezone offsets in requests and **SHOULD** use UTC in responses

APIs **MUST** accept any timezone offset in fields in requests containing a datetime. Fields in responses containing a datetime **SHOULD** be in UTC (e.g. "Z" as timezone offset).

Inherited ADR:

- /core/date-time/timezone: Allow all timezone offsets in requests and use UTC in responses

### [P009] `GET` and `DELETE`operations **MUST NOT** have a request payload 

Because of their nature (retrieving and removing resources) `GET` and `DELETE` operations **MUST NOT** have a request payload.

### [P010] `PATCH` operations **MUST** use the standard _JavaScript Object Notation (JSON) Patch_ as request payload 

`PATCH`operations **MUST NOT** use the normal resource representation in the request payload, but **MUST** use _JavaScript Object Notation (JSON) Patch_ as described in [RFC 6902](https://www.rfc-editor.org/rfc/rfc6902). The HTTP request header variable `Content-Type`of **MUST** be set to `application/json-patch+json`. As with all operations, the response payload of a `PATCH` request **MUST** contain the full representation of the updated resource (see: XXXXXXX).

### [P011] Response payloads of erroneous requests **MUST** use the standard _Problem Details for HTTP APIs_

When an API request results in an error (HTTP 4xx of HTTP-5xx), the response payload **MUST** contain the "Problem Details for HTTP APIs" as specified in [RFC 9457](https://datatracker.ietf.org/doc/html/rfc9457). The `Accept` variable in the HTTP response header **MUST** be set to `application/problem+json` to inform the client about the responded content type. 

### 2.6 HTTP methods and responses [Hxxx]

Although the REST architectural style does not impose a specific protocol, REST APIs are typically implemented using HTTP Semantics as specified in  [RFC9110](https://www.rfc-editor.org/rfc/rfc9110).

### [H001] API Operations **MUST** use only standard HTTP methods

An API Operation (=HTTP-Method plus resource) **MUST** adhere to the HTTP method semantics defined in [RFC9110](https://www.rfc-editor.org/rfc/rfc9110).

The HTTP specifications offer a set of standard methods, where every method is designed with explicit semantics. Adhering to the HTTP specification is crucial, since HTTP clients and middleware applications rely on standardized characteristics. An exception to this rule is the HTTP `PATCH` method, which is not described in RFC9110 but which is allowed (see: ????????????)

The following table shows on which resource type (singleton or collection) a HTTP method **MAY** or **MUST NOT** be implemented and the effect the HTTP method **MUST** have when used in a (successful) request.

| Method   | Operation              | Collection Resource (e.g. /growers)                                                                  | Singleton Resource (e.g. /growers/com.gs1.codelists.gln/8700292113955)                               |
| -------- | ---------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `GET`    | Read                   | ✔ Retrieve a collection resource representation for the given URI. Data is only retrieved and never modified. | ✔ Retrieve a singleton resource representation for the given URI. Data is only retrieved and never modified. |
| `POST`   | Create                 | ✔ Create a new singleton resource as part of a collection.                                          | ❌ Avoid using `POST` on a singleton resource. Return `405 Method Not Allowed`                       |
| `PUT`    | Update/Replace         | ❌ Avoid using `PUT` on a collection resource. Return `405 Method Not Allowed`                       | ✔ Replace an existing resource with the given URI (full update). The resource MAY be created when does not exist |
| `PATCH`  | Partial Update/ Modify | ❌ Avoid using `PATCH` on a collection resource, Return `405 Method Not Allowed`                     | ✔ Partially updates an existing resource.                                                           |
| `DELETE` | Delete                 | ❌ Avoid using `DELETE` on a collection resource, Return `405 Method Not Allowed`                    | ✔ Remove a resource with the given URI.                                                             |

Inherited ADR:

- [/core/http-methods](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/http-methods): Only apply standard HTTP methods

If an optional HTTP request method is sent to a server and the server does not support that HTTP method for the target resource, an HTTP status code `405 Method Not Allowed` shall be returned and a list of allowed methods for the target resource shall be provided in the `Allow` header in the response as stated in [RFC 9110 15.5.6](https://www.rfc-editor.org/rfc/rfc9110#name-405-method-not-allowed).

### [H00x] API Operations **MUST** adhere to HTTP safety and idempotency semantics for operations

API operations **MUST** adhere to HTTP safety and idempotency semantics for operations a specified in the HTTP protocol [RFC9110](https://www.rfc-editor.org/rfc/rfc9110). These characteristics are important for clients and middleware applications, because they **SHOULD** be taken into account when implementing caching and fault tolerance strategies.

Request methods are considered **safe** if their defined semantics are essentially read-only. The client does not request, and does not expect, any state change on the origin server as a result of applying a safe method to a target resource.

**Idempotency** essentially means that the effect of a successfully performed request on a server resource is independent of the number of times it is executed. For example, in arithmetic, adding zero to a number is an idempotent operation. An idempotent HTTP method is a method that can be invoked many times without different outcomes. It should not matter if the method has been called only once, or ten times over. The result should always be the same.

The following table describes which HTTP methods **MUST** behave as safe and/or idempotent:

| Method    | Safe   | Idempotent |
| --------- | ------ | ---------- |
| `GET`     | ✔ Yes | ✔ Yes     |
| `HEAD`    | ✔ Yes | ✔ Yes     |
| `OPTIONS` | ✔ Yes | ✔ Yes     |
| `POST`    | ❌ No  | ❌ No      |
| `PUT`     | ❌ No  | ✔ Yes     |
| `PATCH`   | ❌ No  | ❌  No     |
| `DELETE`  | ❌ No  | ✔ Yes     |

Inherited ADR:

- [/core/http-safety](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/http-safety): Adhere to HTTP safety and idempotency semantics for operations

### [H00x] API Responses **MUST** use standard HTTP status codes to convey appropriate errors

API Responses **MUST** use standard HTTP status codes to convey appropriate errors. Always use the semantically appropriate HTTP [status code](https://www.rfc-editor.org/rfc/rfc9110#name-status-codes) for the response.

In case of an error, the server **SHOULD NOT** pass technical details (e.g. call stacks or other internal hints) to the client. The error message **SHOULD** be generic to avoid revealing additional details and expose internal information which can be used with malicious intent.

Inherited ADR:

- [/core/http-response-code](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/http-response-code): Adhere to HTTP status codes to convey appropriate errors

### [H00x] `POST`, `PUT`, `PATCH`, `DELETE` and `GET` operations **MUST** at least support standard response codes

The HTTP operations `POST`, `PUT`, `PATCH`, `DELETE` and `GET` **MUST** at least support the following response codes

| Operation                                                          | Result                                                                                               | Response code                                                                                        |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `GET` on collection resource<br>(with or without query parameters) | successful response returning list with **0** of more items. <br>bad request (e.g. malformed query parameters)<br>authentication failed<br>(unspecified) server-side error | `200 OK`<br>`400 Bad Request`<br>`401 Unauthorized`<br>`500 Internal Server Error`                   |
| `GET` on singleton resource<br>(with resource id in the URI)       | successful response returning list with exactly **1** item.<br>bad request (e.g. malformed query parameters)<br>authentication failed<br>resource indicated is not found (does not exist or client has no access to the resource)<br>(unspecified) server-side error | `200 OK`<br>`400 Bad Request`<br>`401 Unauthorized`<br>`404 Not Found`<br>`500 Internal Server Error` |
| `POST`                                                             | successful creation of the new resource or successful acceptance of the `POST`request for further processing (asynchronously)<br>bad request (e.g. malformed request payload)<br>authentication failed<br>forbidden (e.g. when posting new instances to a resource collection the client is not allowed to)<br>(unspecified) server-side error | `201 Created` or `202 Accepted`<br>`400 Bad Request`<br>`401 Unauthorized`<br>`403 Forbidden`<br>`500 Internal Server Error` |
| `PUT`                                                              | successful replace of the resource or successful acceptance of the `PUT`request for further processing (asynchronously)<br>bad request (e.g. malformed request payload)<br>authentication failed<br>forbidden (e.g. when replacing an instance of a resource the client is not allowed to)<br>resource indicated is not found (does not exist or client has no access to the resource)<br>(unspecified) server-side error | `200 OK` or `202 Accepted`<br>`400 Bad Request`<br>`401 Unauthorized`<br>`403 Forbidden`<br>`404 Not Found`<br>`500 Internal Server Error` |
| `PATCH`                                                            | successful partial update the resource or successful acceptance of the `PATCH` request further processing (asynchronously)<br>bad request (e.g. malformed payload)<br>authentication failed<br>forbidden (e.g. when updating an instance of a resource the client is not allowed to)<br>resource indicated is not found (does not exist or client has no access to the resource)<br>(unspecified) server-side error | `200 OK` or `202 Accepted`<br>`400 Bad Request`<br>`401 Unauthorized`<br>`403 Forbidden`<br>`404 Not Found`<br>`500 Internal Server Error` |
| `DELETE`                                                           | successful removal of the resource or successful acceptance of the `DELETE` request for further processing (asynchronously)<br>bad request (e.g. malformed payload)<br>authentication failed<br>forbidden (e.g. when posting sub-resources to a resource on which the client is not allowed to<br>resource indicated is not found (does not exist or client has no access to the resource)<br>(unspecified) server-side error | `204 No content` or `202 Accepted`<br>`400 Bad Request`<br>`401 Unauthorized`<br>`403 Forbidden`<br>`404 Not Found`<br>`500 Internal Server Error` |

Remarks:

A `GET` request on a **collection** resource resulting in a response with no items found is not considered as a (client) failure and therefore a status code `200 Ok` with an empty list is returned. A `GET` request on a specific **singleton** resource (with a resource identifier in the URI) which results in a response with no items found, is considered as a client failure because the resource identifier provided by the client does not match a resource on the server. In this case a response code `404 Not Found` is returned to the client.

### [H00x] The `PUT` method **MUST NOT** be implemented as an insert-or-update operation 

A `PUT` request on a singleton resource (identified by the given resource id) which does not exist, **MUST** result in an `404 Not Found` error and **MUST NOT** be processed as an alternative create (insert) operation. 

### [H00x] The HTTP `401 Unauthorized` error code **MUST** only be used  for authentication failures

Although the standard description of the HTTP `401` error is: `Unauthorized` this error **MUST** only be returned as a result of a failed **authentication** (e.g. API-key or OAuth2-token) validation. In case clients are successfully authenticated and perform an operation they are not **authorized** (allowed) to, a `403 Forbidden` **SHOULD** be returned. Alternatively a `404 Not Found` **MAY** be returned to hide the information on the existence of the resource for the client (for safety reasons).

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

## 3. Conformation

- [API Design Rules version 2.1.0](https://gitdocumentatie.logius.nl/publicatie/api/adr/) of the NL API Strategie (Dutch API Strategy)\r\n
- [IETF RFC 2119](https://www.rfc-editor.org/rfc/rfc2119) Key words for use in RFCs to Indicate Requirement Levels. S. Bradner. IETF. March 1997. Best Current Practice.\r\n
- [IETF RFC 3986](https://www.rfc-editor.org/rfc/rfc3986) Uniform Resource Identifier (URI): Generic Syntax. T. Berners-Lee; R. Fielding; L. Masinter. IETF. January 2005. Internet Standard. \r\n
- [IETF RFC 9110](https://www.rfc-editor.org/rfc/rfc9110) HTTP Semantics. R. Fielding; M. Nottingham; J. Reschke, IETF. June 2022. Standards Track. \r\n
- [IETF RFC 8174](https://www.rfc-editor.org/rfc/rfc8174) Ambiguity of Uppercase vs Lowercase in RFC 2119 Key Words. B. Leiba. IETF. May 2017. Best Current Practice. 
- [IETF RFC 6902](https://www.rfc-editor.org/rfc/rfc6902): JavaScript Object Notation (JSON) Patch. P. Bryan; Nottingham, IETF. April 2013. Proposed Standard.
- [IETF RFC 9457](https://www.rfc-editor.org/rfc/rfc9457): Problem Details for HTTP APIs M. Nottingham; E. Wilde; S. Dalal. IETF. July 2023. Proposed Standard.
- [IETF Draft: Health Check Response Format for HTTP APIs](https://datatracker.ietf.org/doc/draft-inadarei-api-health-check/). I. Nadareishvili. IETF. April 19th 2022. (Unknown)
- [IETF Draft: JSON Hypertext Application Language](https://www.ietf.org/archive/id/draft-kelly-json-hal-11.html). M. Kelly. IETF.  April 21th, 2024 Informational (Draft)
- ISO-3166 country codes
- ISO-8601 Date and time format
- [IETF RFC 9557](https://www.rfc-editor.org/rfc/rfc9557): Date and Time on the Internet: Timestamps with Additional Information. U. Sharma;Igalia, S.L.; C. Bormann. IETF. July 2023. Proposed Standard.
- [SemVer](https://semver.org) Semantic Versioning 2.0.0. T. Preston-Werner. June 2013.
- [OpenAPI Specification](https://www.openapis.org/). Darrell Miller; Jason Harmon; Jeremy Whitlock; Marsh Gardiner; Mike Ralphson; Ron Ratovsky; Tony Tam; Uri Sarid. OpenAPI Initiative.