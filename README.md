# OpenAlexPOC

* Site web : https://openalex.org/
* Descrption : An open and comprehensive catalog of scholarly papers, authors, institutions, and more.
* Gitbook : https://docs.openalex.org/
* Twitter : https://twitter.com/openalex_org
* Explore : https://explore.openalex.org/

Développé par l'équipe OurResearch, les mêmes qui sont derrière Unpaywall


## Entités

7 types d'entitées sont présentes dans OpenAlex :
* works
* authors
* sources
* institutions
* concepts
* publishers
* geo


## Idées

| Idée | Pour qui ? | Quoi ? | Comment ? |
| --- | --- | --- | --- |
| **Construction du réseau thématique de la recherche française ?** |  |  |  |
| **Portrait robot de la recherche dans un pays (hors France)** <br> positionnement international publi, top institutions, chercheurs, points forts (thématiques) | SSRI ? CurieXPlore ? | graphes standards | - liste des indicateurs <br> - requêtes API + calculs python - dataviz |
| **Portrait robot des liens France ↔ un autre pays en matière de recherche**<br> - quelle intensité de la collab ? - sur quelles thématiques ? - quelles institutions ? chercheurs ? | SSRI ?CurieXPlore ? | graphes standards | - liste des indicateurs - requêtes API + calculs python - dataviz |
| **Outil d’aide à retrouver les publications et les signatures pour un établissement** | Etablissements | moteur de recherche, liste, exports | moteur de recherche + exports |
| **Cartographie des communautés de recherche sur un sujet donné** <br> - dans le monde - en France - ou se positionne la France dans la cartographie mondiale ? ex https://www.kenelyze.com/whos-who-in-large-language-model-science-mapping-science-as-a-graph/ <br> aussi https://github.com/filipinascimento/openalexnet |  | réseaux, graphes standards, listes  |  |
| **Identification de liens d’intérêts particuliers** Pays / Institution / Sujet<br> - par ex co-publication CEA x russie par exemple ? - ou encore CNRS x Philip Morris ? https://api.openalex.org/works?filter=raw_affiliation_string.search:philip%20morris,institutions.country_code:FR |  |  |  |
| **Estimation de la porosité public-privé** <br> - par ex co-publication d'une liste de nom d'entreprise, ou suffixe (ltd, sarl, gmbh...)  avec la france ?  par discipline, top entreprise, top labo ?|  |  |  |
