
/*let datosJson;
let xhr = new XMLHttpRequest();
xhr.open('GET',MOUNTAINS,true);
xhr.responseType='json';
xhr.onload=function(){
    if(xhr.status===200){
        datosJson=xhr.response;
        let elementoTexto=document.getElementById('pokemon');
    }else{
        //maneje de esepcion
    }
   
}
 xhr.send();*/

 let datosjson;
      fetch("home/david/Documentos/montanias.js")
          .then(res=>res.json())
          .then((salida)=>{
            datosjson=salida;
            let  elementoTexto=document.getElementById('montanias');
            elementoTexto.textContent=datosjson.name;
        })