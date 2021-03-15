var app=(function(){

  //private variables
  var canvas = document.getElementById("myCanvas"),
      context = canvas.getContext("2d");

  //returns an object with 'public' functions:
  return {

    //function to initialize application
    init:function(){

      console.info('initialized');

      //if PointerEvent is suppported by the browser:
      if(window.PointerEvent) {
        canvas.addEventListener("pointerdown", function(event){
          alert('pointerdown at '+event.pageX+','+event.pageY);

        });
      }
      else {
        canvas.addEventListener("mousedown", function(event){
                    alert('mousedown at '+event.clientX+','+event.clientY);

          }
        );
      }
    }
  };


