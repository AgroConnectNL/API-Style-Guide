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

The examples in this style guide are based on the AgroConnect eCrop standard.

