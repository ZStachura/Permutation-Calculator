

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
	  opt.value=store[i];
	  opt.index=i;
	  document.getElementById("history").appendChild(opt); 
	}
	g=i;
  }

  function Replace()
  {
	const element = document.getElementById("history");
	document.getElementById("B(").disabled=true
	document.getElementById("R").disabled=false
	document.getElementById("P").disabled=false
	document.getElementById("M").disabled=false
	//const checkValue = element.options[selectedIndex];
	firstper=[]
	secondper=[]
	//inputper=checkValue;
	console.log(document.getElementById("p_input")) 	 
  }


  function onTwoPermutations(inputp)
  {
	  var second=false
	  for(var i=1;i<inputp.length;i+=2)
	  {
		 if(second!=true)
		 {
			firstper.push(inputp[i])
		 }
		 else
		 {
			 secondper.push(inputp[i])
		 }
		 if(inputp[i+1]==')')
		 {
			 second=true
			 i+=1
		 }
	  }
	  console.log("Input: ",inputp)
	  console.log("First perm: ",firstper)
	  console.log("Second perm: ",secondper)
  }

function Help(){
	var modal = document.getElementById("myModal");
    modal.style.display = "block";
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }   
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
	document.getElementById("p_input").value = inputper;
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
	multiplyperm="("
	var result=[]
	i=0
	while(i!=secondper.length){
		var final=[]
		final.push(SecondUp[i])
		if(i==SecondUp.length-1)
		{
			if(FirstUp.includes(SecondUp[0]))
			{
				j=0;
				while(j!=FirstUp.length)
				{
					if(j==FirstUp.length-1)
					{
						if(FirstUp[j]==SecondUp[0])
						{
							final.push(FirstUp[0])
							break
						}
					}
					else
					{
						if(FirstUp[j] == SecondUp[0])
						{
							final.push(FirstUp[j+1])
							break;
						}
					}
					j+=1;
				}				
			}
			else
			{
				final.push(SecondUp[0])
			}
		}
		else
		{
			if(FirstUp.includes(SecondUp[i+1]))
			{
				j=0;
				while(j!=FirstUp.length)
				{
					if(j==FirstUp.length-1)
					{
						if(FirstUp[j]==SecondUp[i+1])
						{
							final.push(FirstUp[0])
							break
						}
					}
					else
					{
						if(FirstUp[j] == SecondUp[i+1])
						{
							final.push(FirstUp[j+1])
							break;
						}
					}
					j+=1;
				}				
			}
			else
			{
				final.push(SecondUp[i+1])
			}
		}
		if(!if_same(final,result))
		{
			result.push(JSON.parse(JSON.stringify(final)))
			if(multiplyperm[multiplyperm.length-3]==final[0])
			{
				multiplyperm=multiplyperm.substring(0,multiplyperm.length-2);
				multiplyperm+=","
				multiplyperm+=multiplyperm[multiplyperm.length-1]
			}
			else
			{
				multiplyperm+=final
			}
			multiplyperm+=")("
		}
		i+=1;
	}
	if(multiplyperm[multiplyperm.length-1]=="(")
	{
		multiplyperm=multiplyperm.substring(0,multiplyperm.length-1)
	}
	else
	{
		multiplyperm+=")"
	}
	document.getElementById("m_output").value=multiplyperm;

}

function if_same(final,permutation)
{
	var same=false
	for(var i=0;i<final.length;i++)
	{
		for(var j=0; j<permutation.length;j++)
		{
			for(var k=0;k<final[i].length;k++)
			{
				if(final[i][k]==permutation[j])
				{
					same=true
					break
				}
				else
				{
					same=false
				}
			}
		}
		if(same)
		{
			break
		}
	}
	return same
}

function Power()
{
	var powerperm=" ";
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
    document.getElementById("p_input").value = "";
    document.getElementById("m_output").value = "";
    document.getElementById("r_output").value = "";
    document.getElementById("p_output").value = "";
    inputper=[];
    firstper=[];
    secondper=[];
    next=[];
	numberofperm=0;
}
