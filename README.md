Boston University Course Description Search API
=========================

Tools for searching through the Boston University course description search.

##Example

```
var cds = require("bu-cds-api");

var test = {};

cds("cascs440", function (data) {
   test = data
});

/*
After cds runs, test will have the value

{"Spring 2015":{"LEC":[{"section":" A1","instructor":"Margrit Betke",
"location":" 209"}],"LAB":[{"section":" A2","instructor":"Margrit Betke"
,"location":"EMA 304"},{"section":" A3","instructor":"Margrit Betke",
"location":"EMA 304"}]},"description":"Introduction to computer systems
that exhibit intelligent behavior, in particular, perceptual and robotic
systems. Topics include human computer interfaces, computer vision, 
robotics, game playing, pattern  recognition, knowledge representation,
planning"}
*/

```
