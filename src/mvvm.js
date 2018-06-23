
class MVVM{
	constructor(options){
		this._options = options;
		let data = this._data = options.data();
		Object.keys(data).forEach(key => {
	        this._proxy(key);
	    });

		observe(data); //给数据的所有键值加上get set
		let dom = document.getElementById(options.el);
		new Compile(dom,this);
	}

	_proxy(key){  //这时是为了vm[key] 能够直接访问到data的数据
		Object.defineProperty(this, key, {
            configurable: false,
            enumerable: true,
            get: function proxyGetter() {
                return this._data[key];
            },
            set: function proxySetter(newVal) {
                this._data[key] = newVal;
            }
        });
	}
}