const button= document.querySelector("button");
button.addEventListener("click",function onne(){
fetch("http://localhost:3000/montanias")
.then(response=>response.json())
.then(data=>{console.log("get:",data);

})
.catch(error=>{console.log("error",error);

});
    button.removeEventListener("click",onne);
});