var getScriptPromisify=(src)=>{
    return new Promise((resolve)=>{
        $.getScript(src,resolve);
    });
};

(function () {
   
    const tmpl = document.createElement("template");
    tmpl.innerHTML = `
    <style>
 </style>
 <div id="root" style="width:100%; height:100%;">
 </div>
 `;

    class WMM extends HTMLElement {


        constructor() {
            super();

            this._shadowRoot = this.attachShadow({ mode: "open" });
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._root=this._shadowRoot.getElementById("root");
			this._props={};
			console.log("before redraw");
            this.redraw();

}
onCustomWidgetResize(width,height){
this.redraw();
}

set myDataSource(dataBinding){
	this._myDataSource=dataBinding;
	this.redraw();
}

       async redraw() {
    await getScriptPromisify("https://cdn.bootcdn.net/ajax/libs/echarts/5.4.0/echarts.min.js");
	if(!this._myDataSource|| this._myDataSource=="success"){
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
console.log(data);

const option = {
  title: {
    text: 'Stacked Line'
  },
  tooltip: {
    trigger: 'axis'
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
    data: data.name()
  },
  yAxis: {
    type: 'value'
  },
  series: [
    
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data: data.value()
    }
  ]
};
option && myChart.setOption(option);

        };

    }

        customElements.define('com-infy-wm-sol', WMM);
  

})();
