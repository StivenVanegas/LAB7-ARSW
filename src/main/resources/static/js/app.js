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
        
        

        
        
        $("#lblName").text(author+"'s blueprints:");
        var fila;
        $("#tabla").empty();
        for(var[clave, valor] of dataMap){
            fila = "<tr><th>Blueprints name</th><th>Number of points</th><th>Open</th></tr><tr> <td>"+ clave + "</td> <td>"+valor+"</td> </tr>";
            
            $("#tabla").append(fila);
        }
        $("#lblPoints").text("Total user points: "+TotalPoints);   
    };
    
    return{
        
        getBlueprints: getBlueprints
        
    };
    
})();

