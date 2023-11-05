function rgbtohex(l) {
  var a = l.split("(")[1].split(")")[0];
  a = a.split(",");
  var b = a.map(function(x){
    x = parseInt(x).toString(16);
    return (x.length==1) ? "0"+x : x;
});
b = "#"+b.join("");
return b;

}

$(document).ready( function() {

  var current_element;
  var user_data = JSON.parse(localStorage.getItem("userData"));

  console.log(user_data);

  if (user_data == null) {

  user_data = JSON.parse('{"tasks":{"1699210489311":{"day":"1","startT":"4:00 pm","endT":"6:00 pm","title":"Physics - Electrostatics Revision","color":"#ff3d3d"},"1699210542544":{"day":"1","startT":"7:00 pm","endT":"10:00 pm","title":"Maths - Differentiation Exercise 2","color":"#48d6f9"},"1699210595880":{"day":"2","startT":"8:00 am","endT":"3:00 pm","title":"Chemistry - Organic Chemistry Lecture I","color":"#48f966"},"1699210704692":{"day":"2","startT":"4:00 pm","endT":"7:00 pm","title":"Physics - Magnetism Assignment 2","color":"#f94848"},"1699210796299":{"day":"2","startT":"8:00 pm","endT":"10:00 pm","title":"Relax - Its Important","color":"#eef948"},"1699210863241":{"day":"3","startT":"3:00 pm","endT":"6:00 pm","title":"Part Test 1","color":"#eef948"},"1699210900318":{"day":"4","startT":"3:00 pm","endT":"6:00 pm","title":"Geometry I","color":"#48f9f6"},"1699210915117":{"day":"4","startT":"7:00 pm","endT":"10:00 pm","title":"Geometry II","color":"#48f9f6"},"1699211026581":{"day":"5","startT":"1:00 pm","endT":"10:00 pm","title":"Physics - Mechanics Revision + Excersise 4","color":"#f94848"},"1699211079001":{"day":"6","startT":"12:00 am","endT":"10:00 pm","title":"Chemistry - Organic Chemistry Lecture II","color":"#4bf948"},"1699211142723":{"day":"7","startT":"3:00 pm","endT":"6:00 pm","title":"Part Test 2","color":"#fff829"}}}');

}

  $.each(user_data["tasks"], function(k, v) {
    var inp = v.day;
    var title = v.title;
    var color = v.color;
    var startT =  v.startT;
    var endT =  v.endT;
    console.log(inp, title, color, startT, endT);

    var element = jQuery('<div>', {
        id: k,
        class: 'w3-container note',
        title: 'now this div has a title!',
        style: 'background-color:' + color,
        name: inp
    });

     $('<p class="a" style="height:40%;margin-top:10px;margin-left:10px;">' + title + '</p>').appendTo(element);

     $('<p class="b" style="height:40%;margin-bottom:10px;margin-left:10px;">' + startT + " - " + endT + '</p>').appendTo(element);


    element.appendTo('#a' + inp);

    element.click(function (){
      modal.style.display = "block";
      $("#add").css("display", "none");
      $("#update").css("display", "block");
      $("#delete").css("display", "block");


      $('#title').val(element.children("p.a").text());
      t = element.children("p.b").text().split(" - ");

      $('#startT').val(t[0]);
      $('#endT').val(t[1]);
      hex = rgbtohex(element.css("background-color"));
      $('#colorpicker').val(hex);
      $('#day' + element.attr("name")).prop('checked', true);
      current_element = element.attr("id");
    });
  });


  var modal = document.getElementById("myModal");
  var btn = document.getElementById("myBtn");
  var span = document.getElementsByClassName("close")[0];

  span.onclick = function() {
    modal.style.display = "none";

    $("#add").css("display", "block");
    $("#update").css("display", "none");
    $("#delete").css("display", "none");
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";

      $("#add").css("display", "block");
      $("#update").css("display", "none");
      $("#delete").css("display", "none");
    }
  }


  $("#btn_add").click( function() {
    modal.style.display = "block";
  });

  $("#add").click( function() {
    modal.style.display = "none";
    var inp = $('input:radio[name=week]:checked').val();
    var title = $('#title').val();
    var color = $('#colorpicker').val();
    var startT =  $('#startT').val();
    var endT =  $('#endT').val();
    var id = Date.now();



    console.log(inp, title, color, startT, endT);

    var element = jQuery('<div>', {
        id: id,
        class: 'w3-container note',
        title: 'now this div has a title!',
        style: 'background-color:' + color,
        name: inp
    });

     $('<p class="a" style="height:40%;margin-top:10px;margin-left:10px;">' + title + '</p>').appendTo(element);

     $('<p class="b" style="height:40%;margin-bottom:10px;margin-left:10px;">' + startT + " - " + endT + '</p>').appendTo(element);


    element.appendTo('#a' + inp);


    user_data["tasks"][id] = {day:inp, startT:startT, endT:endT, title:title, color:color};
    localStorage.setItem("userData", JSON.stringify(user_data));



    element.click(function (){
      modal.style.display = "block";
      $("#add").css("display", "none");
      $("#update").css("display", "block");
      $("#delete").css("display", "block");


      $('#title').val(element.children("p.a").text());
      t = element.children("p.b").text().split(" - ");

      $('#startT').val(t[0]);
      $('#endT').val(t[1]);
      hex = rgbtohex(element.css("background-color"));
      $('#colorpicker').val(hex);
      $('#day' + element.attr("name")).prop('checked', true);
      current_element = element.attr("id");
    });


  });

    $("#update").click( function() {
      var inp = $('input:radio[name=week]:checked').val();
      var title = $('#title').val();
      var color = $('#colorpicker').val();
      var startT =  $('#startT').val();
      var endT =  $('#endT').val();


      user_data["tasks"][current_element] = {day:inp, startT:startT, endT:endT, title:title, color:color};

      localStorage.setItem("userData", JSON.stringify(user_data));

      cel = $("#" + current_element);
      cel.css("background-color", color);
      cel.children("p.a").text(title);
      cel.children("p.b").text(startT + " - " + endT);

      if (cel.attr(name) != inp) {
        cel2 = cel.clone()
        cel2.attr("name", inp)
        cel2.appendTo('#a' + inp);
        cel.remove();
        cel2.click(function (){
          modal.style.display = "block";
          $("#add").css("display", "none");
          $("#update").css("display", "block");
          $("#delete").css("display", "block");


          $('#title').val(cel2.children("p.a").text());
          t = cel2.children("p.b").text().split(" - ");

          $('#startT').val(t[0]);
          $('#endT').val(t[1]);
          hex = rgbtohex(cel2.css("background-color"));
          $('#colorpicker').val(hex);
          $('#day' + cel2.attr("name")).prop('checked', true);
          current_element = cel2.attr("id");
        });

      }

        modal.style.display = "none";
      $("#add").css("display", "block");
      $("#update").css("display", "none");
      $("#delete").css("display", "none");


    });


    $("#delete").click( function() {
        $("#" + current_element).remove();
          modal.style.display = "none";
        $("#add").css("display", "block");
        $("#update").css("display", "none");
        $("#delete").css("display", "none");
        delete user_data["tasks"][current_element];
        localStorage.setItem("userData", JSON.stringify(user_data));
    });



});
