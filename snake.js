window.onload=function(){
	var canvas = document.getElementById('canvas');
	canvas.width = 1200;
	canvas.height = 500;
	
	var context = canvas.getContext('2d');
	//初始蛇位置
	var x = 100,y=100;
	var xFood,yFood;
	var turnLeft = false,turnRIght = false,turnUp = false,turnDown = false;
	var dir = 'right';
	//每格蛇身
	var len = 10;
	//存放蛇身的数组
	var bodys = [];
	initSnake(x,y,bodys,context,len);
	getDirection(bodys,len,context);
}

function initSnake(x,y,bodys,cxt,len,dir){
	for (var i=0;i<5;i++) {
		x+=10;
		bodys[i] = [x,y]
	};

	drawSnake(bodys,cxt,len);
	getFood(cxt,len);

}

function drawSnake(bodys,cxt,len){
	for(var i=0;i<bodys.length;i++){
		cxt.fillStyle = 'darkred';
		cxt.fillRect(bodys[i][0],bodys[i][1],len,len);
	}	
}


function move(dir,bodys,len,cxt){
	cxt.clearRect(bodys[0][0],bodys[0][1],bodys.length*len,len);
	var x = bodys[bodys.length-1][0];
	var y = bodys[bodys.length-1][1];
	switch(dir){
		case 'left':
			if(x==0){
				alert('game over');
			}
			var newLen = [x-len,y];
			bodys.shift();
			bodys.push(newLen);
			break;
		case 'right':
			if((x+len)==1200){
				alert('game over');
			}
			var newLen = [x+len,y];
			bodys.shift();
			bodys.push(newLen);			
			break;	
		case 'up':
			if(y==0){
				alert('game over');
			}
			var newLen = [x,y-len];
			bodys.shift();
			bodys.push(newLen);		
			break;
		case 'down':
			if(y+len==600){
				alert('game over');
			}
			var newLen = [x,y+len];
			bodys.shift();
			bodys.push(newLen);						
			break;			
	}

	drawSnake(bodys,cxt,len);
}

function getDirection(bodys,len,cxt){
	document.onkeyup = function(event){
		var flag = 1;
		event = event||window.event;
			switch(event.keyCode){
				//向左
				case 37:
					dir='left';
					break;
				//向上
				case 38:
					dir='up';
					break;
				//向右
				case 39:
					dir='right';
					break;
				//向下
				case 40:
					dir='down';
					break;
			}
		var timer = setInterval(function(){
			if(flag){
				clearInterval(timer);
			}
			move(dir,bodys,len,cxt);
			eatFood(dir,bodys,len,cxt);
		},500);
		
		flag = 0;
	}	
}
//随机生成食物
function getFood(cxt,len){
	xFood = parseInt(Math.random()*10)*120;
	yFood = parseInt(Math.random()*10)*50;
	cxt.fillStyle = 'yellow';
	cxt.fillRect(xFood,yFood,len,len);

}
//吃
function eatFood(dir,bodys,len,cxt){
	var headX = bodys[bodys.length-1][0];
	var headY = bodys[bodys.length-1][1];	
	switch(dir){
		case 'left':
			if(headX==xFood&&headY==yFood){
				getFood(cxt,len);
				var addLen = [];
				addLen = [headX-len,headY];
				bodys.push(addLen);			
				drawSnake(bodys,cxt,len);
			}				
			break;
		case 'right':
			if(headX==xFood&&headY==yFood){
				getFood(cxt,len);
				var addLen = [];
				addLen = [headX+len,headY];
				bodys.push(addLen);
				drawSnake(bodys,cxt,len);					
			}
		case 'up':
			if(headX==xFood&&headY==yFood){
				getFood(cxt,len);
				var addLen = [];
				addLen = [headX,headY-len];
				bodys.push(addLen);
				drawSnake(bodys,cxt,len);					
			}
		case 'down':
			if(headX==xFood&&headY==yFood){
				getFood(cxt,len);
				var addLen = [];
				addLen = [headX,headY+len];
				bodys.push(addLen);
				drawSnake(bodys,cxt,len);					
			}			
			break;
	}	
}




