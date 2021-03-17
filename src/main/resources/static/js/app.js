var Controlador = (function(){
    
	var points;
	var nameb;
	var authorName;
	
    var getBlueprints = function(){
        
        authorName = document.getElementById("authorName").value;        
        var authorUrl = "http://localhost:8080/blueprints/" + authorName;
        fetch(authorUrl)
                .then(response => response.json())
                .then(json => dataTable(json))
                .catch(err => {
                   console.log(err); 
                });
    };
    
    var dataTable = function(res){
        
        var dataMap = new Map();
        var TotalPoints = 0;
        
        for(var i in res){
            var name = res[i].name;
            var numeroDePuntos = Object.keys(res[i].points).length;
            TotalPoints = TotalPoints+numeroDePuntos;
            dataMap.set(name,numeroDePuntos);
        }

        $("#tabla").empty();
        $("#lblName").text(authorName+"'s blueprints:");
        var fila= "<tr><th>Blueprints name</th><th>Number of points</th><th>Open</th></tr>";
        $("#tabla").append(fila);
        for(var[clave, valor] of dataMap){
            fila = "<tr> <td>"+ clave + "</td><td>"+valor+"</td><td><input type ='button' value='OPEN' onclick='Controlador.getBluePrintsByAuthor(this)' id ='"+clave+"'><td> </tr>";
            $("#tabla").append(fila);
        }
        $("#lblPoints").text("Total user points: "+TotalPoints);   
    };

    var getBluePrintsByAuthor=function(aqui){
		nameb = aqui.id;
		var authorUrl = "http://localhost:8080/blueprints/" + authorName + "/"+ nameb;
		fetch(authorUrl)
				.then(response => response.json())
				.then(json => Dibujar(json.points))
				.catch(err => {
				   console.log(err);
				});
    };

    var Dibujar = function(p){
		
		points = p;
		console.log(points);
		var canvas = document.getElementById("myCanvas");
		canvas.width = canvas.width;
		if(canvas.getContext){
			var ctx = canvas.getContext("2d");
			for(var i in points){
				if (i===0){
					ctx.moveTo(points[i].x,points[i].y);
				}
				else {
					ctx.lineTo(points[i].x,points[i].y);
					ctx.stroke();
				}
			}
	    }
    };
	
	var init = function(){
		var canvas = document.getElementById("myCanvas");
		var offset = getOffset(canvas);
		canvas.addEventListener("pointerdown", pointerHandler, false);
		
	};
	
	var pointerHandler = function(event,offset){
		var canvas = document.getElementById("myCanvas");
		var offset = getOffset(canvas);
		var valX = event.pageX-offset.left
		var valY = event.pageY-offset.top
		console.log(valX);
		console.log(valY);
		points.push({x:valX,y:valY});
		Dibujar(points);
	};
	
	var getOffset = function(obj) {
          var offsetLeft = 0;
          var offsetTop = 0;
          do {
            if (!isNaN(obj.offsetLeft)) {
                offsetLeft += obj.offsetLeft;
            }
            if (!isNaN(obj.offsetTop)) {
                offsetTop += obj.offsetTop;
            }   
          } while(obj = obj.offsetParent );
          return {left: offsetLeft, top: offsetTop};
    };
	
	var Save = function(){
		var uri = "http://localhost:8080/blueprints/"+authorName+"/"+nameb;
		var data = {};
		data.author = authorName;
		data.points = points;
		data.name = nameb;
		
		fetch(uri, {
            method: 'PUT',
			headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
			})
			.then(response => Actualizar())
			.catch(err => {
				console.log(err);
			});			
	};
	
	var Actualizar = function(){
		var canvas = document.getElementById("myCanvas");
		canvas.width = canvas.width;
		getBlueprints();
		
	};
	
	var Add = function(){
		
		var canvas = document.getElementById("myCanvas");
		canvas.width = canvas.width;
		
		var newname = prompt("Escriba el nombre del nuevo blueprint");
		
		var uri = "http://localhost:8080/blueprints/";
		
		var data = {}
		data.author = authorName;
		data.points = [];
		data.name = newname;
		
		fetch(uri, {
            method: 'POST',
			headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
			})
			.then(response => Actualizar())
			.catch(err => {
				console.log(err);
			});	
		
	};
	
    return{
        getBlueprints: getBlueprints,
        getBluePrintsByAuthor:getBluePrintsByAuthor,
		init: init,
		Save: Save,
		Add: Add
    };
    
})();





