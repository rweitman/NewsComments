// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<div class='rowing' data-id='" + data[i]._id + "'><div class='headline'>" 
      + data[i].title + "</div><div class='switcher'><button class='saveArticle' data-id='" + data[i]._id + "'>Save</button></div><div class='linking'>" 
      + data[i].link + "</div></div><br />");
  
  }


});

	$.getJSON("/saving", function(dating) {

  for (var j = 0; j < dating.length; j++) {
    // Display the apropos information on the page
    $("#articles2").append("<div class='rowing' data-id='" + dating[j]._id + "'><div class='headline'>" 
      + dating[j].title + "</div><div class='switcher'><button class='removeArticle' data-id='" + dating[j]._id + "'>Remove</button> <button class='commenting' data-id='" + dating[j]._id + "'>Comment</button></div><div class='linking'>" + dating[j].link + "</div></div><br />");    
  }
});


//     $.ajax({
//       method: "POST",
//       url: "/saving/" + articleId,
//       type: false
//     }).done(function(data) {
//       console.log(data.message);
//     }); // END DONE ON AJAX FOR ARTICLE SAVER
//   }); // END CLICK ON SAVE BUTTONS

$("body").on("click", ".removeArticle", (e) => {
    var articleId = $(e.target).attr("data-id");
    $.ajax({
      method: "POST",
      url: "/remove/" + articleId
    }).done(function(data) {
      console.log(data.message);
      window.location.reload(true);
    }); // END DONE ON AJAX FOR ARTICLE SAVER
  }); // END CLICK ON SAVE BUTTONS

$("body").on("click", ".saveArticle", (e) => {
    var articleId = $(e.target).attr("data-id");
    $.ajax({
      method: "POST",
      url: "/saving/" + articleId
    }).done(function(data) {
      console.log(data.message);
    }); // END DONE ON AJAX FOR ARTICLE SAVER
  }); // END CLICK ON SAVE BUTTONS

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
  }); // END CLICK ON SAVED ARTICLES BUTTON



// Whenever someone clicks a p tag
$(document).on("click", ".commenting", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' value='Comment Title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body' value='Message'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
