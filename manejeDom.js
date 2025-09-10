 const MOUNTAINS = [
    {name: "Kilimanjaro", height: 5895, place: "Tanzania"},
    {name: "Everest", height: 8848, place: "Nepal"},
    {name: "Mount Fuji", height: 3776, place: "Japan"},
    {name: "Vaalserberg", height: 323, place: "Netherlands"},
    {name: "Denali", height: 6168, place: "United States"},
    {name: "Popocatepetl", height: 5465, place: "Mexico"},
    {name: "Mont Blanc", height: 4808, place: "Italy/France"}
  ]; 

  const sdTabla=(MOUNTAINS)=>{
    const table=document.createElement('table');
    const thead=document.createElement('thead');
    const tbody=document.createElement('tbody');

    table.id="stdInfotable";
    thead.innerHTML=`
    <tr>
         <th>name</th>
         <th>height</th>
         <th>place</th>
    </tr>`

    table.appendChild(thead);
    table.appendChild(tbody);

    for(let montania of MOUNTAINS){
      const tr=document.createElement('tr');
      const dataFields=[
        montania.name,
        montania.height,
        montania.place
      ];
      for(let data of dataFields){
        const td=document.createElement('td');
        td.textContent(data);
        tr.appendChild(td);
      }
    }
    tbody.appendChild(tr);
  }