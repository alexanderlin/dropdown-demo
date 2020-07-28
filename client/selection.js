//array for the options of the select elements
const itemList = [];

//get the data from the server and then populate select elements. If not done wtihin fetch the select elements will be rendered before fetch finishes recieving the data and populating itemList
fetch('/data')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let dataObj = JSON.parse(data);
    dataObj.forEach(element => {
      itemList.push(element.FirstName);
    });
    
    document.getElementById("selectList1").onload = populateList("selectList1");
    document.getElementById("selectList2").onload = populateList("selectList2");
  });

//converts the items in itemList to html option elements to populate a select element
//In this program where there are 2 select elements, if an option is selected in 1 select element, it is removed from the options of the other
function populateList(list,removeItem = null){
  let select = document.getElementById(list);
  let itemListCopy = Array.from(itemList);
  if(removeItem != null){
    let index = itemListCopy.indexOf(removeItem);
    itemListCopy.splice(index,1);
  }
  itemListCopy.forEach(element => {
    let option = document.createElement("option");
    option.value = element;
    option.innerHTML = element;
    select.appendChild(option);
  });

}
//implements repopulation of select element 2
function changeList2(e){
  document.getElementById("selectList2").options.length = 0;
  populateList("selectList2",e.target.value);
  console.log(e.target.value);

}
//implements repopulation of select element 1
function changeList1(e){
  document.getElementById("selectList1").options.length = 0;
  populateList("selectList1",e.target.value);
  console.log(e.target.value);

}

//event handlers for both select elements when user interacts with them
document.getElementById("selectList1").onchange = changeList2;
document.getElementById("selectList2").onchange = changeList1;

