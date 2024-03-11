
let url = "https://65b77a0946324d531d54ac37.mockapi.io/student"
window.onload = () => {
    table();
}
function table(){
fetch(url,{
  method:"GET",
  headers:{"Content-Type":"application/json"},
})
.then((res) => {
  return res.json();
})
.then((data) => {
    
    let coloum="";
    for (let i=0;i<data.length;i++){
        coloum+="<tr>";
        coloum+="<td class='le'>"+data[i].id+"</td>";
        coloum+="<td class='le'>"+data[i].name+"</td>";
        coloum+="<td class='le'>"+data[i].email+"</td>";
        coloum+="<td class='le'>"+data[i].dateOb+"</td>";
        coloum+="<td class='le'>"+data[i].phoneNum+"</td>";
        coloum+="<td class='le'>"+data[i].language+"</td>";
        coloum+="<td class='le'>"+data[i].password+"</td>";
        coloum+="<td class='le'>"+data[i].confirmPass+"</td>";
        coloum+="<td class='le'>"+data[i].maleGender+"</td>";
        coloum+="<td class='le'>"+data[i].present+"</td>";
        coloum+="<td class='le'><button class='btn fw-bold' onclick='editData ("+data[i].id+")'>Edit</button> <button class='btn fw-bold' onclick='deleteForm("+data[i].id+")'>Delete</button></td>";
        coloum += "</tr>";
    }
    document.getElementById("tbody").innerHTML= coloum;
  })}

  function back() {
    window.location.href="index.html"
  }


  function deleteForm(id)
 {
  fetch(url+"/"+id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
    table()
}

function editData(id){
  editId=id;
  window.location.href="index.html?id="+id;

}



