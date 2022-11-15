var getScriptPromisify=(src)=>{
    return new Promise((resolve)=>{
        $.getScript(src,resolve);
    });
};

(function () {
    var counter=0;
    const tmpl = document.createElement("template");
    tmpl.innerHTML = `
    <style>
 </style>
 <div id="root" style="width:100%; height:100%;">
 </div>
 `;

    class LINECHART extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: "open" });
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._root=this._shadowRoot.getElementById("root");
	    this._props={};
	    counter=1;
	    this.redraw();
		
}
onCustomWidgetResize(width,height){
	if(counter!==1)
	{
		this.redraw();
	}
	

}

set myDataSource(dataBinding){
	this._myDataSource=dataBinding;
	if(counter!==1)
	{
		this.redraw();
	}
}
       async redraw() {
   	await getScriptPromisify("https://cdn.bootcdn.net/ajax/libs/echarts/5.4.0/echarts.min.js");
	if(!this._myDataSource|| this._myDataSource.state!=="success"){
		counter=0;
		return;
	}
	const dimension=this._myDataSource.metadata.feeds.dimensions.values[0];
	const measure=this._myDataSource.metadata.feeds.measures.values[0];
	const data=this._myDataSource.data.map((data)=>{
		return{
		name:data[dimension].label,
		value:data[measure].raw,
	};
	});
     const myChart = echarts.init(this._root,"wight");
var title=this._myDataSource.metadata.mainStructureMembers.measures_0.label + " per "+ this._myDataSource.metadata.dimensions.dimensions_0.description;
const option = {
animationDuration: 500,
  title: {
    text: title
  },
  tooltip: {
    trigger: "Axis"
  },
 
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },

  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: data.map(item => item.name)
  },
  yAxis: {
    type: 'value'
  },
  series: [
    
    {
      name: '',
      type: 'line',
      stack: 'Total',
      data: data.map(item => item.value)
    }
  ]
};
option && myChart.setOption(option);
counter=2;
        };

    }
        customElements.define('com-cg-line-sol', LINECHART);  

})();
