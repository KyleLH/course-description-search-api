var express = require("express");
var app = express();
var jsdom = require("jsdom");

app.set('view engine', 'ejs');


var cur_course = "";
var desc_url = "http://www.bu.edu/phpbin/course-search/search.php?page=0&pagesize=1&search=";

app.get('/', function (req,res) {

   if (req.param("course_name")) {
      var course_name = req.param("course_name");
      console.dir(req.param("course_name"));

      var cur_class = {};
      jsdom.env(
         "http://www.bu.edu/phpbin/course-search/section/?t=" + course_name,
         ["http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"],
         function (e, window) {
            var $ = window.$;
            var hot_shit = $(".resultset_container_inner").html();
            var tables = window.document.getElementsByClassName("section-list");
            var semesters = window.document.getElementsByTagName("h3");
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
            }
            // old
            // res.json(cur_class);
         }
      );
      jsdom.env(
         desc_url + course_name,
         ["http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"],
         function (e, window) {
            var $ = window.$;
            var new_shit = $(".description").first().html().substring(13);
            new_shit = new_shit.substring(0,new_shit.indexOf("\n")-2);

            console.dir(new_shit);
            cur_class["description"] = new_shit;
         }
      );
      setTimeout(function () {
      res.json(cur_class);
      }, 2000);
       
   }

});

app.listen(3000);
