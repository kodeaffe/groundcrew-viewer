function __compare__(a, b) {
  if (a > b) return 1;
  if (b > a) return -1;
  return 0;
}


$.extend(Array.prototype, {

  last: function(){
    return this[this.length - 1];
  },
  
  grep: function(grepper) {
    if (grepper.to_func) return $.grep(this, grepper.to_func());
    return $.grep(this, function(x){ return grepper[x]; });
  },
  
  reject: function(selector) {
    if (selector.to_func) {
      var fn = selector.to_func();
      return $.grep(this, function(x){ return !fn(x); });
    }
    return $.grep(this, function(x){ return !selector[x]; });
  },
  
  max: function(){
    var max = this[0];
    $.each(this, function(){
      if (this > max) max = this;
    });
    return max;
  },

  choose_random: function(){
    if (this.length == 0) return null;
    return this[Math.rand(this.length)];
  },

  uniq: function(){
    return $keys(this.to_h());
  },

  sum: function(){
    var sum = 0;
    $.each(this, function(){
      sum += this;
    });
    return sum;
  },

  to_h: function(){
    var h = {};
    $.each(this, function(){ h[this] = true; });
    return h;
  },

  map: function(fn){
    fn = fn.to_func();
    var ms = [];
    $.each(this, function(i, obj){ ms.push(fn(obj)); });
    return ms;
  },

  compact: function(fn){
    var ms = [];
    $.each(this, function(i, obj){ if (obj) ms.push(obj); });
    return ms;
  },

  flatten: function(fn){
    var ms = [];
    $.each(this, function(i, obj){ ms = ms.concat(obj); });
    return ms;
  },

  as_option_list: function(selected, title_attr, value_attr, max_length){
    if (!title_attr) title_attr = 'title';
    if (!value_attr) value_attr = 'item_tag';
    if (!max_length) max_length = 25;
    return this.map(function(x){
      var value = x[value_attr] || x;
      var title = x[title_attr] || x;
      if (!title) return;
      return "<option "+ (selected == value ? " selected " : "") +"value='"+value+"'>" + String(title).ellipticise(max_length) + "</option>"; 
    }).compact().join();
  },

  dispatch: function(method, args){
    var args = $.makeArray(arguments);
    var method = args.shift();
    var result = null;
    var found = false;

    for(var i=0; i<this.length; i++){
      if(this[i][method]){
        try {
          result = this[i][method].apply(this[i], args);
          found = true;
        } catch(e) {
          alert('error during dispatch: ' + method);
          console.log(e);
        }
        break;
      }
    }

    if (!found) alert('unable to dispatch: ' + method);
    return result;
  },

  trigger: function(method, args){
    var args = $.makeArray(arguments);
    var method = args.shift();
    $.each(this, function(){
      if (this[method]) this[method].apply(this, args);
    });
  },
  
  to_pairwise_hash: function(){
    var result = {};
    for (var i=0; i < this.length; i+=2) {
      result[this[i]] = this[i+1];
    };
    return result;
  },
  
  contains: function(x){
    return (this.indexOf(x) >= 0);
  },

  startsWith: function(x){
    return (this.indexOf(x) == 0);
  },
  
  sort_by: function(fn){
    return this.grep(fn).sort(function(a, b){ return __compare__(fn(a), fn(b)); });
  },
  
  group_by: function(field){
    var obj = {};
    for (var i=0; i < this.length; i++) {
      var value = this[i][field];
      if (obj[value]) obj[value].push(this[i]);
      else obj[value] = [this[i]];
    };
    return obj;
  },

  index_by: function(field){
    var obj = {};
    for (var i=0; i < this.length; i++) {
      obj[this[i][field]] = this[i];
    };
    return obj;
  },

  repackage: function(field){
    var obj = {};
    for (var i=0; i < this.length; i++) {
      var values;
      if (field == ':words') {
        values = [this[i].atags, this[i].action, this[i].instructions].join(' ').to_words();
      } else {
        values = (this[i][field] || "").split(' ');
      }
      for (var j=0; j < values.length; j++) {
        var value = values[j];
        if (obj[value]) obj[value].push(this[i]);
        else obj[value] = [this[i]];
      };
    };
    return obj;
  }

});


if(![].indexOf){
  Array.prototype.indexOf = function(obj){
    for(var i=0; i<this.length; i++){
      if(this[i]==obj) return i;
    }
    return -1;
  };
};
