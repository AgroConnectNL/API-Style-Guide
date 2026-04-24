# AGRI API Style Guide

De AgroConnect *AGRI API Style Guide* is een richtlijn voor het ontwikkelen van RESTful API platforms. De *AGRI API Style Guide* is opgezet met als doel het bevorderen van de uniformiteit van RESTFul API platforms in de Agri- en Food sector. AgroConnect adviseert en stimuleert het gebruik van deze API Style Guide.

## Waarom een API Style Guide?

Een API Style Guide bevordert standaardisatie en consistentie bij RESTful API-ontwikkeling, met nadruk op het verhogen van het gebruiksgemak voor ontwikkelaars van zowel de platforms als de clients ("Developers Experience", "DX") als op het borgen van datakwaliteit en betrouwbaarheid in de Agri- en Foodsector. Toepassen van de Style Guide zorgt voor:

- **Consistentie, leesbaarheid en begrijpelijkheid**: Uniforme endpoints, schema's en responses en conventies maken APIs eenvoudiger te begrijpen en onderhouden, ideaal voor multidisciplinaire teams in de voedselketen.
- **Snellere onboarding**: Duidelijke richtlijnen versnellen de inwerkperiode voor nieuwe ontwikkelaars, cruciaal bij samenwerkingen tussen boeren, verwerkers en leveranciers
- **Minder fouten en kosten**: Voorkomt inconsistenties die bugs veroorzaken, verlaagt onderhoudskosten
- **Herbruikbaarheid**: de basis van een API platform dat volgende de regels van de Style Guide ontwikkeld is, kan in herbruikbare code worden vastgelegd en ingezet worden als startpunt voor elk nieuw platform. Dit vergroot de efficiency, versnelt de ontwikkeling en verlaagt  de ontwikkelkosten
- **Betere interoperabiliteit**: Faciliteert betere systeemintegratie, essentieel voor realtime data-uitwisseling in complexe voedselketens.
- **Hogere datakwaliteit en betrouwbaarheid**: Standaardiseert datavalidatie, formatting en error handling, wat zorgt voor nauwkeurige, consistente en traceerbare data – vitaal voor compliance, voedselveiligheid en ketentransparantie in de sector.

## Hoe is de *AGRI API Style Guide* opgezet?

AgroConnect ondersteunt de [NL API Strategie](https://docs.geostandaarden.nl/api/API-Strategie/) zoals deze is opgezet door het [Kennisplatform API's](https://developer.overheid.nl/communities/kennisplatform-apis). De normatieve onderdelen van de NL API Strategie worden vastgesteld en gepubliceerd door [Forum Standaardisatie](https://www.forumstandaardisatie.nl/) op de  [Pas-toe-of-leg-uit-lijst](https://www.forumstandaardisatie.nl/open-standaarden/verplicht).

De AGRI API Style Guide maakt gebruik van de [REST-API Design Rules | Forum Standaardisatie](https://www.forumstandaardisatie.nl/open-standaarden/rest-api-design-rules) die in deze lijst gepubliceerd zijn. Daarnaast adopteren we de volgende standaarden van de [Pas-toe-of-leg-uit-lijst](https://www.forumstandaardisatie.nl/open-standaarden/verplicht):
- [Geo-Standaarden | Forum Standaardisatie](https://www.forumstandaardisatie.nl/open-standaarden/geo-standaarden)
- [OpenAPI Specification | Forum Standaardisatie](https://www.forumstandaardisatie.nl/open-standaarden/openapi-specification)

## Waar bestaat de *AGRI API Style Guide* uit

De *AGRI API Style Guide* bestaat uit:

- de API Style Guide Documentatie (Engelstalig)
- ready-to-use OpenAPI.yaml en .json files die als basis gebruikt kunnen worden bij de opzet van een nieuw platform (in ontwikkeling)

Wij overwegen aanvullend een set Linter rules te publiceren waarmee een (aangepaste) OpenAPI-file gevalideerd kan worden op compliancy van (een deel van de) richtlijnen.

*Let op: voor de opzet van nieuwe API platforms die op één van de sectorstandaarden gebaseerd zijn (vb eCrop, ePigs), zijn in de betreffende repositories kant en klare OpenAPI specificaties gepubliceerd die, naast de basis specificaties, ook de sector-specifieke definities bevatten.*
