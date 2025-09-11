const button= document.querySelector("button");
button.addEventListener("click",function onne(){
fetch(" https://pokeapi.co/api/v2/pokemon/ditto")
.then(response=>response.json())
.then(data=>{console.log("post:",data);

})
.catch(error=>{console.log("error",error);

});
    button.removeEventListener("click",onne);
});