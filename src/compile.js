class Compile{
	constructor(el,vm){
		this._el = el;
		this._vm = vm;
		this._compileElement(el);
	}

	_compileElement(el){  //遍历节点
		let childs = el.childNodes;
		Array.from(childs).forEach(node => {
			if (node.childNodes && node.childNodes.length) {
                this._compileElement(node);
            }else{
            	this._compile(node);
            }

		})
	}

	_compile(node){
		if(node.nodeType == 3){ //文本节点
			let reg = /\{\{(.*)\}\}/;
			let text = node.textContent;
			if(reg.test(text)){
				//如果这个元素是{{}}这种格式
				let key = RegExp.$1;
				node.textContent =  this._vm[key];
				new Watcher(this._vm,key,val=>{
					node.textContent =  val;
				})
			}
		}else if(node.nodeType == 1){ //元素节点
			let nodeAttr = node.attributes;
			Array.from(nodeAttr).forEach(attr => {
				if(attr.nodeName == "v-model"){
					node.value =  this._vm[attr.nodeValue]; //初始化赋值
					//如果这个元素有v-model属性，那么得做点事情了
					node.addEventListener('input',()=>{
						this._vm[attr.nodeValue] = node.value;	
					})
					new Watcher(this._vm,attr.nodeValue,val=>{
						node.value =  val;
					})
				}	

			})	
		}
	}
}