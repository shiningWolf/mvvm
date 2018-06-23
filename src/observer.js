var Target = null;
class Dep{ //目标
	constructor(){
		this.subs = [];
	}

	add(watcher){
		let state = true;
		for(let item of this.subs){
			if(this.subs._uid == watcher._uid){
				state = false;
				break;
			}
		}
		if(state)
			this.subs.push(watcher); //防止观察者重复
	}

	notify(){
		this.subs.forEach(sub => {
			sub.update();
		})
	}
}

function observe(data){
	if(typeof data !== "object"){ //如果不是对象
		return;
	}
	Object.keys(data).forEach(key => { //遍历对象键值
		defineReactive(data,key,data[key]);	
	});
}

function defineReactive(data,key,val){
	observe(val);
	let dep = new Dep();
	Object.defineProperty(data,key,{
		enumerable: true,
    	configurable: true,
    	get(){
    		Target && dep.add(Target); //添加观察者了
    		return val;
    	},
    	set(newval){
    		val = newval;
    		dep.notify();  //通知所有观察者去更新
    	}
	})
}



