/* handle latitude table data */

datafile = "assets/data/cities.json";
// citydata=[];


$(document).ready(function(){
    inittable();
});

function inittable(){
    /* no go local chrome 
    loadJSON(datafile, function(data){
        citydata = JSON.parse(data);
        addtabledata();
    });*/
    hlist=[];
    $('thead th').each(function(i, el){
        hlist.push($(el).text());
    });
    hlen=hlist.length;
    dtbody=$('#data_content');
    addtabledata(citydata);
    $('thead th').on('mousedown touchstart', function(e){
        e.preventDefault();
        tablesort($(this));
    });
    $('#data_content').on('mousedown touchstart', 'tr', function(e){
        var tdL = $(this).find('td');
        var lat=$(tdL[3]).text();
        var lng=$(tdL[4]).text();
        window.open('https://www.google.com/maps/place/'+lat+','+lng, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
    });
}

function addtabledata(datalist){
    dtbody.empty();
    var rstr=""
    var clen=datalist.length;
    for (var i=0; i<clen; i++){
        rec = citydata[i];
        rstr+="<tr>"
        for (var j=0; j<hlen; j++){
            key=hlist[j];
            rstr+="<td>"+rec[key]+"</td>";
        }
        rstr+="</tr>"
    }
    dtbody.append(rstr);
}


function tablesort(el){
    var key=el.text();
    var rev = false;
    if (el.hasClass('up')){
        el.removeClass('up').addClass('down');
        rev = true;
    }else{
        el.removeClass('down').addClass('up');
        rev = false;
    }
    el.addClass('active').siblings('th').removeClass('active');
    if (key=="City" || key=="Country"){
        mylist = citydata.sort(sort_by(key, rev, function(a){return a.toUpperCase()}));
    }else{
        var mylist = citydata.sort(sort_by(key, rev, parseFloat));
    }
    addtabledata(mylist);
}

var sort_by = function(field, reverse, primer){

    var key = primer ? 
        function(x) {return primer(x[field])} : 
        function(x) {return x[field]};
 
    reverse = !reverse ? 1 : -1;
 
    return function (a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
      } 
 }

function loadJSON(filepath, callback) {   

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.addEventListener("load", function(){
		callback(this.responseText);
	});
    xobj.open('GET', filepath, true); 
    xobj.onreadystatechange = function () {
          if (this.readyState!==4) return;
          if (this.status!==200) return;
    };
    xobj.send(null);  
 }

