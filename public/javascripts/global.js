$(document).ready(function() {
    skillList = [];
    filterList = [];
    place = '';
    $('#skills').on('click', 'li.skill', toggleSkill);
    $('#filters').on('click', 'li.filter', toggleFilter);
    $('#places').on('click', 'li.place', toggleLocation);
    $('#searchbar').on('click', 'button#btnSearch', searchTwitter);
});

function toggleSkill(event) {
    // Prevent Link from Firing
    event.preventDefault();
    $('#query').html("");  

    var skillText = $(event.currentTarget).text();

    if (filterList.indexOf(skillText) >= 0 ) {
      alert("You have " + skillText + " selected as a filter.");
    } else {
      
      if (skillList.indexOf(skillText) === -1) {
        skillList.push(skillText);
        $(event.currentTarget).addClass("selected");
      } else {
        skillList.splice(skillList.indexOf(skillText), 1);
        $(event.currentTarget).removeClass("selected");
      };  
    }

    
    updateQuery(skillList);
    console.log("Skills: ", skillList);
};

function toggleLocation(event) {
    // Prevent Link from Firing
    event.preventDefault();
    if (place === $(event.currentTarget).text()) {
      place = '';
      $(event.currentTarget).removeClass("selected");
    } else {
      place = $(event.currentTarget).text();
      console.log($('li.place.selected'));
      $('li.place.selected').removeClass("selected");
      $(event.currentTarget).addClass("selected");
    };
    updateQuery(skillList);
    console.log("Location: ", place);
};

function toggleFilter(event) {
    // Prevent Link from Firing
    event.preventDefault();
    // $('#query').html("");  
    var filterText = $(event.currentTarget).text();

    if (skillList.indexOf(filterText) >= 0 ) {
      alert("You have " + filterText + " selected.");
    } else {
      if (filterList.indexOf(filterText) === -1) {
        filterList.push(filterText);
        $(event.currentTarget).addClass("selected");
      } else {
        filterList.splice(filterList.indexOf(filterText), 1);
        $(event.currentTarget).removeClass("selected");
      };
    }

    
    // updateQuery(filterList); //HERE FIX NOW
    console.log("Filter: ", filterList);
};

function updateQuery(skillList) {
  $('#query').html('');
  $.each(skillList, function( index, value) {
    $('#query').append('<div class="item col-xs-3 col-md-3">' + skillList[index] + '</div>')  
  });
  $('#query').append('<div class="item col-xs-3 col-md-3">' + place + '</div>')
};

function searchTwitter(event) {
    // Prevent Link from Firing
    $('h2.tweetresults').removeClass('hide');
    event.preventDefault();
    $( "#results" ).html("");
    $( "#results" ).append("<h2>Tweets</h2>");
    console.log("SKILL LIST: ", skillList);
    searchQuery = skillList.join(" OR ") + " OR #" + skillList.join(" OR #") + " AND "  + "job AND " + place + " AND " + " -" + filterList.join(" -");
    console.log("searchQuery: ", searchQuery);
    $.getJSON( '/results', { data: searchQuery }).done( function( tweets ) {
        // Stick our user data array into a userlist variable in the global object
        // console.log(tweets);

        $.each(tweets, function( index, value ) {
            console.log(tweets[index].text);
            $( "#results" ).append( "<div class='tweet col-xs-12 col-md-4'><img class='avatar' src='"+ tweets[index].user.profile_image_url + "'/><h4>" + "<a href='https://twitter.com/" + tweets[index].user.screen_name + "' target='_blank'>" + tweets[index].user.name + "</a></h4><p class='comment'>" + tweets[index].text + "</p><p class='date'>" + moment(tweets[index].created_at).format("LL") + "</div>");
        });

    });
};