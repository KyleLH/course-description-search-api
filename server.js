var express = require("express");
var app = express();
var jsdom = require("jsdom");

app.set('view engine', 'ejs');


var cur_course = "";

app.get('/', function (req,res) {

   if (req.param("course_name")) {
      var course_name = req.param("course_name");
      console.dir(req.param("course_name"));

      jsdom.env(
         "http://www.bu.edu/phpbin/course-search/section/?t=" + course_name,
         ["http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"],
         function (e, window) {
            var $ = window.$;
            var hot_shit = $(".resultset_container_inner").html();
            var tables = window.document.getElementsByClassName("section-list");
            var semesters = window.document.getElementsByTagName("h3");
            var cur_class = {};
            for (var semester in tables) {
               if (semester.charCodeAt() > 47 && semester.charCodeAt() < 58) {
                  cur_semester = semesters[semester].childNodes[0].nodeValue
                  cur_class[cur_semester] = {};

                  var cur_row = tables[semester].childNodes[0].childNodes;
                  for (var i = 1; i < cur_row.length; i++) {
                     console.dir(cur_row[i].childNodes[0].childNodes[0]._nodeValue);
                     var class_type = cur_row[i].childNodes[3].childNodes[0]._nodeValue;
                     if (!cur_class[cur_semester][class_type]) {
                        cur_class[cur_semester][class_type] = [];
                     }
                     cur_class[cur_semester][class_type].push({"section": cur_row[i].childNodes[0].childNodes[0]._nodeValue, "instructor": cur_row[i].childNodes[2].childNodes[0]._nodeValue, "location": cur_row[i].childNodes[4].childNodes[0]._nodeValue})
                  }
               }
               for (var child in cur_row) {
                  if (child.charCodeAt() > 47 && child.charCodeAt() < 58) {
                     if (cur_row[child].hasAttribute("data-section")) {
                        //console.dir(child);
                     }
                  }
               }
               
            }
            //res.render("index", {"body":hot_shit}); 
            res.json(cur_class);
         });

   }

});

app.listen(3000);
