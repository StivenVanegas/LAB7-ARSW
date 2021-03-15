var Controlador = (function(){
    
    var getBlueprints = function(){
        
        var authorName = document.getElementById("authorName").value;        
        var authorUrl = "http://localhost:8080/blueprints/" + authorName;
        fetch(authorUrl)
                .then(response => response.json())
                .then(json => dataTable(json,authorName))
                .catch(err => {
                   console.log(err); 
                });
    };
    
    var dataTable = function(res, author){
        
        var dataMap = new Map();
        var TotalPoints = 0;
        
        for(var i in res){
            var name = res[i].name;
            var numeroDePuntos = Object.keys(res[i].points).length;
            TotalPoints = TotalPoints+numeroDePuntos;
            dataMap.set(name,numeroDePuntos);
            console.log(name+" "+numeroDePuntos);
        }

         $("#tabla").empty();
        $("#lblName").text(author+"'s blueprints:");
        var fila= "<tr><th>Blueprints name</th><th>Number of points</th><th>Open</th></tr>";
         $("#tabla").append(fila);
        for(var[clave, valor] of dataMap){
            fila = "<tr> <td>"+ clave + "</td><td>"+valor+"</td><td><input type ='button' value='OPEN' onclick='Controlador.getBluePrintsByAuthor(this)' id ='"+clave+"'><td> </tr>";
            $("#tabla").append(fila);
        }
        $("#lblPoints").text("Total user points: "+TotalPoints);   
    };

    var getBluePrintsByAuthor=function(aqui){
    var id = aqui.id;
    var authorName = document.getElementById("authorName").value;
            var authorUrl = "http://localhost:8080/blueprints/" + authorName + "/"+ id;
            fetch(authorUrl)
                    .then(response => response.json())
                    .then(json => Dibujar(json))
                    .catch(err => {
                       console.log(err);
                    });

    console.log(id);

    };

    var Dibujar= function(res){
    var points = res.points;
    var canvas = document.getElementById("myCanvas");
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
    return{
        getBlueprints: getBlueprints,
        getBluePrintsByAuthor:getBluePrintsByAuthor
    };

    
})();

