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

