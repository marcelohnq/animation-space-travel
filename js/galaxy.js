(function($) {
  "use strict"; // Start of use strict  

  /*
    Os elementos COMUNS possuem a seguinte característica:
      - Aparecem com mais frequência;
      - Possuem a maior velocidade. No entanto, podem ir devagar;
      - Não possuem ordem;
  */
  var common_elements = ["meteorito", "meteorito2", "meteoro"];

  /*
    Os elementos GRANDES possuem a seguinte característica:
      - Demoram mais para aparecer;
      - Velocidade menor;
      - Aparecem seguindo a ordem da array;
  */
  var big_elements = ["terra", "moon", "marte", "jupter", "saturno", "uranus"];    

  /*
    Os elementos ESPECIAIS possuem a seguinte característica:
      - São diferentes
      - Demoram para aparecer;
      - Velocidade variada;
      - Sem ordem para aparecer;
  */
  var special_elements = ["satellite", "satellite2", "ovni", "rocket-guest", "astronauta"];

  /* 
    Start Animation 
    */

  //Inicia em um elemento GRANDE aleatório
  var bigindex = Math.floor(Math.random() * big_elements.length);

  //direction = 0 > da Terra ate Urano 
  //direction = 1 > de Urano ate a Terra
  var direction = 0;

  //Duração para os elementos COMUNS
  var common_duration = 1000;

  setInterval(function x(){
    var big_current = [big_elements[bigindex]];

    $('#where-are').text(big_elements[bigindex]);

    animateGalaxy(big_current, 250, 150, 20000, 15000, -1);

    if (bigindex+1 == big_elements.length)
      direction = 1;
    else if (bigindex == 0) 
      direction = 0;

    if (direction == 0)
      bigindex += 1;
    else
      bigindex -= 1;

    //A cada elemento GRANDE muda o tempo de aparicao dos elementos COMUNS
    var control = Math.random();

    if (control >= 0.7)
      common_duration = 300;
    else if (control <= 0.1)
      common_duration = 20000;
    else
      common_duration = Math.floor(Math.random() * 3000) + 1000;    

    return x;
  }(),30000);

  var commonElements = function() {
    var zindex = Math.floor(Math.random()*2) == 1 ? 1 : -1;

    animateGalaxy(common_elements, 60, 60, 5000, 1000, zindex);

    setTimeout(commonElements, common_duration);
  }

  for (var i = 1; i <= 5; i++) {
    animateGalaxy(common_elements, 60, 60, 10000, 300, -1);

    if (i == 5)
      setTimeout(commonElements, common_duration);
  }

  setInterval(function x(){
    animateGalaxy(special_elements, 80, 60, 30000, 20000, -1);

    return x;
  }(),25000);

  function animateGalaxy (elements, size_max, size_min, speed_max, speed_min, zindex) {
    var index = Math.floor(Math.random() * elements.length);

    var element = document.createElement('div');
    element.className = elements[index];

    var smax = Math.floor(Math.random() * size_max) + size_min;

    if(window.innerWidth <= 991) {
      smax = smax - smax*0.5;
    }

    var target_left, target_top;

    element.style.height = smax + 'px';
    element.style.width = smax + 'px';
    element.style.zIndex = zindex;

    $('.header-galaxy').append(element);
    
    var wgalaxy = $('header.masthead').width();
    var hgalaxy = $('header.masthead').height();
    var xposition = Math.floor(Math.random() * wgalaxy) + wgalaxy*0.2;
    var yposition = Math.floor(Math.random() * hgalaxy - hgalaxy*0.2) + 1;

    if (Math.random() >= 0.5) { //Vai aparecer pelo topo          
      
      element.style.position = "absolute";
      element.style.left = xposition+'px';
      element.style.top = '-'+element.style.height;

      target_left = '-'+element.style.height;
      target_top = calcPath(xposition, 45)+'px';

    } else { //Vai aparecer pela direita
            
      var sleft = wgalaxy + $(element).width();

      element.style.position = "absolute";
      element.style.left = sleft+'px';
      element.style.top = yposition+'px';      

      target_left = '-'+element.style.height;
      target_top = (calcPath(sleft, 45)+yposition)+'px';

    }          

    $(element).animate({ 
      left: target_left,
      top: target_top,
    }, {
      duration: (Math.random() * speed_max) + speed_min,
      specialEasing: {
        left: "linear",
        top: "linear"
      },
      step: function( now, fx ) {
        var data = hgalaxy;        

        if(window.innerWidth <= 991) {
          data += 200;
        }

        if (fx.prop == 'top' && now > data) {
          $(this).remove();  
        }

      },
      complete: function(){
        $(this).remove();
      } 
    });
  }

  function calcPath (start, angle) {
    return start * (Math.tan(angle * (Math.PI / 180)));
  }

})(jQuery); // End of use strict
