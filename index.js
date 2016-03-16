(function(window){
window.init = function(){
    console.log('Initializing JS');
    $('.ui .checkbox').checkbox().first().checkbox({
      onChecked : function(){
        console.log('Checkbox is checked');
      },
      onUnchecked : function(){
        console.log('Checkbox is unchecked');
      }
    });
};
})(window);
