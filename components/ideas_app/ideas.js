Viewer.apps.ideas = {
  url_part_labels: $w('city item idea'),

  show_item: function(state) {
    Viewer.render_item('idea_catalog');
  },

  idea_category_changed: function(new_category, state) {
    state.category = new_category;
    $('select[fill=idea_ideas]').html(Viewer.apps.ideas.idea_ideas(state));
  },
  
  idea_categories: function (state) {
    state.category = state.category || 'all';
    return $keys(IdeaCatalogue).as_option_list(state.category, null, null);
  },

  idea_ideas: function (state) {
    return IdeaCatalogue[state.category || 'all'].as_option_list(null, 'name', 'name');
  }

};
