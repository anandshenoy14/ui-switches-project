(function(window){
window.init = function(){
    console.log('Initializing JS');
    $('.ui.accordion').accordion();
    $('.infoLink').popup();
    $('.save').popup();
    $('.load').popup();
    $('.clear').popup();
    var localSwitches;
    $('.load').on('click',function(event){
      chrome.storage.sync.get('uiSwitches', function(data) {
            var localSwitches = [];
            if(data && data.uiSwitches && data.uiSwitches.length>0){
                  for(var i=0;i<data.uiSwitches.length;i++){
                      localSwitches.push(new Switch(data.uiSwitches[i]._name,data.uiSwitches[i]._optInUrl,data.uiSwitches[i]._optOutUrl,data.uiSwitches[i]._defaultState,i));
                  }
                  createAllSwitches(localSwitches);
                  $('.ui.accordion').accordion('open',1);
            }
          });
    });
    $('.save').on('click',function(event){
        var self = this;
        saveSwitches(localSwitches);
    });
    $('.clear').on('click',function(event){
      chrome.storage.sync.set({'uiSwitches' : ''}, function() {
            // Notify that we cleared.
            console.log('Cleared');
          });
      var newcss = addDisabled($('.clear').attr('class'));
      $('.clear').attr('class',newcss);
      $('.switchContainer').empty();
    });
    function addDisabled(cssclass){
      if(cssclass.indexOf('disabled')==-1){
        cssclass  = cssclass + ' disabled';
        return cssclass;
      }
      return cssclass;
    }
    function removeDisabled(cssclass){
      if(cssclass.indexOf('disabled')!=-1){
        return cssclass.replace('disabled','');
      }
      return cssclass;
    }
    chrome.storage.sync.get('uiSwitches', function(data) {
          if(data && data.uiSwitches && data.uiSwitches.length>0){
              var newcss = removeDisabled($('.clear').attr('class'));
              $('.clear').attr('class',newcss);
          }
        });
    $('.clear').popup();
    $('.browse').on('click',function(){
        $('#file').click();
    });
    $('.browseDiv').on('click',function(){
        $('#file').click();
    });
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
        var switchEndHtml = "</div><div class='ui divider'></div>";

        for(var i=0;i<switches.length;i++){
            var labelHtml = "<label class='switch-label'>"+switches[i].getName()+"</label>";
            var state = (switches[i].getDefaultState()==='optin')?'checked':'';
            var checkboxDivHtml = "<div class='ui toggle checkbox switch-component switch_"+switches[i].getIndex()+"'><input type='checkbox' "+state+" data-index="+switches[i].getIndex()+" name='public'></div>"
            switchContainerEl.append(switchStartHtml + labelHtml + checkboxDivHtml + switchEndHtml);
            $('.switch_'+switches[i].getIndex()).checkbox({
              onChecked : function(){
                var self = this;
                switches[$(this).attr('data-index')].setDefaultState('optin');
                window.open(switches[$(this).attr('data-index')].getOptInUrl(),'_blank');
                saveSwitches(switches);
              },
              onUnchecked : function(){
                var self= this;
                switches[$(this).attr('data-index')].setDefaultState('optout');
                window.open(switches[$(this).attr('data-index')].getOptOutUrl(),'_blank');
                saveSwitches(switches);
              }
            });
        }
    }
    function saveSwitches(switches){
      chrome.storage.sync.set({'uiSwitches' : switches}, function() {
            // Notify that we saved.
            console.log('Saved');
          });
      chrome.storage.sync.get('uiSwitches', function(data) {
                if(data && data.uiSwitches && data.uiSwitches.length>0){
                    console.log('here');
                    var newcss = removeDisabled($('.clear').attr('class'));
                    $('.clear').attr('class',newcss);
                }
              });
    }
    function onReaderLoad(event){
        var switches = [];
        var obj = JSON.parse(event.target.result);
        for(var i=0;i<obj.switches.length;i++){
          switches.push(new Switch(obj.switches[i].name,obj.switches[i].optInUrl,obj.switches[i].optOutUrl,obj.switches[i].defaultState,i));
        }
        localSwitches = switches;
    }

    $("#file").on('change', onChange);
};
})(window);

window.init();
