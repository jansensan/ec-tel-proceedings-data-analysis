# Data Analysis of Gender and Interdisciplinary Distribution of the European Conference on Technology Enhanced Learning (EC-TEL) Proceedings for 2016, 2017, and 2018

## Abstract

TODO


## 1. Introduction

TODO


## 2. Methodology


### Gathering the data

In order to analyse the data, we first had to obtain the data. As the EC-TEL conference website [#] does not provide the list papers and their authors in an open source data format, we had to create our own dataset. Proceedings of past conferences are available for download on PDF format on the website Springer—the publisher of the proceedings. Below are the publications that we downloaded for analysis:

- 13th European Conference on Technology Enhanced Learning, EC-TEL 2018, Leeds, UK, September 3-5, 2018, Proceedings [#]
- 12th European Conference on Technology Enhanced Learning, EC-TEL 2017, Tallinn, Estonia, September 12–15, 2017, Proceedings [#]
- 11th European Conference on Technology Enhanced Learning, EC-TEL 2016, Lyon, France, September 13-16, 2016, Proceedings [#]

While PDF is an open format [#], the complexities of the limited scripting capabilities of the format hindered attempts at automating data scraping. Instead, we opted to manually create a dataset for each year in JSON format. [#] JSON was chosen over CSV for its object-oriented logic. For example, rather than creating a duplicate row for each author of each paper, it was possible to structure the dataset so that each paper had its unique properties. Doing so in a CSV or a spreadsheet would not have been as efficient.

For each paper, we saved the data as follows:

- The **title** of the paper;
- The **type** (e.g. full paper, poster paper, etc.), determined by what chapter in the proceedings book the paper was located;
- The **name of the authors** and their **associated details**.

For each author of a paper, we saved the following information:

- **Full name**. We did not separate first name, last name, or any other type of name that may exist because we were not analyzing the names of the authors specifically. Also, there are many falsehoods that we may believe concerning names [#], and we did not see how our potential bias would have helped our analysis.
- **Gender**, since one of the main axes of our analysis is to uncover the gender distribution of the authors of the conferences. We went with binary values—*woman*/*man*—for simplicity's sake.  
  As there are authors from all around the world, it was not always obvious to us with only the name whether the author would be a woman or a man. When in doubt, we would find the author on ResearchGate, LinkedIn, or on the website of the institution where they work, to find a profile photo and figure it out from there.
- **Department** and **institution name**. While not all authors listed a department, all of them listed the institution with which they were associated at the time of publishing the paper. When more than one institution was listed, only the first one was commited to the dataset, for simplicity's sake.  
  When cleansing the data, we discovered some discrepancies in how researchers wrote the name of their institution. For example, "Norwegian University of Science and Technology" was sometimes written exactly like that, while at other times only as its accronym ("NTNU"), or with both ("Norwegian University of Science and Technology (NTNU)". We standardized the value entered in our dataset, to allow for a more meaningful analysis.  
  Another example of discrepancy is when authors write the name of the institution in the original language in a case, and translated in English in another. This was the case with the "Instituto Nacional de Astrofísica, Óptica y Electrónica" from Mexico, sometimes written in Castillan, sometimes written in English ("National Institute of Astrophysics, Optics and Electronics").  
  Since the authors can together speak or read in English, Castillan, Catalan, and French, they were able to cleanse quite a few of those entries, but also recognize that there may have been other entries that they could not catch.
- **Country**. We saved the country in which the institution is located with the 2-letter code defined by ISO (International Organization for Standardization).
- **Field in which the researcher works**. In this case, we also went with a simplified binary values: *engineering*, and *social sciences*. Since the EC-TEL conferences revolve around technology and education, we wanted to investigate what proportion of authors come from engineering, and what proportion came from social sciences. We also wanted to explore if there were interdisplinarity within the paper themselves.  
  We had in mind that fields computer sciences and engineering would fall under engineering, while education, pedagogy, learning sciences would fall under social sciences.  
  We acknowledge that the fields in which researchers work are not always so clear cut. Sometimes it was obvious, depending on the departments or institution the authors listed, but at other times we had to investigate. Just like we did for their gender, we explored ResearchGate, LinkedIn, etc. to uncover in what field they would fall. Ultimately, it would always end up being our judgment call.  

While this may be counter intuitive, this manual data entry approach allowed us to cleanse and standardize the data along the way, rather than during a long process afterwards. For example, there were moments when we would recognize an author from a previous paper, thus saving time from rewriting all the data. At other times, institution names were written slightly differently from one paper to another, or accronyms were used instead of the full name. In those cases, we were able to standardize the values we entered in the dataset right away, since we knew that would help us later in the analysis.


### Analyzing the data

Once we had all the data in hand, we wanted to visualize the analyses (see the section *3. Results*). We opted for a web application built with open source libraries, mainly the following:

- **D3**: a library for visualizing data dynamically [#].
- **React**: a framework for building user interface components [#];
- **Lodash**: a utility that facilitates and improves data manipulation [#];

The web application sources and data publicly available on a Github repository. [#]

TODO:

- describe each analysis?


## 3. Results

### Location Diversity

#### Country Distribution

Percentage of authors per country, sorted in descending order, based on cumulative percentage of authors over years covered by the analysis.

![](fig-01-location-diversity.png)


#### Continent Distribution

Percentage of authors per continent.

![](fig-02-continent-dist.png)


#### Institution Distribution

Number of authors per institution, sorted in descending order, based on cumulative number of authors over years covered by the analysis.

![](fig-03-institution-dist.png)


### Gender Diversity

#### Some Numbers

- Number of authors:
    - 2018: 213
    - 2017: 241
    - 2016: 272
- Number of women authors: 
    - 2018: 65
    - 2017: 79
    - 2016: 103
- Number of men authors: 
    - 2018: 148
    - 2017: 162
    - 2016: 169
- Mean representation of women per paper: 
    - 2018: 0.32
    - 2017: 0.34
    - 2016: 0.39

#### Gender Distribution

Percentage of unique authors of each gender.

![](fig-04-gender-dist.png)


#### Women as First Author

Papers in which a woman's name is the first name in the author list.

![](fig-05-women-as-1st-author.png)


#### Gender Diversity by Paper

TODO

![](fig-06-gender-diversity-by-paper.png)


### Interdisciplinarity

#### Field Distribution

TODO

![](fig-07-field-dist.png)


#### Gender Distribution per Field

TODO

![](fig-08-gender-dist-per-field.png)


## 4. Discussion

TODO

- EC-TEL could offer data already in open data format
- Researchers should ensure to standardize they way they note their institution in the title
- All should ensure that accented characters are written properly, instead of forced by layout, so that textual analysis is possible
- Since data all entered manually, potential for errors, which is why it's great that all of it is public, and that the figures generated dynamically with the dataset


## 5. Conclusion

TODO

- Clearly majority of men in both fields, although in engineering is much stronger
- Presence of women in engineering seems in decline amongst authors
- Decline of mean representation of women authors
- Decline of papers written by authors of mixed gender, rise of papers only written by men
- Authors from european institutions make up the vast majority of authors (not necessarily representative of origin of authors, only of institution with which they were associated when published their paper)


## References

- [D3.js - Data-Driven Documents](https://d3js.org/)
- [EC-TEL Proceedings Data Analysis](https://projects.jansensan.net/ec-tel-data-analysis/)
- [European Conference on Technology Enhanced Learning](http://www.ec-tel.eu/)
- [Falsehoods Programmers Believe About Names](https://www.kalzumeus.com/2010/06/17/falsehoods-programmers-believe-about-names/)
- [Github - EC-TEL Proceedings Data Analysis](https://github.com/jansensan/ec-tel-proceedings-data-analysis)
- [ISO 32000-2:2017 Document management -- Portable document format -- Part 2: PDF 2.0](https://www.iso.org/standard/63534.html)
- [Lodash](https://lodash.com/)
- [React – A JavaScript library for building user interfaces](https://reactjs.org/)
- [Springer - 11th European Conference on Technology Enhanced Learning, EC-TEL 2016, Lyon, France, September 13-16, 2016, Proceedings](https://link.springer.com/book/10.1007%2F978-3-319-45153-4)
- [Springer - 12th European Conference on Technology Enhanced Learning, EC-TEL 2017, Tallinn, Estonia, September 12–15, 2017, Proceedings](https://link.springer.com/book/10.1007/978-3-319-66610-5)
- [Springer - 13th European Conference on Technology Enhanced Learning, EC-TEL 2018, Leeds, UK, September 3-5, 2018, Proceedings](https://link.springer.com/book/10.1007/978-3-319-98572-5)
- [Springer - Analyzing 5 Years of EC-TEL Proceedings](https://link.springer.com/chapter/10.1007/978-3-642-23985-4_51)
- [Twitter - European Conference on Technology Enhanced Learning](https://twitter.com/ECTELconference)
