Event = {

  improve: function(ev) {
    ev.when = $time(ev.created_at);
    ev.color = Event.color(ev);
    ev.item = ev.item || (ev.item_tag && ev.item_tag.resource());
    ev.item_title = ev.item && ev.item.title;
    ev.landmark = ev.landmark_tag && ev.landmark_tag.resource();
    ev.landmark_title = ev.landmark && ev.landmark.title;
    if (ev.actor_tag)
      ev.actor_title = ev.actor_tag.resource() && ev.actor_tag.resource().title;
    ev.what = (Event.whats[ev.atype] || "did something weird (#{atype})").t(ev);
    return ev;
  },
  
  color: function(ev){
    if (ev.atype == 'wish') return "blue";
    if ($w('viewer').indexOf(ev.atype) >= 0) return "invisible";
    if ($w('available enlist unenlist off signup').indexOf(ev.atype) >= 0) return "grey";
    if ($w('said').indexOf(ev.atype) >= 0) return "black";
    if ($w('assignment msg').indexOf(ev.atype) >= 0) return "purple";
    return "green";
  },
  
  whats: {

    // chat
    said: ": #{msg}",

    // initiatives
    citywish: 
      "where <span class='wish'>#{msg}</span>",
    assignment: 
      "gave an assignment to <a href='#' item='#{item_tag}'>#{item_title}</a>: <span class='assignment'>#{msg}</span>",
    invite:
      "invited #{reach} people to <a href='#' item='#{landmark_tag}'>#{landmark_title}</a> for #{msg}",
    requested:  
      "activated agent <a href='#' item='#{item_tag}'>#{item_title}</a>",
    wish:
      "wished <span class='wish'>to #{msg}</span>",
    new_landmark: 
      "created a <a href='#' item='#{landmark_tag}'>new landmark</a>: #{item_title}",

    // initiative reports
    dead:       "is no longer available",
    accepted:   "accepted the assignment",
    report:     "reported: <span class='report'>#{msg}</span>",
    declined:   "declined the assignment",
    completed:  "completed the assignment",
    summon:     "summoned their squad!",
    agree:      "agreed with a wish",


    // others
    msg:
      "sent a message to <a href='#' item='#{item_tag}'>#{item_title}</a>: <span class='assignment'>#{msg}</span>",
    freed: 
      "freed <a href='#' item='#{item_tag}'>#{item_tag}</a> to do other things",
    enlist:
      "enlisted as part of agent <a href='#' item='#{item_tag}'>#{item_tag}</a>'s crew",
    unenlist:
      "removed themselves from agent <a href='#' item='#{item_tag}'>#{item_tag}</a>'s crew",
    login:      "logged in",
    unlatched:  "is now free to be organized",
    off:        "is gone",
    summonable: "is now summonable",
    no_response:  "did not respond",
    signup:     "joined Groundcrew!",
    viewer:     "is viewing the map",
    available:  "became available",
    free:       "is free again",
    extended:   "extended their time available",
    relocated:  "reported a new location",
    shout:      "shouted: <span class='shout'>#{msg}</span>"
  }
  
};
