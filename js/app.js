VIEW = function(){
	/*
	*Logic to apply color when clicked on the small boxes
	*/
	var applyRedColor = function(ele){
		ele.addClass("red-box-color");
	};
	var applyBlueColor = function(ele){
		ele.addClass("blue-box-color");
	};
	var applyGreenColor = function(ele){
		ele.addClass("green-box-color");
	};
	var applyColor = function(ele){
		var radioButtonSlected = $('input[name=color]:checked').val();
		if(radioButtonSlected == "red"){
			applyRedColor(ele);
		}else if(radioButtonSlected == "blue"){
			applyBlueColor(ele);
		}else if(radioButtonSlected == "green"){
			applyGreenColor(ele);
		}else if(!radioButtonSlected){
			alert("Please select a color before clicking on boxes.");
		}
	};


	/*
	*Logic to reset color in boxes, reset thee radio button, and to reorder boxes to default.
	*/

	var reset = function(){
		$("input[name=color]").attr('checked',false)
		var htmlConstructed = document.createElement("div");
		htmlConstructed.setAttribute("id","box-container");
		htmlConstructed.setAttribute("class","grid-background-color");
		for(i=1;i<=9;i++){
			var boxElement = document.createElement("div");
			boxElement.setAttribute("id","box_" + i);
			boxElement.setAttribute("class","box-default-color box");
			boxElement.innerHTML = i;
			htmlConstructed.appendChild(boxElement);
		}
		$("#box-container").replaceWith(htmlConstructed);
	};


	/*
	*Logic to create random numbers, and reorder the boxes based on thee random number generated.
	*/
	var randomize = function (){
		var boxList = $('div[id^="box_"]');
		var arrayRandom={};
		for(var i=0; i<9; i++){
			while(true){
				var randomNumber = Math.floor((Math.random() * 100))%9;
				if(arrayRandom[randomNumber] == undefined){
					arrayRandom[randomNumber]= boxList[i];
					break;
				}
			}
		}
		var htmlConstructed = document.createElement("div");
		htmlConstructed.setAttribute("id","box-container");
		htmlConstructed.setAttribute("class","grid-background-color");
		for(i=0;i<9;i++){
			htmlConstructed.appendChild(arrayRandom[i]);
		}
		$("#box-container").replaceWith(htmlConstructed);
	};


	var boxClicked = function(ev){
		var target = ev.target || ev.srcElement;
		if($(target).hasClass('green-box-color')){
			alert("Already applied Green color");
		}else if($(target).hasClass('blue-box-color')){
			alert("Already applied Blue color");
		}else if($(target).hasClass('red-box-color')){
			alert("Already applied Red color");
		}else{
			applyColor($(target));
		}
	};

/*
*Globally Exposed function
*/
return{
	reset:reset,
	randomize:randomize,
	boxClicked:boxClicked
};


}();

/*
*Attachin all the Event Listeners
*/
$(document).ready(function() {
	$(document).on('click', 'div[id^="box_"]', VIEW.boxClicked);
	$('#resetbutton').bind('click', VIEW.reset); 
	$('#randomizebutton').bind('click',VIEW.randomize); 
	$('redColor').bind('click',VIEW.boxClicked);
	$('blueColor').bind('click',VIEW.boxClicked);
	$('greenColor').bind('click',VIEW.boxClicked);
});