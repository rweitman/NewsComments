$.getJSON("/articles", function(data) {
 
  for (var i = 0; i < data.length; i++) {
    
    $("#articles").append("<div class='rowing' data-id='" + data[i]._id + "'><div class='headline'>" 
      + data[i].title + "</div><div class='switcher'><button class='saveArticle' data-id='" + data[i]._id + "'>Save</button></div><div class='linking'>" 
      + data[i].link + "</div></div><br />");

  }


});

$.getJSON("/saving", function(dating) {

  for (var j = 0; j < dating.length; j++) {
    
    $("#articles2").append("<div class='rowing' data-id='" + dating[j]._id + "'><div class='headline'>" 
      + dating[j].title + "</div><div class='switcher'><button class='removeArticle' data-id='" + dating[j]._id + "'>Remove</button> <button class='commenting' data-id='" + dating[j]._id + "'>Comment</button></div><div class='linking'>" + dating[j].link + "</div></div><br />");    
  }
});


$("body").on("click", ".removeArticle", (e) => {
  var articleId = $(e.target).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/remove/" + articleId
  }).done(function(data) {
    console.log(data.message);
    window.location.reload(true);
    });
  }); 

$("body").on("click", ".saveArticle", (e) => {
  var articleId = $(e.target).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/saving/" + articleId
  }).done(function(data) {
    console.log(data.message);
    });
  }); 

$(".saver").on("click", () => {
  $.ajax({
    method: "GET",
    url: "/saving.html/"
  }).done((data) => {
    console.log("Saved Page Loaded");
    console.log(data);
    $("#articleHolder").empty();
    for (var i = 0; i < data.length; i++) {
      var article = "X!";
      $("#articleHolder").append(article);
    }
  });
  }); 




$(document).on("click", ".commenting", function() {
  
  $("#notes").empty();
  
  var thisId = $(this).attr("data-id");

  
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
   
    .done(function(data) {
      console.log(data);
    
      $("#notes").append("<h2>" + data.title + "</h2>");
  
      $("#notes").append("<input id='titleinput' name='title' value='Comment Title' >");
     
      $("#notes").append("<textarea id='bodyinput' name='body' value='Message'></textarea>");
     
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      
      if (data.note) {
     
        $("#titleinput").val(data.note.title);
     
        $("#bodyinput").val(data.note.body);
      }
    });
  });


$(document).on("click", "#savenote", function() {

  var thisId = $(this).attr("data-id");


  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
     
      title: $("#titleinput").val(),
   
      body: $("#bodyinput").val()
    }
  })

    .done(function(data) {
    
      console.log(data);
   
      $("#notes").empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});
