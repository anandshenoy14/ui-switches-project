(function(window){
window.init = function(){
    console.log('Initializing JS');
    $('.ui .checkbox').checkbox().first().checkbox({
      onChecked : function(){
        window.open('http://go/vivqusoptin','_blank');
      },
      onUnchecked : function(){
        window.open('http://go/vivqusoptout','_blank');
      }
    });
    $('.ui.accordion').accordion();
    function onChange(event) {
        var reader = new FileReader();
        reader.onload = onReaderLoad;
        if(event.target && event.target.files && event.target.files[0]){
            reader.readAsText(event.target.files[0]);
        }
    }
    function createAllSwitches(switches){
        var switchContainerEl = $('.switchContainer');
        var switchStartHtml = "<div class='switch'>";
        var switchEndHtml = "</div>";
        //add switches
        for(var i=0;i<switches.length;i++){
            var labelHtml = "<label class='switch-label'>"+switches[i].getName()+"</label>";
            var checkboxDivHtml = "<div class='ui toggle checkbox switch-component switch_"+switches[i].getIndex()+"'><input type='checkbox' name='public'></div>"
            switchContainerEl.append(switchStartHtml + labelHtml + checkboxDivHtml + switchEndHtml);
            $('.switch_'+switches[i].getIndex()).checkbox({
              onChecked : function(){
                window.open('http://go/vivqusoptin','_blank');
              },
              onUnchecked : function(){
                window.open('http://go/vivqusoptout','_blank');
              }
            });
        }
    }
    function onReaderLoad(event){
        var switches = [];
        var obj = JSON.parse(event.target.result);
        for(var i=0;i<obj.switches.length;i++){
          switches.push(new Switch(obj.switches[i].name,obj.switches[i].optInUrl,obj.switches[i].optOutUrl,obj.switches[i].defaultState,i));
        }
        createAllSwitches(switches);
        $('.ui.accordion').accordion('open',1);
    }

    $("#file").on('change', onChange);
};
})(window);

window.init();
