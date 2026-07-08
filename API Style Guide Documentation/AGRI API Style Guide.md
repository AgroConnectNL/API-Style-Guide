# AGRI API Style Guide

## AgroConnect Guideline

Draft version June 2026

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

The key words "**MUST**", "**MUST NOT**", "**REQUIRED**", "**SHALL**", "**SHALL NOT**", "**SHOULD**", "**SHOULD NOT**", "**RECOMMENDED**", "**NOT RECOMMENDED**", "**MAY**", and "**OPTIONAL**" in this document are to be interpreted as described in [BCP 14](#bcp14) [RFC 2119](#rfc2119) [RFC 8174](#rfc8174) when, and only when, they appear in all capitals, as shown here.

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

[Chapter 2](#chapter2) contains the list of API Design Rules. These are partially based on the [NLGov REST API Design Rules](https://gitdocumentatie.logius.nl/publicatie/api/adr/) ("ADR") as published by Forum Standaardisatie ([REST-API Design Rules | Forum Standaardisatie](https://www.forumstandaardisatie.nl/open-standaarden/rest-api-design-rules)). In [Chapter 3](#chapter3) we added a compliancy matrices which show the relation between the AASG Rules and ADR rules. [Chapter 4](#chapter4) contains an overview of references.

The examples in this style guide are based on the AgroConnect REST API eCrop standaard.

## <a id="chapter2"></a>2. API Design Rules

This chapter containts the list of API Design Rules in the *AGRI API Style Guide (AASG)*. The rules concern the followig categories:

1. Basic Meta information and Versioning
2. Security 
3. URLs and Resources
4. Adherence to RESTful principles
5. Payloads
6. HTTP methods and responses 

### 2.1 Basic Meta Information and Versioning [Mxxx]

The API specification, also referred to as the API contract, serves as the primary reference for third parties developing client implementations. Its objective is to provide client developers with comprehensive details required to implement conformant clients. The rules in this section define the mandated publication format and the specific elements that must be included in the specification. This section also defines the versioning rules for the specification to ensure controlled evolution and maintain backward compatibility after the initial formal release.

### <a id="m001"></a>[M001] API Specification **MUST** be specified and published using OpenAPI

We use the standard provided by the [OpenAPI Initiative](#openapi-specification) to define API specifications, so the API contract **MUST** be specified using OpenAPI. API designers **SHOULD** provide the API specification using a single self-contained YAML file for better readability. The specification **MAY** be published using a single JSON file.

### <a id="m002"></a>[M002] API Specification **MUST** contain API meta information

API specifications **MUST** contain the following [OpenAPI meta information](https://spec.openapis.org/oas/latest.html#info-object):

- `#/info/title` a (unique) identifying, functional descriptive name of the API
- `#/info/version` the API specification document version following **MUST** use [semantic versioning](#m004)
- `#/info/description` a proper description of the API
- `#/info/contact/{name,url,email}` contact info of the team owning the API specification

#### Example

```yaml
# ✔ Correct 
openapi: 3.0.4
info:
  title: AgroConnect eCrop API
  version: 1.0.3
  description: "## eCrop API based on **AgroConnect eCrop standard version 1.0.0**\n\nThis API concerns registration of crop related activities like application of crop protection products and fertilizers and energy and water consumption."
  contact:
    name: Bernard van Raaij
    email: info@agroconnect.nl
    url: 'https://www.agroconnect.nl/'
```

### <a id="m003"></a>[M003] API Specification **MUST** be written using U.S. English

The API specification **MUST** be written in U.S. English. 

### <a id="m004"></a>[M004] API Specification and implementation **MUST** use semantic versioning

OpenAPI requires the definition of API specification version via `#/info/version`. Note, this API specification document version is distinct from the OpenAPI Specification version (also required, e.g. `openapi: 3.0.4`), or the API Implementation version.

API designers **MUST** comply with [Semantic Versioning 2.0](#semver) with the standard version format `major.minor.patch` as follows:

- Increment the `MAJOR` version when you make incompatible API changes after having aligned the changes with consumers. Consumers *have to adapt* their clients to be able to use this version
- Increment the `MINOR` version when you add new functionality in a backwards-compatible manner. Consumers only have to adapt their clients to the new version to be able to use the new features, though they can continue using existing features from earlier versions without modifying their client software implementation
- Increment the `PATCH` version when you make backwards-compatible bug fixes or editorial changes not affecting the functionality. Consumers _do not have to modify their software_ implementation to use this newer version

### <a id="m005"></a>[M005] An API platform **SHOULD** at most deploy two `major`versions simultaneously

When breaking changes in an existing API implementation are unavoidable, a new `major`version **MUST** be deployed. We recommend to deploy at most two `major`versions simultaneously and to schedule a fixed transition period for a new major API version. Ideally, a deprecation schedule **MAY** be included when features or versions will be deprecated, so client know when the have to migrate to the newer version. Every version **SHOULD** contain a changelog which shows API changes between versions

### <a id="m006"></a>[M006] The MAJOR version **MUST** be specified in the HTTP request header

To support multiple simultaneously deployed `major` versions, clients **MUST** indicate the targeted major API-version in the HTTP request header using the `Major-Version` header parameter. The recommended format is `1`, `2` and so on. 

URL-based versioning (as in `../v1/growers/...`) **SHOULD NOT** be used, because the URL represents the unique address of a resource (and not the API), which itself is not versioned.

### <a id="m007"></a>[M007] The identification of the client software package **MAY** be specified in the HTTP request header

Although APIs are client-agnostic, the client **MAY** pass the name and software version which is calling the API in the standard HTTP request header. The client **MUST** use the standard `User-Agent` HTTP header field for this purpose.

#### Example for rules [M006](#m006) and [M007](#m007)

##### ✔ Correct 

```http
POST /growers/com.my-mps.codelists.registratienummer/12345/crops HTTP/1.1
Host: standard-api.agroconnect.nl
Content-Type: application/json
Accept: application/json, application/problem+json
Major-Version: 1                                      # ✔ Major version in HTTP request header
User-Agent: avs2025/v1                                # ✔ Client software package in User-Agent
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  <request payload>
}
```

#### ❌ Incorrect 

```http
POST /v1/growers/com.my-mps.codelists.registratienummer/12345/crops HTTP/1.1 # ❌ Major version in URI
Host: standard-api.agroconnect.nl
Content-Type: application/json
Accept: application/json, application/problem+json
Client-Software: avs2025/v1                           # ❌ Custom header instead of User-Agent
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  <request payload>
}
```

### <a id="m008"></a>[M008] The full API version **MUST** be returned in the HTTP response header

For tracing and debugging purposes, the full API version (i.e. `major.minor.patch`) **MUST** be returned to the client in the `API-Version` HTTP response header.

### <a id="m009"></a>[M009] A unique, server-side assigned request identifier **MUST** be returned in the HTTP response header

For tracing and debugging purposes, a unique, server-side assigned request identifier (preferably a UUID) **MUST** be returned to the client in the `Request-Id` HTTP response header. Note that a request identifier tracks a specific request (and its downstream calls) on a resource, while a resource identifier (typically the URL path) uniquely identifies the target resource itself, which can be subject of multiple different requests.

### <a id="m010"></a>[M010] The request date-time **MUST** be returned in the HTTP response header

For tracing and debugging purposes, a unique, server-side generated date-time UTC timestamp (in msecs) **MUST** be returned to the client in the `Request-Date-Time` HTTP response header, using the format `YYYY-MM-DDThh:mi:ss.sssZ`. 

#### Example for rules [M008](#m008), [M009](#m009) and [M010](m010)

##### ✔ Correct  response (header)

```http
HTTP/1.1 202 Accepted
Content-Type: application/json
API-Version: 1.0.3                                     # ✔ Full API version in HTTP response header
Request-Id: 9f1c2b3a-4d5e-6f70-81a2-b3c4d5e6f701       # ✔ Unique request-id in HTTP response header
Request-Date-Time: 2025-03-12T15:31:21.123Z            # ✔ Request timestamp in in HTTP response header

{
  <response payload>
}
```

### 2.2 Security [Sxxx]

#### 2.2.1 Transport Security

This section describes security principles, concepts and technologies to apply when working with APIs. Controls need to be applied for the security objectives of integrity, confidentiality and availability of the API (which includes the services and data provided thereby). The scope of this section is limited to generic security controls that directly influence the visible parts of an API. Effectively, only security standards directly applicable to interactions are discussed here. In order to meet the complete security objectives, every implementer **MUST** also apply a range of controls not mentioned in this section.

### <a id="s001"></a>[S001] Connections **MUST** be secured using TLS

One should secure all APIs assuming they can be accessed from any location on the internet. Information **MUST** be exchanged over TLS-based secured connections. No exceptions — everywhere and always. Although this is [required by law](https://wetten.overheid.nl/BWBR0048156/2023-07-01) for government organisations, this rule **MUST** be interpreted as equally required for non-governmental organisations. One **MUST** follow the latest NCSC guidelines [NCSC 2025](#ncsc2025).

### <a id="s002"></a>[S002] URIs **MUST NOT** contain any sensitive information

Even when using TLS connections, information in URIs is not secured. URIs can be cached and logged outside of the servers controlled by clients and servers. Any information contained in them should therefore be considered readable by anyone with access to the network (in the case of the internet, the whole world) and **MUST NOT** contain any sensitive information. This includes client secrets used for authentication, privacy sensitive information such as BSNs or any other information which should not be shared.

Be aware that queries (anything after the '?' in a URI) are also part of a URI.

#### 2.2.2 HTTP-level Security

The guidelines and principles defined in this section are client agnostic. When implementing a client agnostic API, one SHOULD at least facilitate that multi-purpose generic HTTP-clients like browsers are able to securely interact with the API. When implementing an API for a specific client it may be possible to limit measures as long as it ensures secure access for this specific client. Nevertheless it is advised to review the following security measures, which are mostly inspired by the [OWASP REST Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html). 

Even while remaining client agnostic, clients can be classified in four major groups. This is in line with common practice in [The OAuth 2.0 Authorization Framework](rfc6749).

The groups are:

1. Web applications.
2. Native applications.
3. Browser-based applications.
4. System-to-system applications.

This section contains elements that apply to the generic classes of clients listed above. Although not every client implementation has a need for all the specifications referenced below, a client agnostic API **SHOULD** provide these to facilitate any client to implement relevant security controls. 

Most specifications referenced in this section are applicable to the first three classes of clients listed above. Security considerations for native applications are provided in [RFC 8252](#rfc8252), much of which can help non-OAuth2 based implementations as well. For browser-based applications a subsection is included with additional details and information. System-to-system (sometimes called machine-to-machine) may have a need for the listed specifications as well. Note that different usage patterns may be applicable in contexts with system-to-system clients, see above under Client Authentication.

Realizations may rely on internal usage of HTTP-Headers. Information for processing requests and responses can be passed between components, that can have security implications. For instance, this is common practice between a reverse proxy or TLS-offloader and an application server. Additional HTTP headers are used in such example to pass an original IP-address or client certificate.

Implementations **MUST** consider filtering both inbound and outbound traffic for HTTP-headers used internally. The primary focus of inbound filtering is to prevent injection of malicious headers on requests. For outbound filtering, the main concern is leaking of information. Use mandatory security headers in all API responses

### <a id="s003"></a>[S003] API security headers **MUST** be returned in all server responses to instruct the client to act in a secure manner

There are a number of security related headers that can be returned in the HTTP responses to instruct browsers to act in specific ways. However, some of these headers are intended to be used with HTML responses, and as such may provide little or no security benefits on an API that does not return HTML. The following headers **SHOULD** be included in all API responses:

| Header                                            | Rationale                                                                                            |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `Cache-Control: no-store`                         | Prevent sensitive information from being cached.                                                     |
| `Content-Security-Policy: frame-ancestors 'none'` | To protect against drag-and-drop style clickjacking attacks.                                         |
| `Content-Type`                                    | To specify the content type of the response. This **SHOULD** be `application/json, application/problem+json` for JSON responses (including error responses) |
| `Strict-Transport-Security`                       | To require connections over HTTPS and to protect against spoofed certificates.                       |
| `X-Content-Type-Options: nosniff`                 | To prevent browsers from performing MIME sniffing, and inappropriately interpreting responses as HTML. |
| `X-Frame-Options: DENY`                           | To protect against drag-and-drop style clickjacking attacks.                                         |
| `Access-Control-Allow-Origin`                     | To relax the 'same origin' policy and allow cross-origin access. See [[S004](#s004)] for more information. |

The headers below are only intended to provide additional security when responses are rendered as HTML. As such, if the API will never return HTML in responses, then these headers may not be necessary. You **SHOULD** include the headers as part of a defense-in-depth approach if there is any uncertainty about the function of the headers, the types of information that the API returns or information it may return in the future.

| Header                                        | Rationale                                                              |
| --------------------------------------------- | ---------------------------------------------------------------------- |
| `Content-Security-Policy: default-src 'none'` | The majority of CSP functionality only affects pages rendered as HTML. |
| `Feature-Policy: 'none'`                      | Feature policies only affect pages rendered as HTML.                   |
| `Referrer-Policy: no-referrer`                | Non-HTML responses should not trigger additional requests.             |

In addition to the above listed HTTP security headers, web- and browser-based applications SHOULD apply [[[SRI]]]. When using third-party hosted contents, e.g. using a Content Delivery Network, this is even more relevant. While this is primarily a client implementation concern, it may affect the API when it is not strictly segregated or for example when shared supporting libraries are offered.

### <a id="s004"></a>[S004] CORS MUST be used to restrict access from other domains for applicable resources

Different resources can have different uses, as some resources are publicly available whereas others are restricted to several domains. Modern web browsers use Cross-Origin Resource Sharing (CORS) to minimize the risk associated with cross-site HTTP-requests.

By default browsers only allow 'same origin' access to resources. This means that responses on requests to another `[scheme]://[hostname]:[port]` than the `Origin` request header of the initial request will not be processed by the browser. To enable cross-site requests APIs can return a `Access-Control-Allow-Origin response` header.

An allowlist **SHOULD** be used to determine the validity of different cross-site requests.  To do this, check the `Origin` header of the incoming request and check if the domain in this header is on the allowlist. If this is the case, set the incoming `Origin` header in the `Access-Control-Allow-Origin` response header.

Using a wildcard `*` in the `Access-Control-Allow-Origin` response header is **NOT RECOMMENDED**, because it disables CORS-security measures. However, if the resource has to be accessed by numerous other origins that are not known up front (such as all resources in an open API, or the `openapi.json` as required by [M001](#m001)), you **MAY** use `*`.

#### 2.2.4 Browser-based applications

A specific subclass of clients are browser-based applications, that require the presence of particular security controls to facilitate secure implementation. Clients in this class are also known as *user-agent-based* or *single-page-applications* (SPA). 

### <a id="s005"></a>[S005] All browser-based applications **SHOULD** follow the best practices specified in [OAuth 2.0 for Browser-Based Apps](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps-22). 

All browser-based applications **SHOULD** follow the best practices specified in [OAuth 2.0 for Browser-Based Apps](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps-22). These applications can be split into three architectural patterns:

- JavaScript applications with a backend; with this class of applications, the backend is the confidential client and should intermediate any interaction, with tokens never ending up in the browser.

  Effectively, these are not different from regular web-application for this security facet, even though they leverage JavaScript for implementation.
- JavaScript applications that share a domain with the API (resource server); these can leverage cookies marked as HTTP-Only, Secure and SameSite.
- JavaScript applications without a backend; these clients are considered public clients, and are potentially more vulnerable to several types of attacks, including Cross-Site Scripting (XSS), Cross Site Request Forgery (CSRF) and OAuth token theft.

  In order to support these clients, the Cross-Origin Resource Sharing (CORS) policy mentioned above is critical and MUST be supported.

#### 2.2.5 Validate content types

### <a id="s006"></a>[S006] A REST request or response body **SHOULD** match the intended content type in the header.

A REST request or response body **SHOULD** match the intended content type in the header. Otherwise this could cause misinterpretation at the consumer/producer side and lead to code injection/execution.

- Requests containing unexpected or missing `Content-type` headers **MUST** be rejected with HTTP response status `406 Not Acceptable` or `415 Unsupported Media Type`.
- Avoid accidentally exposing unintended content types by explicitly defining content types e.g. Jersey (Java) `@consumes("application/json"); @produces("application/json")`. This avoids XXE-attack vectors for example.

It is common for REST services to allow multiple response types (e.g. `application/xml` or `application/json`), and the client specifies the preferred order of response types by the `Accept` header in the request.

- Do NOT simply copy the `Accept` header to the `Content-type` header of the response.
- A request with an `Accept` header which does not specifically contain one of the allowable types **MUST** be rejected with `406 Not Acceptable` response.

Services (potentially) including script code (e.g. JavaScript) in their responses **MUST** be especially careful to defend against header injection attacks.

- Ensure the intended Content-Type headers are sent in the response, matching the body content, e.g. `application/json` and not `application/javascript`.

### 2.3 URLs and Resources ([Uxxx])

The key abstraction of information in REST is a _resource_. Any information that we can name can be a resource. Each resource is identified by a unique address, the Uniform Resource Identifier (URI), which is part of the Uniform Resource Locator (URL). We distinguish two types of resources:

- **Collection** (resources): a resource that represents a _set of items_ of the same type. An example is the collection (list) of growers on a crop management platform which can be accessed with the URI `/growers`
- **Singleton** (resources): a resource that represents _one specific item_ from that set. An example is a specific grower on a crop management platform who has GLN (Global Location Number) issued by GS1 with value 8700292113955 as unique identification which can be accessed with the URI `/growers/com.gs1.codelists.gln/8700292113955`

This section defines the rules for naming resources and constructing URLs to identify them.

### <a id="u001"></a>[U001] URLs **SHOULD NOT** use `/api` or `/services`as base path

URLs **SHOULD NOT** use (something like) `/api` or `/services` as base path. In most cases, all resources provided by a service are part of the public API, and therefore should be made available under the root "/" base path.

#### Examples

##### ✔ Correct  

```http
# ✔ Correct 
POST /growers/com.my-mps.codelists.registratienummer/12345/crops HTTP/1.1
Host: standard-api.agroconnect.nl
...
```

##### ❌ Incorrect: `/api` or `/services` in URI  

```http
POST /api/growers/com.my-mps.codelists.registratienummer/12345/crops HTTP/1.1
Host: standard-api.agroconnect.nl
Content-Type: application/json
...

POST /services/growers/com.my-mps.codelists.registratienummer/12345/crops HTTP/1.1
Host: standard-api.agroconnect.nl
Content-Type: application/json
...
```

### <a id="u002"></a>[U002] Nouns **MUST** be used to name resources

Resources **MUST** be referred to using nouns (instead of verbs) that represent entities meaningful to the API consumer.

### <a id="u003"></a>[U003] Resource names **MUST** be plural

Resources represent collections and therefore always **MUST** be referred to with a plural noun. Singleton resources always are referred to with the (plural) name of the collection resource it belongs to, followed by their resource identifier.

### <a id="u004"></a>[U004] All path segments identifying the resource **MUST** be written in kebab-case 

Path segments of a URI **MUST** only contain lowercase letters, digits or hyphens. This is also known as [kebab-case](https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case). Hyphens **MUST** only be used to delineate distinct words. This also implies that diacritics **MUST** be normalized and special characters **MUST** be omitted. Following this rule, each URI-segment must match regex `^[a-z][a-z\d]*(-[a-z\d]+)*$`. The first character **MUST** be a lower case letter, and subsequent characters can be a lower case letter, or a dash(`-`), or a digit (0-9).

Another implication of this rule is that file extensions **MUST NOT** be used (since a `"."` is not permitted in a URI). Resources **SHOULD** use the `Accept` header for content negotiation.

The last path segment **MAY** start with `_`, which is used as a convention to implement [operations](#/core/resource-operations)

Rationale

Some web servers and frameworks do not handle case sensitivity or special characters of URIs well. The use of kebab-case path segments ensures compatibility with a broad range of systems. It is a more common implementation choice for path segments than camelCase or snake_case. Information (such as names of objects) that requires special characters can be part of the request body instead of being in the URI.

### <a id="u005"></a>[U005] URL Paths **MUST** be normalized without empty path segments and trailing slashes

You **MUST NOT** specify paths with duplicate or trailing slashes, e.g. `.../growers//crops` or `.../growers/`. As a consequence, you **MUST NOT** specify or use path variables with empty string values.

When requesting a resource including a trailing slash, this **MUST** result in a `404 Not Found` error response and not in a redirect. This forces API consumers to use the correct URI.

This rule does not apply to the root resource (append `/` to the service root URL).

### <a id="u006"></a>[U006] Query parameters **MUST** be written in lowerCamelCase 

Query parameters (a.k.a query keys) in a URI **MUST** be lowerCamelCase matching regex `^[a-z][a-z\d]*([A-Z][a-z\d]*)*$`. Query parameters only contain letters and digits and the first character **MUST** be a lower case letter (**MUST NOT** be a digit) . The first letter of each word is capitalized, except for the first letter of the entire compound word. This is also known as [lower camelCase](https://developer.mozilla.org/en-US/docs/Glossary/Camel_case). This also implies that diacritics **MUST** be normalized and special characters **MUST** be omitted.

Rationale

Query keys are often converted to JSON object keys, where lowerCamelCase is the naming convention to avoid compatibility issues with JavaScript when deserializing objects.

#### Examples for rules [U002](#u002) to [U006](#u006) 

##### ✔ Correct: plural nouns as resource names  

```http
GET /growers
PUT /growers/com.my-mps.codelists.registratienummer/12345
GET /suppliers
POST /inbound-deliveries
GET /inbound-deliveries?deliveryDate=2026-03-25
```

##### ❌ Incorrect examples

```http
GET /grower                                              # ❌ singular i.s.o. plural
GET /getgrowers                                          # ❌ not a noun: method ("get") in resource name
POST /growers/                                           # ❌ trailing slash
POST /growers//crops                                     # ❌ duplicate slashes
POST /InboundDeliveries                                  # ❌ CamelCase i.s.o. kebab-case
GET /inbound-deliveries?delivery-date=2026-03-25         # ❌ Query parameter is kebab-case i.s.o. lowercamelCase
```

### <a id="u007"></a>[U007] Relations between resources with independent sub-(or child-)resources **MUST** be identified via path segments

Hierarchical ("parent-child") relationships between resources which have an _independent existence_ **MUST** be represented as separate resources with sub-resources in the URI path. A resource which defines the _tasks_ performed on a _crop_ of a certain _grower_ therefore **MUST** look like `/growers/{grower-identification}/crops/{crop-identification}/tasks`, so the hierarchical relation between the resources is clearly expressed in the URI. 

This also implies that the payload of the `tasks`resource of this example **MUST NOT** include resource identifiers for the grower or the crop it belongs to: that information is already part of the URI.

Hierarchical relationships between resources which _do not have an independent existence_ **MAY** be represented as sub-resources in the URI path, but **MAY** also be defined within the payload of the parent resource. For example, a list of `operations` which is part of certain a `task` resource.

##### ✔ Correct: request for `POST /growers/{grower-identification}/crops/{crop-identification}/tasks` with hierarchical relationship represented in URI

This example shows how to create a new task for a specific crop of a specific grower. The grower and crop identifiers are part of the URI, so they **MUST NOT** be included in the payload of the request.

```http
POST /growers/com.my-mps.codelists.registratienummer/12345/crops/com.gs1.codelist.gtin/0123456789012/tasks HTTP/1.1
Host: standard-api.agroconnect.nl
Content-Type: application/json
Accept: application/json, application/problem+json
Major-Version: 1
User-Agent: agroconnect-client/1.0
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "thirdPartyIds": [
    {
      "content": "27575",
      "schemeId": "com.my-mps.codelists.registratienummer"
    }
  ],
  "name": "Spraying task",
  "startDateTime": "2025-03-12T15:51:00+01:00",
  "endDateTime": "2025-03-12T16:45:00+01:00",
  "status": "PROPOSED",
  "operations": [
    {
      "thirdPartyIds": [
        {
          "content": "27575-1",
          "schemeId": "com.my-mps.codelists.registratienummer"
        }
      ],
      "name": "Spraying operation",
      "startDateTime": "2025-03-12T15:51:00+01:00",
      "endDateTime": "2025-03-12T16:45:00+01:00",
      "type": {
        "content": "SPRAYING",
        "listId": "nl.agroconnect.codelist.cl127"
      },
      "technique": {
        "content": "SPRAYING",
        "listId": "nl.agroconnect.codelist.cl302"
      },
      ...
    }
  ]
  ...
}
```

#### ❌ Incorrect: hierarchical relationship not represented in URI 

This example shows the creation of a task resource without hierarchical relationship. Resource identifiers for the grower and crop are part of the payload of the request. 

```http
POST /tasks HTTP/1.1
Host: standard-api.agroconnect.nl
Content-Type: application/json
Accept: application/json, application/problem+json
Major-Version: 1
User-Agent: agroconnect-client/1.0
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "thirdPartyIds": [
    {
      "content": "27575",
      "schemeId": "com.my-mps.codelists.registratienummer"
    }
  ],
  "name": "Spraying task",
  "startDateTime": "2025-03-12T15:51:00+01:00",
  "endDateTime": "2025-03-12T16:45:00+01:00",
  "status": "PROPOSED",
  "growerId": { 
     "content": "12345", 
     "schemeId": "com.my-mps.codelists.registratienummer" 
   },
  "cropId": { 
     "content": "0123456789012", 
     "schemeId": "com.gs1.codelist.gtin" 
   },
  "operations": [
    {
      "thirdPartyIds": [
        {
          "content": "27575-1",
          "schemeId": "com.my-mps.codelists.registratienummer"
        }
      ],
      "name": "Spraying operation",
      "startDateTime": "2025-03-12T15:51:00+01:00",
      "endDateTime": "2025-03-12T16:45:00+01:00",
      "type": {
        "content": "SPRAYING",
        "listId": "nl.agroconnect.codelist.cl127"
      },
      "technique": {
        "content": "SPRAYING",
        "listId": "nl.agroconnect.codelist.cl302"
      },
      ...
    }
  ]
  ...
}
```

Remark: when sub-resources are also used as independent resource in other operation without the hierarchical context, the sub-resource **MUST** also be available as an independent resource with its own URI. For example, a `task` resource can be created for a specific `crop` of a specific `grower` as shown above, but it can also be retrieved independently using its own URI `/tasks/{task-identification}` for instance to retrieve all tasks over all crops and growers with a `GET /tasks` operation. In this case, the (response) payload of the `task` resource **MAY** include the identifiers of the `crop` and `grower` if they are relevant for the operation as shown in the following example.

#### ✔ Correct: hierarchical relationship not represented in URI 

This example shows a GET request with response for a task resource without hierarchical relationship which is used to retrieve all tasks in a certain period. Resource identifiers for the grower and crop are part of the payload of the request. The result can contain tasks for different growers and crops (so the relation between the resources is not hierarchical in this context).

```http
GET /tasks?startDate=2025-01-01&endDate=2025-12-31 HTTP/1.1
Host: standard-api.agroconnect.nl
Content-Type: application/json
Accept: application/json, application/problem+json
Major-Version: 1
User-Agent: agroconnect-client/1.0
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

HTTP/1.1 200 OK
Content-Type: application/json
API-Version: 1.0.3
Request-Id: a1b2c3d4-e5f6-7890-ab12-cdef34567890
Request-Date-Time: 2026-01-15T09:10:54.913Z

[
    {
      "thirdPartyIds": [
        {
          "content": "27575",
          "schemeId": "com.my-mps.codelists.registratienummer"
        }
      ],
      "name": "Spraying task",
      "startDateTime": "2025-03-12T15:51:00+01:00",
      "endDateTime": "2025-03-12T16:45:00+01:00",
      "status": "PROPOSED",
      "growerId": { 
        "content": "12345", 
        "schemeId": "com.my-mps.codelists.registratienummer" 
      },
      "cropId": { 
        "content": "0123456789012", 
        "schemeId": "com.gs1.codelist.gtin" 
      },
      "operations": [
        {
          "thirdPartyIds": [
            {
              "content": "27575-1",
              "schemeId": "com.my-mps.codelists.registratienummer"
            }
          ],
          "name": "Spraying operation",
          "startDateTime": "2025-03-12T15:51:00+01:00",
          "endDateTime": "2025-03-12T16:45:00+01:00",
          "type": {
            "content": "SPRAYING",
            "listId": "nl.agroconnect.codelist.cl127"
          },
          "technique": {
            "content": "SPRAYING",
            "listId": "nl.agroconnect.codelist.cl302"
          },
          ...
        }
      ]
      ...
    },
    {
      "thirdPartyIds": [
        {
          "content": "27901",
          "schemeId": "com.my-mps.codelists.registratienummer"
        }
      ],
      "name": "NPK-Fertilizing task",
      "startDateTime": "2025-06-23T11:15:00+03:00",
      "endDateTime": "2025-06-23T16:45:00+02:00",
      "status": "PLANNED",
      "growerId": { 
        "content": "82094", 
        "schemeId": "com.my-mps.codelists.registratienummer" 
      },
      "cropId": { 
        "content": "8700123456789", 
        "schemeId": "com.gs1.codelist.gtin" 
      },
      "operations": [
        {
          "thirdPartyIds": [
            {
              "content": "27901-1",
              "schemeId": "com.my-mps.codelists.registratienummer"
            }
          ],
          "name": "NPK-Fertilizing operation",
          "startDateTime": "2025-06-23T11:15:00+03:00",
          "endDateTime": "2025-06-23T16:45:00+02:00",
          "type": {
            "content": "FERTILIZING",
            "listId": "nl.agroconnect.codelist.cl127"
          },
          "technique": {
            "content": "DRIP-IRRIGATION",
            "listId": "nl.agroconnect.codelist.cl302"
          },
          ...
        }
      ]
      ...
    }
]
```

### 2.4 Adherence to RESTful principles [Rxxx]

The REST architectural style prescribes [six principles](https://RESTfulapi.net/) that API platforms **SHOULD** adhere to. This section defines rules to ensure the RESTfulness of the APIs. Since the HTTP protocol is intrinsically client-server, no additional rules are necessary to enforce this principle. Because the optional _code-on-demand_ principle is hardly implemented in practice, we did not include rules to supports this feature.

### <a id="r001"></a>[R001] APIs **MUST** be Stateless

APIs **MUST** be stateless and therefore servers **MUST NOT** store any _session state_ information of the client. This mandates that each request from the client to the server **MUST** contain all of the information necessary to understand and complete the request. The server cannot take advantage of any previously stored context information on the server. For this reason, the client application must entirely keep the session state.

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

### <a id="r002"></a>[R002] APIs **MUST** provide a full representation of the resource in the response payload

As a consequence of the Uniform Interface principle, each response to an API request **MUST** contain the complete resource representation available on the server at the time that the response was generated in the reponse payload. In case the resource does not exist (anymore) an empty body **MUST** be provided.

### <a id="r003"></a>[R003] A server-side unique resource identifier **MUST** be assigned to each created resource and returned to the client

As a consequence of the Uniform Interface principle, the API interface must uniquely identify each resource involved in the interaction between the client and the server. When creating a new resource (typically as a result of a `POST` operation), a server-side generated unique identifier (preferably a UUID) **MUST** be assigned to the resource and returned to the client in the response as the `id`. For subsequent  operations (`PUT`, `PATCH`, `DELETE`, `GET`) on this resource provided by the server, the resource **MUST** be identified in the URI using this server-generated unique identifier as a path parameter.

In addition, resources **MAY** be identified using secondary identifiers assigned by other entities. The API platform **MAY** support these identifiers as resource identifiers in subsequent operations  (`PUT`, `PATCH`, `DELETE`, `GET`) .

#### Example for rules [R002](#r002) and [R003](#r003)

Client creates a new crop for a certain grower using the `POST`method

```http
POST /growers/com.my-mps.codelists.registratienummer/12345/crops HTTP/1.1
Host: standard-api.agroconnect.nl
Content-Type: application/json
Accept: application/json, application/problem+json
Major-Version: 1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "thirdPartyIds": [
    { "content": "66382"
    , "schemeId": "com.my-mps.codelists.teeltnummer" }
  ],
  "name": "Spring Wheat",
  "startDate": "2025-03-12",
  "endDate": "2025-11-30",
  "year": 2025,
  "country": "NL",
  "plantSpecies": [ { "plantSpecies": "1010101"
                    , "variety": "01201" } ]
  ...                  
}
```

Server responds with the complete representation of the new crop-resource, including the server-side assigned "id" (guid)

```http
HTTP/1.1 202 Accepted
Content-Type: application/json
API-Version: 1.0.3
Request-Id: a1b2c3d4-e5f6-7890-ab12-cdef34567890
Request-Date-Time: 2025-03-12T15:31:22.123Z

{
  "id":                                                               # Server side assigned id returned in response payload
    { "content": "c9a7b8e2-3d4f-5e6a-7b8c-9d0e1f2a3b4c"
    , "schemeId": "com.my-mps.codelists.guid" },
  "thirdPartyIds": [
    { "content": "66382"
    , "schemeId": "com.my-mps.codelists.teeltnummer" }
  ],
  "name": "Spring Weat",
  "startDate": "2025-03-12",
  "endDate": "2025-11-30",
  "year": 2025,
  "country": "NL"
  ...
}
```

Succeeding request uses sever side assigned "id" as resource identifier`: the client uses the server side assigned "id" as resource identifier which he received in the response payload of the `POST` request for succeeding `PUT` request to update the resource:

```http
PUT /growers/com.my-mps.codelists.registratienummer/12345/crops/com.my-mps.codelists.guid/c9a7b8e2-3d4f-5e6a-7b8c-9d0e1f2a3b4c HTTP/1.1
Host: standard-api.agroconnect.nl
Content-Type: application/json
Accept: application/json, application/problem+json
Major-Version: 1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "thirdPartyIds": [
    { "content": "66382"
    , "schemeId": "com.my-mps.codelists.teeltnummer" }
  ],
  "name": "Spring Wheat",                                   # client updates name
  "startDate": "2025-03-13",                                # and startDate
  "endDate": "2025-11-30",
  "year": 2025,
  "country": "NL",
  "plantSpecies": [ { "plantSpecies": "1010101"
                    , "variety": "01201" } ]
  ...                  
}
```

Response contains complete representation after processing the `PUT` operation

```http
HTTP/1.1 202 Accepted
Content-Type: application/json
API-Version: 1.0.3
Request-Id: 3b2a1d4e-5f6c-7b8a-9c0d-1e2f3a4b5c6d
Request-Date-Time: 2025-03-18T09:12:52.934Z

{
  "id": 
    { "content": "c9a7b8e2-3d4f-5e6a-7b8c-9d0e1f2a3b4c"
    , "schemeId": "com.my-mps.codelists.guid" },
  "thirdPartyIds": [
    { "content": "66382"
    , "schemeId": "com.my-mps.codelists.teeltnummer" }
  ],
  "name": "Spring Wheat",
  "startDate": "2025-03-13",
  "endDate": "2025-11-30",
  "year": 2025,
  "country": "NL"
  ...
}
```

Succeeding request uses sever side assigned "id" as resource identifier:  the client uses the server side assigned "id" as resource identifier which he received in the response payload of the `POST` request for succeeding `DELETE` request to update the resource:

```http
DELETE /growers/com.my-mps.codelists.registratienummer/12345/crops/com.my-mps.codelists.guid/c9a7b8e2-3d4f-5e6a-7b8c-9d0e1f2a3b4c HTTP/1.1
Host: standard-api.agroconnect.nl
Content-Type: application/json
Accept: application/json, application/problem+json
Major-Version: 1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

No content response after succesful deletion of the resource

```http
HTTP/1.1 204 No Content
Content-Type: application/json
API-Version: 1.0.3
Request-Id: f0e1d2c3-b4a5-6789-0abc-def123456789
Request-Date-Time: 2025-03-28T13:01:53.557Z
```

Usage of alternative resource identifiers: alternatively, the client can use third-party identifiers to reference the resource in the URI in stead of the server-side assigned identifier (only when the server supports this!). In this example, the client uses a third-party identifier as resource identifier in the `DELETE` request.

```http
DELETE /growers/com.my-mps.codelists.registratienummer/12345/crops/com.my-mps.codelists.teeltnummer/66382 HTTP/1.1
Host: standard-api.agroconnect.nl
Content-Type: application/json
Accept: application/json, application/problem+json
Major-Version: 1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

No content response after succesful deletion of the resource

```http
HTTP/1.1 204 No Content
Content-Type: application/json
API-Version: 1.0.3
Request-Id: f0e1d2c3-b4a5-6789-0abc-def123456789
Request-Date-Time: 2025-03-28T13:01:53.557Z
```

### <a id="r004"></a>[R004] APIs **SHOULD NOT** expose implementation details of the underlying application, development platforms/frameworks or database systems/persistence models

The Layered System principle allows an architecture to be composed of hierarchical layers by constraining component behavior. In a layered system, each component cannot see beyond the immediate layer they are interacting with. APIs therefore **MUST** hide irrelevant implementation details. An API **SHOULD NOT** expose implementation details of the underlying application, development platforms/frameworks or database systems/persistence models because:

- The primary motivation behind this design rule is that an API design **MUST** focus on usability for the client, regardless of the implementation details under the hood.
- The API, application and infrastructure **MUST** be able to evolve independently to ease the task of maintaining backwards compatibility for APIs during an agile development process.
- The API design of Convenience- and Process API types **SHOULD NOT** be a 1-on-1 mapping of the underlying domain- or persistence model.
- The API design of a System API type **MAY** be a mapping of the underlying persistence model.
- The API **SHOULD NOT** expose information about the technical components being used, such as development platforms/frameworks or database systems.
- The API **SHOULD** offer client-friendly attribute names and values, while persisted data may contain abbreviated terms or serializations which might be cumbersome for consumption.

### <a id="r005"></a>[R005] APIs **MAY** support client-side caching in `GET` operations

The cacheable REST principle requires that APIs **MAY** support client-side caching of frequently accessed resources in `GET` operations. The response **MUST** implicitly or explicitly label itself as cacheable or non-cacheable, using the standard HTTP response header variables (`Expires`, `Cache-Control`, `ETag`and/or `Last-Modified`). If the response is cacheable, the client application gets the right to reuse the response data later for equivalent requests and a specified period.

APIs **MUST NOT** use caching in other operations than `GET`.  According to [AASG Rule [S003](#s003) APIs **SHOULD** prevent sensible data from being cached using the response header variable `Cache-Control: no-store`.

### 2.5 Payloads

Additional information in an API request or response that is not part of the HTTP method, URL, or headers must be exchanged in the request and response payloads. The rules in this section apply to these payloads.

### <a id="p001"></a>[P001] APIs **MUST** use JSON as payload data interchange format

APIs **MUST** use JSON ([RFC 7159](#rfc7159)) to represent structured (resource) data passed with HTTP requests and responses as body payload. 

### <a id="p002"></a>[P002] APIs **MUST** use standard JSON media types

The standard media types `application/json` (normal operations), `application/json-patch+json` (`PATCH` operations, see [P012](#p012)) or `application/problem+json` (to support problem JSON, see: [P013](#p013)) **MUST** be used as `Content-Type` and `Accept` header information.

### <a id="p003"></a>[P003] Schema names **MUST** be singular

Since a schema represent a single instance of an entity, schema names **MUST** be singular.

### <a id="p004"></a>[P004] Schema names **MUST** be CamelCase (PascalCase)

All schema names MUST be CamelCase (a.k.a PascalCase) matching regex `^[A-Z][a-z\d]*([A-Z][a-z\d]*)*$`

### <a id="p005"></a>[P005] Property names **MUST** be lowerCamelCase

All property names **MUST** be lowerCamelCase matching regex `^[a-z][a-z\d]*([A-Z][a-z\d]*)*$`. 

### <a id="p006"></a>[P006] Array properties **MUST** have a plural name

Properties names of arrays **MUST** be pluralized to indicate that they contain multiple values. This implies in turn that object names **MUST** be singular. 

#### ✔ Example schema (yaml) for rules [P003](#p003), [P004](#p004), [P005](#p005) and [P006](#p006)

```YAML
    InboundDeliveryDetail:                             # ✔ schemaname CamelCase
      title: Inbound Delivery detail
      type: object
      description: |
        'Detail of materials and inputs delivered by a supplier to a grower as input for their crop process. An inbound delivery describes a certain amount of a certain product acquired by a grower through an order to a supplier.'
      required:
        - thirdPartyIds                                # ✔ property names lowerCamelCase, array properties plural, other singular
        - dateOfDelivery
        - quantity
        - product
        - location
      properties:
        thirdPartyIds:
          allOf:
            - $ref: '#/components/schemas/ThirdPartyIdsType'
          description: 'List of alternative identifiers with which the inbound delivery is identified by third parties.'
        dateOfDelivery:
          allOf:
            - $ref: '#/components/schemas/DateType'
          description: 'Date at which the product is delivered at the location of the grower ("YYYY-MM-DD")'
        quantity:
          allOf:
            - $ref: '#/components/schemas/MeasureType'
          description: 'Quantity of the product delivered to the grower.'
        product:
          $ref: '#/components/schemas/ProductDetails'
        location:
          allOf:
            - $ref: '#/components/schemas/ProductionLocationDetails'
          description: 'Identification of the production location of the grower at which the product is delivered'
```

### <a id="p007"></a>[P007] Properties with value `null` and absent properties **MUST** be handled the same way

OpenAPI 3.x allows to mark properties as `required` and as `nullable` to specify whether properties may be absent (as in: `{}`) or can have the value `null` (as in: `{"example":null}`). If a property is defined to be not `required` _and_ `nullable` (see 2nd row in Table below), rule P007 demands that both cases **MUST** be handled in the exact same manner by specification.

| required | nullable | `{}`   | `{"example":null}` |
| -------- | -------- | ------ | ------------------ |
| true     | true     | ❌ No  | ✔ Yes             |
| false    | true     | ✔ Yes | ✔ Yes             |
| true     | false    | ❌ No  | ❌ No              |
| false    | false    | ✔ Yes | ❌ No              |

#### Example

Following two requests should be handled identically.

Client creates a new crop for a certain grower with `name` property set to `null` (which is allowed because the property is (not required and) nullable):

```http
POST /growers/com.my-mps.codelists.registratienummer/12345/crops HTTP/1.1
Host: standard-api.agroconnect.nl
Content-Type: application/json
Accept: application/json, application/problem+json
Major-Version: 1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "thirdPartyIds": [
    { "content": "66382"
    , "schemeId": "com.my-mps.codelists.teeltnummer" }
  ],
  "name": null,                                              # name set to null
  "startDate": "2025-03-12",
  "endDate": "2025-11-30",
  "year": 2025,
  "country": "NL",
  "plantSpecies": [ { "plantSpecies": "1010101"
                    , "variety": "01201" } ]
  ...                  
}
```

Alternatively, the client creates a new crop for a certain grower omitting the `name` property (which is allowed because the property is not required (and nullable)):

```http
POST /growers/com.my-mps.codelists.registratienummer/12345/crops HTTP/1.1
Host: standard-api.agroconnect.nl
Content-Type: application/json
Accept: application/json, application/problem+json
Major-Version: 1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "thirdPartyIds": [
    { "content": "66382"
    , "schemeId": "com.my-mps.codelists.teeltnummer" }
  ],
  "startDate": "2025-03-12",                                  # name property not defined
  "endDate": "2025-11-30",
  "year": 2025,
  "country": "NL",
  "plantSpecies": [ { "plantSpecies": "1010101"
                    , "variety": "01201" } ]
  ...                  
}
```

### <a id="p008"></a>[P008] Date properties **MUST NOT** have a time component if only the date is relevant

Properties representing dates (without time) **MUST** use `date` format and **MUST** exclude time components. Including time portions reduces understandability and increases complexity due to timezone conversions.

### <a id="p009"></a>[P009] Date, datetime and time properties **MUST** use RFC9557/ISO8601 formats

OpenAPI does not know date, datetime or time data types, though represents dates, datetimes and times as _strings_ with the appropriate  _format_. All date, datetime and time fields in requests and responses **MUST** adhere to [RFC 9557](#rfc9557) _and_ [ISO 8601](#iso-8601-date-and-time-format) formats. Each field in the OpenAPI specification **MUST** set `type: string` and set `format` to the OpenAPI format as listed in the following table:

| Field type | ISO8601 format | OpenAPI format (yaml)                  | Syntax                                                                                               | Examples                                                                                             |
| ---------- | -------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Date       | full-date      | `type: string`<br>`format: date`       | `YYYY-DD-MM`                                                                                         | `2026-04-08`                                                                                         |
| Datetime   | date-time      | `type: string`<br>`format: date-time`  | `YYYY-DD-MMThh:mi:ssZ`<br>`YYYY-DD-MMThh:mi:ss±hh:mm`<br>`YYYY-DD-MMThh:mi:ss.sssZ`<br>`YYYY-DD-MMThh:mi:ss.sss±hh:mm` | `2026-04-08T13:17:49Z`<br>`2026-04-08T15:17:49+02:00`<br>`2026-04-08T13:17:49.824Z`<br>`2026-04-08T15:17:49.824+02:00` |
| Time       | partial-time   | `type: string`<br>`format: time-local` | `hh:mm`<br>`hh:mm:ss`                                                                                | `15:17`<br>`15:17:49`                                                                                |

RFC 9557 is a profile on ISO 8601, but is not a strict subset of allowed notations. Practically, to adhere to both, the following limitations MUST be applied to RFC 9557:

- In a field with a date-time value, the date and time components **MUST** be separated by a `T` in uppercase.
- The timezone offset `Z` (meaning UTC) **MUST** be uppercase.
- `-00:00` **MUST NOT** be used as timezone offset. `+00:00` **MAY** be used as timezone offset to indicate an offset of 0h and 0m.

### <a id="p010"></a>[P010] APIs **MUST** accept all timezone offsets in requests and **SHOULD** use UTC in responses

APIs **MUST** accept any timezone offset (including `Z`) in fields in requests containing a datetime. Fields in responses containing a datetime **SHOULD** be in UTC (e.g. `Z` as timezone offset).

### <a id="p011"></a>[P011] `GET` and `DELETE`operations **MUST NOT** have a request payload 

Because of their nature (retrieving and removing resources) `GET` and `DELETE` operations **MUST NOT** have a request payload. Whenever a client does pass a request payload to a `GET` or `DEL` operation, a `400 Bad Request`error **MUST** be returned.

### <a id="p012"></a>[P012] `PATCH` operations **MUST** use the standard _JavaScript Object Notation (JSON) Patch_ as request payload 

`PATCH`operations **MUST NOT** use the normal resource representation in the request payload, but **MUST** use _JavaScript Object Notation (JSON) Patch_ as described in [RFC 6902](#rfc6902). The HTTP request header variable `Content-Type` **MUST** be set to `application/json-patch+json`. As with all operations, the response payload of a `PATCH` request **MUST** contain the full representation of the updated resource (see: [R002](#r002)).

#### Example `PATCH` request using RFC 6902

`PATCH` request to modify existing grower resource with registration number 12345. In this example, the postal code is updated and an email address is added.

```http
PATCH /growers/com.my-mps.codelists.registratienummer/12345 HTTP/1.1
Host: standard-api.agroconnect.nl
Content-Type: application/json-patch+json
Accept: application/json, application/problem+json
Major-Version: 1

[
  { "op": "replace", "path": "/postalAddress/postalCode", "value": "3521 AA" },
  { "op": "add", "path": "/emailAddress", "value": "info@delier.nl" }
]
```

Response contains complete representation of the updated grower resource

```http
HTTP/1.1 200 OK
Content-Type: application/json
API-Version: 1.0.3
Request-Id: 9f1c2b3a-4d5e-6f70-81a2-b3c4d5e6f701
Request-Date-Time: 2025-03-12T15:31:21.123Z

{
  "id": {
    "content": "e3c8a1b2-4f6e-4a2d-8e3b-9c1d2e3f4a5b",
    "schemeId": "com.my-mps.codelists.guid"
  },
  "thirdPartyIds": [
    {
      "id": "09123559",
      "type": "nl.kvk.codelist.kvknummer"
    },
    {
      "id": "870012388392",
      "type": "com.gs1.codelist.gln"
    }
  ],
  "name": "Kwekerij De Lier",
  "personName": "J. de Lier",
  "phoneNumber": "+31(0)74 26653244",
  "telefaxNumber": null,
  "emailAddress": "info@delier.nl",
  "iban": "NL04ABNA0667352669",
  "websiteUrl": "www.delier.nl",
  "postalAddress": {
    "postalCode": "3521 AA",
    "cityName": "Naaldwijk",
    "streetName": null,
    "streetNumber": null,
    "country": "NL",
    "countryName": "Netherlands",
    "postalBoxId": 4411
  },
  "visitorsAddress": {
    "postalCode": "3521 AN",
    "cityName": "Naaldwijk",
    "streetName": "Broekweg",
    "streetNumber": 12,
    "country": "NL",
    "countryName": "Netherlands",
    "postalBoxId": null
  }
}
```

### <a id="p013"></a>[P013] Response payloads of erroneous requests **MUST** use the standard _Problem Details for HTTP APIs_

When an API request results in an error (HTTP 4xx of HTTP-5xx), the response payload **MUST** contain the "Problem Details for HTTP APIs" as specified in [RFC 9457](#rfc9457). The `Content-Type` variable in the HTTP response header **MUST** be set to `application/problem+json` to inform the client about the responded content type. 

As a consequence, each request **MUST** include `application/problem+json` in its `Accept` request header,  expressing that the client is willing to receive this content type.

#### Example error responses using Problem Details for HTTP APIs payload 

Example error response for HTTP 400 Bad Request using Problem Details for HTTP APIs payload

```http
HTTP/1.1 400 Bad Request
Content-Type: application/problem+json
API-Version: 1.0.3
Request-Id: 2a3d4f5b-6c7e-8f90-1234-56789abcdef0
Request-Date-Time: 2026-06-22T12:34:56.789Z

{
  "type": "https://example.com/probs/invalid-request",
  "title": "Invalid request payload",
  "status": 400,
  "detail": "The request contains validation errors.",
  "instance": "/growers/com.my-mps.codelists.registratienummer/12345",
  "errors": [
    {
      "field": "/postalAddress/postalCode",
      "message": "Postal code must be provided in the format 'NNNN AA'."
    }
  ]
}
```

Example error response for HTTP 401 Unauthorized using Problem Details for HTTP APIs payload

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/problem+json
API-Version: 1.0.3
Request-Id: 3b4e5f6c-7d8e-9f01-2345-6789abcdef01
Request-Date-Time: 2026-06-23T09:15:32.456Z

{
  "type": "https://example.com/probs/unauthorized",
  "title": "Authentication failed",
  "status": 401,
  "detail": "The request lacks valid authentication credentials. Ensure the 'Authorization' header contains a valid bearer token.",
  "instance": "/growers/com.my-mps.codelists.registratienummer/12345"
}
```

### 2.6 HTTP methods and responses [Hxxx]

Although the REST architectural style does not impose a specific protocol, REST APIs are typically implemented using HTTP Semantics as specified in  [RFC 9110](#rfc9110).

### <a id="h001"></a>[H001] API Operations **MUST** use only standard HTTP methods

An API Operation (=HTTP-Method plus resource) **MUST** adhere to the HTTP method semantics defined in [RFC 9110](#rfc9110).

The HTTP specifications offer a set of standard methods, where every method is designed with explicit semantics. Adhering to the HTTP specification is crucial, since HTTP clients and middleware applications rely on standardized characteristics. An exception to this rule is the HTTP `PATCH` method, which is not described in RFC9110 but which is allowed for partial updates of resources (see: [P012](#p012)).

The following table shows on which resource type (singleton or collection) a HTTP method **MAY** or **MUST NOT** be implemented and the effect the HTTP method **MUST** have when used in a (successful) request.

| Method   | Operation              | Collection Resource (e.g. /growers)                                                                  | Singleton Resource (e.g. /growers/com.gs1.codelists.gln/8700292113955)                               |
| -------- | ---------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `GET`    | Read                   | ✔ Retrieve a collection resource representation for the given URI. Data is only retrieved and never modified. | ✔ Retrieve a singleton resource representation for the given URI. Data is only retrieved and never modified. |
| `POST`   | Create                 | ✔ Create a new singleton resource as part of a collection.                                          | ❌ Avoid using `POST` on a singleton resource. Return `405 Method Not Allowed`                       |
| `PUT`    | Update/ Replace        | ❌ Avoid using `PUT` on a collection resource. Return `405 Method Not Allowed`                       | ✔ Replace an existing resource with the given URI (full update)                                     |
| `PATCH`  | Partial Update/ Modify | ❌ Avoid using `PATCH` on a collection resource, Return `405 Method Not Allowed`                     | ✔ Partially update an existing resource.                                                            |
| `DELETE` | Delete                 | ❌ Avoid using `DELETE` on a collection resource, Return `405 Method Not Allowed`                    | ✔ Remove a resource with the given URI.                                                             |

If an optional HTTP request method is sent to a server and the server does not support that HTTP method for the target resource, an HTTP status code `405 Method Not Allowed` shall be returned and a list of allowed methods for the target resource shall be provided in the `Allow` header in the response as stated in [RFC 9110 15.5.6](#rfc9110).

### <a id="h002"></a>[H002] API Operations **MUST** adhere to HTTP safety and idempotency semantics for operations

API operations **MUST** adhere to HTTP safety and idempotency semantics for operations a specified in the HTTP protocol [RFC 9110](#rfc9110). These characteristics are important for clients and middleware applications, because they **SHOULD** be taken into account when implementing caching and fault tolerance strategies.

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

### <a id="h003"></a>[H003] API Responses **MUST** use standard HTTP status codes to convey appropriate errors

API Responses **MUST** use standard HTTP status codes to convey appropriate errors. Always use the semantically appropriate HTTP [status code](#rfc9110) for the response.

In case of an error, the server **SHOULD NOT** pass technical details (e.g. call stacks or other internal hints) to the client. The error message **SHOULD** be generic to avoid revealing additional details and expose internal information which can be used with malicious intent.

### <a id="h004"></a>[H004] `GET`, `POST`, `PUT`, `PATCH` and `DELETE` operations **MUST** at least support standard response codes

The HTTP operations `GET`, `POST`, `PUT`, `PATCH` and `DELETE` **MUST** _at least_ support the following response codes:

| Operation                                                          | Result                                                                                               | Response code                                                                                        |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `GET` on collection resource<br>(with or without query parameters) | - successful response returning list with **0** of more items. <br>- bad request (e.g. malformed query parameters)<br>- authentication failed<br>- (unspecified) server-side error | - `200 OK`<br>- `400 Bad Request`<br>- `401 Unauthorized`<br>- `500 Internal Server Error`           |
| `GET` on singleton resource<br>(with resource id in the URI)       | - successful response returning list with exactly **1** item.<br>- bad request (e.g. malformed query parameters)<br>- authentication failed<br>- resource indicated is not found (does not exist or client has no access to the resource)<br>- (unspecified) server-side error | - `200 OK`<br>- `400 Bad Request`<br>- `401 Unauthorized`<br>- `404 Not Found`<br>- `500 Internal Server Error` |
| `POST`                                                             | - successful creation of the new resource or successful acceptance of the `POST`request for further processing (asynchronously)<br>- bad request (e.g. malformed request payload)<br>- authentication failed<br>- forbidden (e.g. when posting new instances to a resource collection the client is not allowed to)<br>- (unspecified) server-side error | - `201 Created` or `202 Accepted`<br>- `400 Bad Request`<br>- `401 Unauthorized`<br>- `403 Forbidden`<br>- `500 Internal Server Error` |
| `PUT`                                                              | - successful replace of the resource or successful acceptance of the `PUT`request for further processing (asynchronously)<br>- bad request (e.g. malformed request payload)<br>- authentication failed<br>- forbidden (e.g. when replacing an instance of a resource the client is not allowed to)<br>- resource indicated is not found (does not exist or client has no access to the resource)<br>- (unspecified) server-side error | - `200 OK` or `202 Accepted`<br>- `400 Bad Request`<br>- `401 Unauthorized`<br>- `403 Forbidden`<br>- `404 Not Found`<br>- `500 Internal Server Error` |
| `PATCH`                                                            | - successful partial update the resource or successful acceptance of the `PATCH` request further processing (asynchronously)<br>- bad request (e.g. malformed payload)<br>- authentication failed<br>- forbidden (e.g. when updating an instance of a resource the client is not allowed to)<br>- resource indicated is not found (does not exist or client has no access to the resource)<br>- (unspecified) server-side error | - `200 OK` or `202 Accepted`<br>- `400 Bad Request`<br>- `401 Unauthorized`<br>- `403 Forbidden`<br>- `404 Not Found`<br>- `500 Internal Server Error` |
| `DELETE`                                                           | - successful removal of the resource or successful acceptance of the `DELETE` request for further processing (asynchronously)<br>- bad request (e.g. malformed payload)<br>- authentication failed<br>- forbidden (e.g. when posting sub-resources to a resource on which the client is not allowed to)<br>- resource indicated is not found (does not exist or client has no access to the resource)<br>- (unspecified) server-side error | - `204 No content` or `202 Accepted`<br>- `400 Bad Request`<br>- `401 Unauthorized`<br>- `403 Forbidden`<br>- `404 Not Found`<br>- `500 Internal Server Error` |

Remarks:

A `GET` request on a **collection** resource resulting in a response with no items found is _not_ considered as a (client) failure and therefore a status code `200 Ok` with an empty list is returned. A `GET` request on a specific **singleton** resource (with a resource identifier in the URI) which results in a response with no items found, is considered as a client failure because the resource identifier provided by the client does not match a resource on the server. In this case a response code `404 Not Found` is returned to the client.

### <a id="h005"></a>[H005] The `PUT` method **MUST NOT** be implemented as an insert-or-update operation 

A `PUT` request on a resource (identified by the given resource id) which does not exist, **MUST** result in an `404 Not Found` error and **MUST NOT** be processed as an alternative create (insert) operation. 

### <a id="h006"></a>[H006] The HTTP `400 Bad Request` error code **MUST** be used for invalid input

API requests containing invalid input **MUST** result in HTTP status code `400 Bad Request`. Invalid input includes syntax errors, missing or invalid query parameters. The request payload **SHOULD** be validated with a schema. A request payload with schema validation error **MUST** be treated as invalid input.

In addition, a request that contains syntactical valid input but which can not be processed because of sementical validation errors, **SHOULD** return a `422 Unprocessable Entity`.

### <a id="h007"></a>[H007] All bad request errors **SHOULD** be returned together

API requests with HTTP status code `400 Bad Request` **SHOULD** include all applicable schema validation errors and **MAY** include additional errors.

Rationale

To reduce the amount of roundtrips between client and server, all applicable schema validation errors **SHOULD** be returned together. This allows a client to present validation errors to a user in one go, reducing user friction with multiple retries.

#### Example error response for multiple HTTP 400 Bad Request errors

```http
HTTP/1.1 400 Bad Request
Content-Type: application/problem+json
API-Version: 1.0.3
Request-Id: 2a3d4f5b-6c7e-8f90-1234-56789abcdef0
Request-Date-Time: 2026-06-22T12:34:56.789Z

{
  "type": "https://example.com/probs/invalid-request",
  "title": "Invalid request payload",
  "status": 400,
  "detail": "The request contains validation errors.",
  "instance": "/growers/com.my-mps.codelists.registratienummer/12345",
  "errors": [
    {
      "field": "/postalAddress/postalCode",
      "message": "Postal code must be provided in the format 'NNNN AA'."
    },
    {
      "field": "/emailAddress",
      "message": "Email address must be a valid email format."
    }
  ]
}
```

### <a id="h008"></a>[H008] The HTTP `401 Unauthorized` error code **MUST** only be used for authentication failures

Although the standard description of the HTTP `401` error is: `Unauthorized` this error **MUST** only be returned as a result of a failed **authentication** (e.g. API-key or OAuth2-token) validation. In case clients are successfully authenticated and perform an operation they are not **authorized** (allowed) to, a `403 Forbidden` **SHOULD** be returned. Alternatively a `404 Not Found` **MAY** be returned to hide the information on the existence of the resource for the client (for safety reasons).

## <a id="chapter3"></a>3. Compliancy matrixes NLGov REST API Design Rules

The AGRI API Style Guide (AASG) follows the API Design Rules from the NL API Strategie published in the [NLGov REST API Design Rules](https://gitdocumentatie.logius.nl/publicatie/api/adr/) (short: _ADR_).  Our set of rules is composed of:

- rules **inherited** from the ADR: these rules apply unmodified but guiding examples can be changed to the Agri- and Food context.  An API specification that complies with **inherited** AASG rules thereby _also complies_ with the ADR, and _vice versa_.
- ADR rules which have been **extended** for the AASG by adding extra constraints to make them more strict. An API specification that complies with **extended** AASG rules thereby _also complies_ with the ADR, but not vice versa.
- ADR rules which are **customized** for the AASG. An API specification that follows **customized** AASG rules therefore _does not compl_y with the ADR
- rules which are not part of the _ADR_ and which are specifically designed for the AASG. Following these rules does not affect compliance with the ADR.

### Compliance Matrix: AASG Rules to ADR Rules

Following table offers an overview which ADR-rules are inherited, customized or ignored in the AGRI API Style Guide (AASG).í

| AASG Rule     | ADR Rule                                                                       | Adoption   | Remark                                                                                               |
| ------------- | ------------------------------------------------------------------------------ | ---------- | ---------------------------------------------------------------------------------------------------- |
| [M001](#m001) | `/core/doc-openapi`<br>`/core/publish-openapi`                                 | Inherited  | OpenAPI specification required                                                                       |
| [M002](#m002) | `/core/doc-openapi-contact`                                                    | Inherited  | API meta information and contact required                                                            |
| [M003](#m003) | `/core/doc-language`<br>`/core/interface-language`                             | Customized | AASG prefers U.S. English in specification. ADR allows English but prefers Dutch                     |
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
| `/core/interface-language`               | [M003](#m003) | Customized | AASG prefers U.S. English in specification                                                 |
| `/core/hide-implementation`              | [R004](#r004) | Inherited  | Hide implementation details from clients                                                   |
| `/core/http-methods`                     | [H001](#h001) | Extended   | Only use standard HTTP methods.<br>AASG does not allow PUT to be used for insert-or-update |
| `/core/http-safety`                      | [H002](#h002) | Inherited  | HTTP safety and idempotency semantics required                                             |
| `/core/http-response-code`               | [H003](#h003) | Inherited  | Use standard HTTP status codes for errors                                                  |
| `/core/stateless`                        | [R001](#r001) | Inherited  | APIs must be stateless                                                                     |
| `/core/nested-child`                     | [U007](#u007) | Inherited  | Child resources identified via path segments                                               |
| `/core/resource-operations`              | [U007](#u007) | Inherited  | Child resources identified via path segments                                               |
| `/core/error-handling/all-errors`        | [H007](#h007) | Inherited  | Bundle all bad request errors together in one response                                     |
| `/core/doc-language`                     | [M003](#m003) | Customized | AASG uses U.S. English documentation                                                       |
| `/core/deprecation-schedule`             | [M005](#m005) | Inherited  | Transition between major versions                                                          |
| `/core/transition-period`                | [M005](#m005) | Inherited  | Transition between major versions                                                          |
| `/core/changelog`                        | [M005](#m005) | Inherited  | Add change log for each version                                                            |
| `/core/transport/no-sensitive-uris`      | [S002](#s002) | Inherited  | Do not include sensitive information in URIs                                               |
| `/core/modules/geospatial`               | -             | ADR Only   | Not explicitly implemented in AASG                                                         |
| `/core/modules/signing`                  | -             | ADR Only   | Not explicitly implemented in AASG                                                         |
| `/core/modules/encryption`               | -             | ADR Only   | Not explicitly implemented in AASG                                                         |

## 4. Conformation

The following references are used in this style guide:

- <a id="bcp14"></a> [BCP 14](https://www.rfc-editor.org/info/bcp14): Key words for use in RFCs to Indicate Requirement Levels. S. Bradner. IETF. March 1997. Best Current Practice.<br>
- <a id="rfc2119"></a> [IETF RFC 2119](https://www.rfc-editor.org/rfc/rfc2119): Key words for use in RFCs to Indicate Requirement Levels. S. Bradner. IETF. March 1997. Best Current Practice.<br>
- <a id="rfc3986"></a> [IETF RFC 3986](https://www.rfc-editor.org/rfc/rfc3986): Uniform Resource Identifier (URI): Generic Syntax. T. Berners-Lee; R. Fielding; L. Masinter. IETF. January 2005. Internet Standard.
- <a id="rfc6749"><a> [IETF RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749): The OAuth 2.0 Authorization Framework. D. Hardt, Ed. October 2012. Standards Track.
- <a id="rfc6902"></a> [IETF RFC 6902](https://www.rfc-editor.org/rfc/rfc6902): JavaScript Object Notation (JSON) Patch. P. Bryan; E. Nottingham. IETF. April 2013. Proposed Standard.
- <a id="rfc7159"></a> [IETF RFC 7159](https://www.rfc-editor.org/info/rfc7159): The JavaScript Object Notation (JSON) Data Interchange Format. D. Crockford. IETF. March 2014. Proposed Standard.
- <a id="rfc8174"></a> [IETF RFC 8174](https://www.rfc-editor.org/rfc/rfc8174): Ambiguity of Uppercase vs Lowercase in RFC 2119 Key Words. B. Leiba. IETF. May 2017. Best Current Practice.
- <a id="rfc8252"></a> [IETF RFC 8252](https://datatracker.ietf.org/doc/html/rfc8252): OAuth 2.0 for Native Apps. B. Campbell; E. Mortensen; J. Bradley; et al. IETF. October 2017.
- <a id="rfc9110"></a> [IETF RFC 9110](https://www.rfc-editor.org/rfc/rfc9110): HTTP Semantics. R. Fielding; M. Nottingham; J. Reschke. IETF. June 2022. Standards Track.
- <a id="rfc9457"></a> [IETF RFC 9457](https://www.rfc-editor.org/rfc/rfc9457): Problem Details for HTTP APIs. M. Nottingham; E. Wilde; S. Dalal. IETF. July 2023. Proposed Standard.
- <a id="rfc9557"></a> [IETF RFC 9557](https://www.rfc-editor.org/rfc/rfc9557): Date and Time on the Internet: Timestamps with Additional Information. U. Sharma; Igalia, S.L.; C. Bormann. IETF. July 2023. Proposed Standard.
- <a id="draft-health-check-response-format"></a> [IETF Draft: Health Check Response Format for HTTP APIs](https://datatracker.ietf.org/doc/draft-inadarei-api-health-check/): I. Nadareishvili. IETF. April 19, 2022.
- <a id="draft-json-hal"></a> [IETF Draft: JSON Hypertext Application Language](https://www.ietf.org/archive/id/draft-kelly-json-hal-11.html): M. Kelly. IETF. April 21, 2024. Informational Draft.
- <a id="iso-3166-country-codes"></a> [ISO-3166-1](https://www.iso.org/standard/72482.html) Codes for the representation of names of countries and their subdivisions — Part 1: Country code. International Organization for Standardization (ISO) ISO 3166-1:2020.
- <a id="iso-8601-date-and-time-format"></a> [ISO8601-1](https://www.iso.org/standard/70907.html) Date and time — Representations for information interchange — Part 1: Basic rules. International Organization for Standardization (ISO) ISO 8601-1:2019.
- <a id="ncsc2025"></a> [NCSC 2025](https://www.ncsc.nl/wat-kun-je-zelf-doen/documenten/publicaties/2025/juni/01/ict-beveiligingsrichtlijnen-voor-transport-layer-security-2025-05) Transport Layer Security (TLS) richtlijnen 2025-05 NCSC. June 2025. 
- <a id="openapi-specification"></a> [OpenAPI Specification](https://www.openapis.org/): Darrell Miller; Jason Harmon; Jeremy Whitlock; Marsh Gardiner; Mike Ralphson; Ron Ratovsky; Tony Tam; Uri Sarid. OpenAPI Initiative.
- <a id="semver"></a> [SemVer](https://semver.org) Semantic Versioning 2.0.0. T. Preston-Werner. June 2013.