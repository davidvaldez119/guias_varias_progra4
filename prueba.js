function testea(array,test)
  {
	  
    for(let i=0;i<array.length;i++)
    {  if(!test(array[i]))
      {
       return true;
      } 
     

    }
     return false;
  }

console.log(testea([1,2,3,4,12],n=>{n<10}));
console.log(testea([1,2,3,4],n=>{n<10}));

function testea2(array,test)
  {
	 
    let i=0;
    while( i<=array.length)
    { 
      if(!test(array[i])){
        return false;
      }
      i++;
    }
     return true;
  }

  console.log(testea2([1,2,3,4,12],n=>{n<10}));
  console.log(testea2([1,2,3],n=>{n<10}));


  const isBelowThreshold = (currentValue) => currentValue < 10;

const array1 = [1,3,4,6,9];

console.log(array1.every(isBelowThreshold));

const array2 = [18,2,5,6,8];

console.log(array2.every(isBelowThreshold));

const sum=(a,b)=>{let aux=a+b;
  console.log(aux);
}

const array=[1,2,3,4];
const doubled=array.filter(n=>n%2===0);
console.log(array);
console.log(doubled);

/*const fetchUser=new Promise((resolve, reject) => {
  fetch("https://jasonplaceholder.typicode.com/users")
  .then(response=>response.json())
  .then(data=>resolve(data))
  .catch(error=>reject('failed'))

})
fetchUser
.then(users=>{console.log("fetchersUsers",users)})
.catch(error=>{console.log("error",error)});*/

/*fetch(" https://pokeapi.co/api/v2/pokemon/ditto")
.then(response=>response.json())
.then(data=>{console.log("post:",data);

})
.catch(error=>{console.log("error",error);

});*/



//###############################################################

const promesita=new Promise((resolve, reject) => {
  try{
   resolve(setTimeout(console.log("echo"),3000));
  }catch(error){

   reject(console.log("error"));
  }

  
})
async function promesita2(){
   
    try{
        let datos =await promesita();
        console.log(datos);
    }catch(error){
        console.log("error")
    }

}

promesita2();