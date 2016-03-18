var Switch = (function(){
    var _name;
    var _optInUrl;
    var _optOutUrl;
    var _defaultState;
    var _index;
    function Switch(n,oin,out,s,i){
      this._name = n;
      this._optInUrl = oin;
      this._optOutUrl = out;
      this._defaultState = s;
      this._index = i;
    }
    Switch.prototype.getName = function(){
      return this._name;
    };
    Switch.prototype.setName = function(name){
      this._name = name;
    };
    Switch.prototype.getOptInUrl = function(){
      return this._optInUrl;
    };
    Switch.prototype.setOptInUrl = function(optInUrl){
      this._optInUrl = optInUrl;
    };
    Switch.prototype.getOptOutUrl = function(){
      return this._optOutUrl;
    };
    Switch.prototype.setOptOutUrl = function(optOutUrl){
      this._optOutUrl = optOutUrl;
    };
    Switch.prototype.getDefaultState = function(){
      return this._defaultState;
    };
    Switch.prototype.setDefaultState = function(defaultState){
      this._defaultState = defaultState;
    };
    Switch.prototype.getIndex = function(){
      return this._index;
    };
    return Switch;
}());
