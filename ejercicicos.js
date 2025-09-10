const promesita=new Promise((resolve, reject) => {
  try{
    setTimeout(resolve(console.log("exito")),2000);
  }catch(error){

   reject(console.log("error"))
  }

  
})

promesita
.then(resp=>console.log(resp))
.catch(err=>console.log(err));

//########################################################################

let parOimpar =function(data){
return new Promise((resolve, reject) => {
   try{
        if(data%2===0){
            resolve(console.log("es par"))
        }else{
            resolve(console.log("impar"))
        }
   }catch{ if(typeof data!='number')
    {
      reject(console.log("error"))
    }}}
)}
parOimpar("6")
.then(resp=>console.log(resp))
.catch(err=>console.log(err));

//###########################################################################



let suma5 = function(data){
return new Promise((resolve, reject) => {
    if(typeof(data!='number')){
        reject(console.log("error"))
    }
    try{
        let aux=data+5;
        let aux2=data*2;
        
        resolve(console.log("respuesta : "+aux));
        resolve(console.log("respuesta : "+aux2));
    }catch{
        reject(console.log("error"));
    }
})

}
suma5(3)
.then(resp=>console.log(resp))
.catch(err=>console.log(err));

//#######################################################################################
let retraso=setTimeout(()=>{console.log("resuelto")},3000);
let res=(retraso)=>{
    return new Promise((resolve, reject) => {
        console.log("cargando");
        try{
            resolve(retraso);
        }catch{
            reject(console.log("error"));
        }
    })
}
res(retraso)
.then(resp=>console.log(resp))
.catch(error=>console.log(error));

//########################################################################

    
async function promesita2(){
  
        try{
            let aux=await promesita();
            console.log(aux);
        }
        catch{
           console.log("error");
        }
    

}

promesita2();


//###################################################################

async function parOimpar2(data) {
    try{
        let aux= await parOimpar(data);
        console.log(aux);
    }catch{
       console.log("error")
    }
    
}

parOimpar2(5);

//#####################################################################

const para1 = new Promise((resolve, reject) => {
  try {
    setTimeout(() => {
      console.log("éxito");
      resolve("Todo salió bien");
    }, 1000);
  } catch (error) {
    console.log("error");
    reject("Algo salió mal");
  }
});
const para2 = new Promise((resolve, reject) => {
  try {
    setTimeout(() => {
      console.log("éxito");
      resolve("Todo salió bien");
    }, 2000);
  } catch (error) {
    console.log("error");
    reject("Algo salió mal");
  }
});
const para3 = new Promise((resolve, reject) => {
  try {
    setTimeout(() => {
      console.log("éxito");
      resolve("Todo salió bien");
    }, 3000);
  } catch (error) {
    console.log("error");
    reject("Algo salió mal");
  }
});

async function deAtres(){
try{
    let aux1=await para1;
    let aux2=await para2;
    let aux3=await para3;
    console.log(aux1);
    console.log(aux2);
    console.log(aux3);
}catch{
    console.log("error");
}
}
deAtres();