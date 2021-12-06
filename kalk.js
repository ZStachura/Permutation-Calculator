

var inputper=[];
var firstper=[];
var secondper=[];
var next=[];
var numberofperm=0;
var store=[];
var element=[];
var g=0;
var multiplyperm="";
getInput()
if(store.length>0){
element=store;}

function saveInput(forsave, storageName = 'inputtstorage') {
	element.push(forsave)
	localStorage.setItem(storageName, JSON.stringify(element))
	getInput()
  }

function getInput(storageName = 'inputtstorage') {
	try {
		store = JSON.parse(localStorage.getItem(storageName))
	  	document.querySelector('#output').innerHTML = store
	} catch (err) {}
	console.log(store)
  }

  function removeLocalStorage()
  {
	  localStorage.clear();
	  console.log(store)
  }

  function readStorage(){
	  //Wyczyszczenie pól
	  document.getElementById("r_output").value = "";
      document.getElementById("p_output").value = "";
      document.getElementById("m_output").value = "";
	  getInput()
	  //Utworzenie obieralnej listy
	  for(var i=g;i<store.length;i++){
	  var opt=document.createElement('option');
	  opt.value=opt.text=store[i];
	  document.getElementById("history").appendChild(opt);
	  console.log("Input value:",document.getElementById("input").value)	  
	}
	g=i;

  }
//BV->Button Value, BId -> Button Id
function IN(BV, BId){

	if(BV=='('){
		inputper+="("
		for(let i = 1; i <=9; i++){
			var id = "B"+i
			document.getElementById(id).disabled = false
		}
		document.getElementById("B(").disabled = true
		document.getElementById("B)").disabled = false
		if(next == 1){
			
		}
        document.getElementById("r_output").value = "";
        document.getElementById("p_output").value = "";
        document.getElementById("m_output").value = "";
	}
	else if(BV==")"){
		if(next == 0){
			next = 1;
			//Oznaczenie zakończenia jednej z permutacji
			document.getElementById("B)").disabled=true
            document.getElementById("R").disabled=false
			document.getElementById("P").disabled=false
            document.getElementById("M").disabled=false
		}
		inputper = inputper.slice(0, -2);
		inputper += ")";
		document.getElementById("B(").disabled=false
		for(let i = 1; i <=9; i++){
			var id = "B"+i
			document.getElementById(id).disabled = true
		}
		numberofperm+=1
	}
	else{
		var CB = BV;
		if(next == 0){
			//Wpisanie danych do pierwszej permutacji
			firstper.push(CB);
		}
		if(next == 1){
			//Wpisanie danych do drugiej permutacji
			secondper.push(CB);
		}
		// wypisanie danych
		inputper += CB;
		inputper += ", ";
		document.getElementById(BId).disabled = true;
	}
	if(numberofperm==2)
	{
		//zablokowanie wpisywania po wpisaniu 2 permutacji
		document.getElementById("B(").disabled = true;
		document.getElementById("B)").disabled=true;
		console.log("Number of perm:",numberofperm)
		//Zapisanie danych do Local Storage
		saveInput(inputper)
	}
	document.getElementById("input").value = inputper;
};

function Reverse()
{   
    var firstreverperm=firstper.reverse();
    var secondreverperm=secondper.reverse();
	console.log(firstreverperm)
	console.log(secondreverperm)
    var reversedperm="("
    for(let i = 0; i < firstreverperm.length; i++){
		reversedperm += firstreverperm[i]
		reversedperm += ", "
	}
	reversedperm = reversedperm.slice(0, -2);
	reversedperm += ")(";
	for(let i = 0; i < secondreverperm.length; i++){
		reversedperm += secondreverperm[i]
		reversedperm += ", "
	}
	reversedperm = reversedperm.slice(0, -2);
	reversedperm += ")";
	
    
    document.getElementById("r_output").value = reversedperm;
    document.getElementById("R").disabled=true
}

function Multiply()
{
	var FirstUp=Array.from(firstper);
	var FirstDown=Array.from(firstper);
	FirstDown.push(FirstDown[0]);
	FirstDown.shift()
	var SecondUp=Array.from(secondper);
	var SecondDown=Array.from(secondper);
	SecondDown.push(SecondDown[0]);
	SecondDown.shift()
	console.log("Firstper:",FirstUp)
	console.log(FirstDown)
	

}

function Power()
{
	var powerperm=" ";
	if(multiplyperm!='')
	{
		powerperm+="(";
		for(let i=0;i<multiplyperm.length-1;i++)
		{
			powerperm+=multiplyperm[i];
			powerperm+=","
		}
		powerperm+=multiplyperm[multiplyperm.length-1];
		powerperm+=")";
	}
	else
	{
		powerperm+="(";
		for(let i=0;i<firstper.length;i+=2)
		{
			powerperm+=firstper[i];
			powerperm+=","
		}
		for(let k=1;k<firstper.length;k+=2)
		{
			powerperm+=firstper[k];
			if(k+2<firstper.length){
			powerperm+=","}
		}
		powerperm+=")";
		if(secondper!=' ')
		{
			powerperm+="(";
		for(let i=0;i<secondper.length;i+=2)
		{
			powerperm+=secondper[i];
			powerperm+=","
		}
		for(let k=1;k<secondper.length;k+=2)
		{
			powerperm+=secondper[k];
			if(k+2<secondper.length){
			powerperm+=","}
		}
		powerperm+=")";
		}
	}
	document.getElementById("p_output").value=powerperm;
}

function clean()
{
    for(let i = 1; i <=9; i++){
        var id = "B"+i
        document.getElementById(id).disabled = true
    }
    document.getElementById("B)").disabled=true
    document.getElementById("B(").disabled=false
    document.getElementById("R").disabled=false
	document.getElementById("P").disabled=false
	document.getElementById("M").disabled=true
    document.getElementById("input").value = "";
    document.getElementById("m_output").value = "";
    document.getElementById("r_output").value = "";
    document.getElementById("p_output").value = "";
    inputper=[];
    firstper=[];
    secondper=[];
    next=[];
	numberofperm=0;
}
