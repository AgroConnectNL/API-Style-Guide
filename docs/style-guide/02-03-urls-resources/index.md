### 2.3 URLs and Resources ([Uxxx])

The key abstraction of information in REST is a _resource_. Any information that we can name can be a resource. Each resource is identified by a unique address, the Uniform Resource Identifier (URI), which is part of the Uniform Resource Locator (URL). We distinguish two types of resources:

- **Collection** (resources): a resource that represents a _set of items_ of the same type. An example is the collection (list) of growers on a crop management platform which can be accessed with the URI `/growers`
- **Singleton** (resources): a resource that represents _one specific item_ from that set. An example is a specific grower on a crop management platform who has GLN (Global Location Number) issued by GS1 with value 8700292113955 as unique identification which can be accessed with the URI `/growers/com.gs1.codelist.gln/8700292113955`

This section defines the rules for naming resources and constructing URLs to identify them.

