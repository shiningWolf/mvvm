var uId = 0;
class Watcher{
	constructor(vm,exp,cb){  //初始化的时候把对象和键值传进来
		this._cb = cb;
		this._vm = vm;
		this._exp = exp;   //保存键值
		this._uid = uId;
		uId++; //每个观察者配个ID，防止重复添加
		Target = this;
		this._value = vm[exp]; //看到没，这里触发getter了
		Target = null; //用完就删
	}

	update(){
		let value = this._vm[this._exp];
		if(value != this._value){
			this._value = value;
			this._cb.call(this.vm,value);
		}
	}
}