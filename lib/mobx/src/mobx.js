let objRenderList = {}
let nowComponent = null;
let deduplication = {}
let deduplicationNum = 0;
let over = false;

function observable(target, name, descriptor) {
  var v = descriptor.initializer.call(this);
  objRenderList[name] = {}
  return {
    get: function() {
      if(!deduplication[name]) deduplication[name] = {}
      if(!deduplication[name][nowComponent.deduplicationNum] && !over){
        deduplication[name][nowComponent.deduplicationNum] = true
        objRenderList[name][nowComponent.deduplicationNum] = nowComponent
      }
      return v
    },
    set: function(newValue) {
      if(v == newValue) return
      v = newValue
      let list = objRenderList[name]
      for(let i in list){
        list[i].forceUpdate()
      }
    }
  };
};


var ReactMixin = {
    componentWillMount: function() {
      // console.log(this)
    },
};

function observer(target) {
  const targetCWM = target.prototype.componentWillMount;
  const renderCWM = target.prototype.render;
  target.prototype.componentWillMount = function() {
    targetCWM && targetCWM.call(this);
    ReactMixin.componentWillMount.call(this);

  };
  target.prototype.render = function() {
    //初始化状态
    if(!this.deduplicationNum){
      deduplicationNum ++
      this.deduplicationNum = deduplicationNum
    }
    // console.log('start')
    nowComponent = this
    // console.log(deduplication)
    deduplication = {}

    // console.log(this)
    let res = renderCWM && renderCWM.call(this) 
    return res;
  }

}


setTimeout(()=>{
  console.log(objRenderList)
}, 5000)

export {
	observer,
	observable
}