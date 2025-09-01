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