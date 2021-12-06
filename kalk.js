

var inputper=[];
var firstper=[];
var secondper=[];
var next=[];
var numberofperm=0;
var store=[];
var element=[];
var g=0;
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
	  document.getElementById("r_output").value = "";
      document.getElementById("p_output").value = "";
      document.getElementById("m_output").value = "";
	  getInput()
	  for(var i=g;i<store.length;i++){
	  var opt=document.createElement('option');
	  opt.value=opt.text=store[i];
	  document.getElementById("history").appendChild(opt);
	  console.log("Input value:",document.getElementById("input").value)
	}
	g=i;

  }

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
			firstper.push(CB);
		}
		if(next == 1){
			secondper.push(CB);
		}
		inputper += CB;
		inputper += ", ";
		document.getElementById(BId).disabled = true;
	}
	if(numberofperm==2)
	{
		document.getElementById("B(").disabled = true;
		document.getElementById("B)").disabled=true;
		console.log("Number of perm:",numberofperm)
		console.log(element)
		saveInput(inputper)
	}
	document.getElementById("input").value = inputper;
};

function Reverse()
{   
    var firstreverperm=firstper.reverse();
    var secondreverperm=secondper.reverse();
    var reversedperm="("
    for(let i = 0; i < firstreverperm.length; i++){
		reversedperm += firstreverperm[i]
		reversedperm += ", "
	}
	reversedperm = reversedperm.slice(0, -2);
	reversedperm += ")(";
	for(let i = 0; i < secondreverperm; i++){
		reversedperm += secondreverperm[i]
		reversedperm += ", "
	}
	reversedperm = reversedperm.slice(0, -2);
	reversedperm += ")";
    
    document.getElementById("r_output").value = reversedperm;
    document.getElementById("R").disabled=true
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
