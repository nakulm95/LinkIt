$(document).ready(function() {
	setup();
});

var list = new List();
list.add('1');
list.add('2');
list.add('3');
list.add('4');
list.add('5');
var temp1 = new List();
var temp2 = new List();
var firstClick = true;
var firstValue = -1;
var firstList;
var firstLevel;
var firstIndex;
var secondList;
var secondValue = -1;
var secondLevel;
var secondIndex;
var circular = false;
var gg;
var exist = false;

function List() {
 List.makeNode = function() { 
  return {data: null, next: null, index: 0}; 
 }; 
 this.start = null; 
 this.end = null; 
 this.length = 0;
 this.circNum = 0;
 
 this.getLength = function() {
	 this.length = 0;
	 var high = 0;
	 var indexes = [];
	 var count = 0;
	 var current = this.start;
	 this.circNum = 0;
	 while (current != null) {
		 count++;
		 if (indexes.indexOf(current.index) !== -1) {
			 this.circNum = 0;
			 var ind = current.index;
			 while ( current.next != null  && current.next.index != ind) {
				this.circNum++;
				current = current.next; 
			 }
			 this.length = indexes.length;
			 break;
		 } else {
			 indexes.push(current.index);
			 this.length = indexes.length;
			 current = current.next;
			 
		 }
	 }
 }
 
 this.add = function(data) { 
  if (this.start === null) { 
   this.start = List.makeNode(); 
   this.end = this.start; 
  } else {
   this.end.next = List.makeNode(); 
   this.end = this.end.next; 
  } ; 
  this.end.data = data;
  this.end.index = this.length; 
  this.getLength();
 }; 
 
 this.indexOf = function(data) {
	 var index = 0;
	 var current = this.start;
	 while (current !== null) {
		 if (data == current.data) {
			 return index;
		 } else {
			 current = current.next;
			 index++;
		 }
	 }
	 return -1;
 }

 this.delete = function(data) { 
  var current = this.start; 
  var previous = this.start; 
  while (current !== null) { 
   if (data === current.data) { 
   	this.length--;
    if (current === this.start) { 
     this.start = current.next; 
     return; 
    } 
    if (current === this.end) 
                      this.end = previous;
    previous.next = current.next; return; 
    }
    previous = current; 
    current = current.next; 
   }
 }; 

 this.insertAsFirst = function(d) { 
  var temp = List.makeNode(); 
  temp.next = this.start; 
  this.start = temp; 
  temp.data = d; 
 }; 

 this.insertAfter = function(t, d) { 
  var current = this.start; 
  while (current !== null) { 
   if (current.data === t) { 
    var temp = List.makeNode();
    temp.data = d; 
    temp.next = current.next; 
    if (current === this.end) this.end = temp;
    current.next = temp; 
    return; 
   } 
   current = current.next; 
   }
  };

  this.item = function(i) { 
   var current = this.start; 
   while (current !== null) { 
    if (i === 0) return current; 
    current = current.next; 
    i--; 
   } 
   return null; 
  }; 

 this.each = function(f) {
  var current = this.start;
  while (current !== null) { 
   f(current); 
   current = current.next; 
  } 
 };
}

function setup() {
	$('#moreTemp').click(function() {
		var tempNode = document.createElement('div');
		tempNode.className = 'box';
		if (temp1 == null) {
		}
		
	});
	createBoxes();
}

function createBoxes() {
	for (var j = 1; j < 4; j++) {
		var height;
		var classN;
		var text;
		var nums;
		if (j === 1) {
			height = '200px';
			classN = 'main';
			text = 'Main';
			nums = list;
		} else if (j === 2) {
			height = '300px';
			classN = 'temp1';
			text = 'Temp';
			nums = temp1;
		} else if (j === 3) {
			height = '400px';
			classN = 'temp2';
			text = 'Temp';
			nums = temp2;
		}
		$('circ' + classN).css('display', 'none');
		var main = document.createElement('div');
		main.className = 'box ' + classN;
		main.style.top = height;
		main.style.left = '30px';
		main.id = classN + "Node";
		main.style.position = 'absolute';
		main.innerHTML = text;
		main.style.fontSize = '15pt';
		document.getElementById('gameboard').appendChild(main);
		main.onclick = clickFunc;
		var current = nums.start;
		nums.getLength();
		for (var i = 0; i < nums.length; i++) {
			var bigBox = document.createElement('div');
			var leftBox = document.createElement('div');
			var rightBox = document.createElement('div');
			leftBox.className = 'box leftBox ' + classN;
			rightBox.className = 'box rightBox ' + classN;
			bigBox.className = 'bigBox ' + classN;
			bigBox.style.left = ((i * 160) + 150) + 'px';
			bigBox.style.top = height;
			leftBox.innerHTML = current.data;
			rightBox.innerHTML = '&#149;';
			bigBox.id = 'box' + current.data;
			bigBox.appendChild(leftBox);
			bigBox.appendChild(rightBox);
			document.getElementById('gameboard').appendChild(bigBox);
			bigBox.onclick = clickFunc;
			var arrow =document.createElement('div');
			arrow.className="straightArrow";
			arrow.id="arrow " + i;
			arrow.style.left = (i * 160) + 83 + 'px';
			arrow.style.top = height;
			document.getElementById('gameboard').appendChild(arrow);
			if (i == nums.length - 1) {
				if (nums.circNum !== 0) {
					$('#up' + classN).css('top', parseInt(height) - 20 + 'px');
					$('#up' + classN).css('left', nums.length * 160 + 70 + 'px');
					$('#up' + classN).css('width', '5px');
					$('#up' + classN).css('height', '20px');
					$('#horiz' + classN).css('width', ((nums.circNum) * 160) + 'px');
					$('#horiz' + classN).css('height', '5px');
					$('#horiz' + classN).css('top', parseInt(height) - 20 + 'px');
					$('#horiz' + classN).css('left' , (((nums.length - nums.circNum - 1) * 160) + 230) + 'px');
					$('#down' + classN).css('top' , parseInt(height) -20 + 'px');
					$('#down' + classN).css('width', '5px');
					$('#down' + classN).css('height', '20px');
					$('#down' + classN).css('left' , ((nums.length - nums.circNum - 1) * 160) + 230 + 'px');
					$('.circ' + classN).css('display', 'inline');
				}
			}
			current = current.next;
		}
	}
}

function clickFunc() {
	$(this).css('color', 'red');
	if (firstClick) {
		firstClick = false;
		var node;
		if ($(this).hasClass('main')) {
			firstList = list;
			firstLevel = 1;
			node = 'main';
		} else if ($(this).hasClass('temp1')) {
			firstList = temp1;
			firstLevel = 2;
			node = 'temp1';
		} else {
			firstList = temp2;
			firstLevel = 3;
			node = 'temp2';
		}
		firstValue = $(this).attr('id').slice(3);
		firstIndex = (parseInt($(this).css('left')) - 150) / 160;
	} else {
		firstClick = true;
		if ($(this).hasClass('main')) {
			secondList = list;
			secondLevel = 1;
		} else if ($(this).hasClass('temp1')) {
			secondList = temp1;
			secondLevel = 2;
		} else {
			secondList = temp2;
			secondLevel = 3;
		}
		secondValue = $(this).attr('id').slice(3);
		secondIndex = (parseInt($(this).css('left')) - 150) / 160;
		swap();
	}
}

function swap() {
	var htmlString;
	var firstListString;
	var secondListString;
	if (firstLevel == 1) {
		firstListString = 'main';
	} else if (firstLevel == 2) {
		firstListString = 'temp1';
	} else {
		firstListString = 'temp2';
	}
	if (secondLevel == 1) {
		secondListString = 'main'
	} else if (secondLevel == 2) {
		secondListString = 'temp1';
	} else {
		secondListString = 'temp2';
	}
	if ((firstValue == 'p1Node' && secondValue == 'p1Node') || (firstValue == 'p2Node' && secondValue == 'p2Node') || (firstValue == 'nNode' && secondValue == 'nNode')) {
		if (firstValue == 'p1Node') {
			temp1 = new List();
			$('#textarea').html($('#textarea').html() + 'temp1 = null;\n');
		} else if (firstValue == 'p2Node') {
			temp2 = new List();
			$('#textarea').html($('#textarea').html() + 'temp2 = null;\n');
		} else {
			// list = new List();
		}
	} else if (firstLevel == secondLevel && firstIndex == secondIndex) {
		firstList.item(firstIndex).next = null;
		firstList.getLength();
		htmlString = firstListString + '.front';
		for (var i = 0; i < firstIndex; i++) {
			htmlString += '.next';
		}
		$('#textarea').html($('#textarea').html() + htmlString + ' = null;\n');
	} else if (firstValue === 'p1Node') {
		if (secondValue == 'nNode') {
			temp1 = list;
			$('#textarea').html($('#textarea').html() + 'temp1 = main;\n');
		} else if (secondValue == 'p2Node') {
			temp1 = temp2;
			$('#textarea').html($('#textarea').html() + 'temp1 = temp2;\n');
		} else {
			temp1.start = secondList.item(secondIndex);
			htmlString = 'temp1.front = ' + secondListString + '.front';
			for (var i = 0; i < secondIndex; i++) {
				htmlString += '.next';
			}
			$('#textarea').html($('#textarea').html() + htmlString + ';\n');
		}
	} else if (firstValue === 'p2Node') {
		if (secondValue == 'nNode') {
			temp2 = list;
			$('#textarea').html($('#textarea').html() + 'temp2 = main;\n');
		} else if (secondValue == 'p1Node') {
			temp2 = temp1;
			$('#textarea').html($('#textarea').html() + 'temp2 = temp1;\n');
		} else {
			temp2.start = secondList.item(secondIndex);
			htmlString = 'temp2.front = ' + secondListString + '.front';
			for (var i = 0; i < secondIndex; i++) {
				htmlString += '.next';
			}
			$('#textarea').html($('#textarea').html() + htmlString + ';\n');
		}
	} else if (firstValue === 'nNode') {
		if (secondValue == 'p1Node') {
			list = temp1;
			$('#textarea').html($('#textarea').html() + 'main = temp1;\n');
		} else if (secondValue == 'p2Node') {
			list = temp2;
			$('#textarea').html($('#textarea').html() + 'main = temp;\n');
		} else {
			list.start = secondList.item(secondIndex);
			htmlString = 'main.front = ' + secondListString + '.front';
			for (var i = 0; i < secondIndex; i++) {
				htmlString += '.next';
			}
			$('#textarea').html($('#textarea').html() + htmlString + ';\n');
		}	
	} else {
		if (secondValue === 'nNode') {
			htmlString = frstListString + '.front.next';
			for (var i = 0; i < firstIndex; i++) {
				htmlString += '.next';
			}
			firstList.item(firstIndex).next = list.start;
			$('#textarea').html($('#textarea').html() + htmlString + ' = main.front;\n');
		} else if (secondValue === 'p1Node') {
			// ,('p1Node');
			htmlString = frstListString + '.front.next';
			for (var i = 0; i < firstIndex; i++) {
				htmlString += '.next';
			}
			firstList.item(firstIndex).next = temp1.start;
			$('#textarea').html($('#textarea').html() + htmlString + ' = temp1.front;\n');
		} else if (secondValue === 'p2Node') {
			htmlString = firstListString + '.front.next';
			for (var i = 0; i < firstIndex; i++) {
				htmlString += '.next';
			}
			firstList.item(firstIndex).next = temp1.start;
			$('#textarea').html($('#textarea').html() + htmlString + ' = temp2.front;\n');
		} else {
				htmlString = firstListString + '.front';
				for (var i = 0; i <= firstIndex; i++) {
					htmlString += '.next';
				}
				htmlString += ' = ' + secondListString + '.front';
				for (var i = 0; i < secondIndex; i++) {
					htmlString += '.next';
				}
				console.log('SI: ' + secondIndex);
				firstList.item(firstIndex).next = secondList.item(secondIndex);
				$('#textarea').html($('#textarea').html() + htmlString + ';\n');
		}
	}

	list.getLength();
	temp1.getLength();
	temp2.getLength();	
	$('#gameboard').html('<div id="arrow"></div><div id="upmain" class="circmain"></div><div id="horizmain" class="circmain"></div><div id="downmain" class="circmain"></div><div id="uptemp1" class="circtemp1"></div><div id="horiztemp1" class="circtemp1"></div><div id="downtemp1" class="circtemp1"></div><div id="uptemp2" class="circtemp2"></div><div id="horiztemp2" class="circtemp2"></div><div id="downtemp2" class="circtemp2"></div>');
	list.end = list.length > 0 ? list.item(list.length - 1) : null;
	temp1.end = temp1.length > 0 ? temp1.item(temp1.length - 1) : null;
	temp2.end = temp2.length > 0 ? temp2.item(temp2.length - 1) : null;
	createBoxes();
	
}