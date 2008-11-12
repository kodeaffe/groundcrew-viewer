var agent_tag;

ViewerUI = {
  
  init: function() {
    this.adjust_frame();
    agent_tag = person_item.item_tag;
    Reactor.handle_json_obj(initial_data);
    this.activateUI();
    var starter_url = "/";
    if (logged_in) {
      Agents.add_or_update(person_item);
      $('body').addClass('logged_in');
      starter_url = '/mobilize/City__' + person_item.city_id;
    } else {
      $('body').addClass('logged_out');
    }
    if (window.location.hash) starter_url = window.location.hash.slice(1);
    Viewer.go(starter_url);
    $('body').removeClass('loading');
    Ajax.init();
    $('#you_img').attr('src', person_item.thumb_url);
    $('#agent_name').html(person_item.title);
    $(document).blit();
  },
  
  activateUI: function() {    
    $('a[rel*=facebox]').facebox();
    Chat.wire();
    setInterval(function(){ $('.from_now').update_times(); }, 20000);
    $(window).resize(this.adjust_frame);
  },

  adjust_frame: function(){
    // heights: google map; events
    var junkh = 192;
    var ih = window.innerHeight || window.document.body.clientHeight;
    $('#map_div').height(ih - junkh);
    $('.rtab').height(ih - junkh + 12 - 25);

    // notify map of changes
    if (Map.Gmap) Map.Gmap.checkResize();

    $('#inner_scroll_window').width(10000);
    var agents_width = $('#agents').width() + 30;
    var window_width = window.innerWidth || window.document.body.clientWidth;
    if (agents_width + 70 < window_width) {
      var padding = window_width - agents_width;
      $('#inner_scroll_window').width(agents_width + 150);
      $('#inner_scroll_window').css('padding-top', '10px');
      $('#inner_scroll_window').css('padding-left', padding/2 - 20);
    }
    else {
      // var pixels = $('#agents .agent').length * 80 + 200;
      $('#inner_scroll_window').width(agents_width + 40);
      $('#inner_scroll_window').css('padding-top', '2px');
      $('#inner_scroll_window').css('padding-left', '5px');
    }
  }

};