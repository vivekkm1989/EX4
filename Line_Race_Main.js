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

    class LINERACE extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: "open" });
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._root=this._shadowRoot.getElementById("root");
	    this._props={};
	    counter=1;
	    this.render();
		
}
onCustomWidgetResize(width,height){
	if(counter!==1)
	{
		this.render();
	}
	

}

set myDataSource(dataBinding){
	this._myDataSource=dataBinding;
	if(counter!==1)
	{
		this.render();
	}
}
       async render() {
   	await getScriptPromisify("https://cdn.bootcdn.net/ajax/libs/echarts/5.4.0/echarts.min.js");
	if(!this._myDataSource|| this._myDataSource.state!=="success"){
		counter=0;
		return;
	}
	       console.log(this._myDataSource.metadata);
	console.log(this._myDataSource.metadata.dimensions);
	       console.log(this._myDataSource.metadata.dimensions.dimensions1_0);
	       var dim1_desc=this._myDataSource.metadata.dimensions.dimensions1_0.description;
	       var dim2_desc=this._myDataSource.metadata.dimensions.dimensions2_0.description;
	       var measure_desc=this._myDataSource.metadata.mainStructureMembers.measures_0.label;
	       
	const dimension="dimensions1_0";
	const date="dimensions2_0";
	const measure=this._myDataSource.metadata.feeds.measures.values[0];
	const data=this._myDataSource.data.map((data)=>{
		return{
		name:data[dimension].label,
		date:data[date].label,
		value:data[measure].raw,
	};
	});
     const myChart = echarts.init(this._root,"wight");
	 
	 
	  const countries = data.map(item => item.name);
	  console.log(countries);
  const datasetWithFilters = [];
  const seriesList = [];
  echarts.util.each(countries, function (country) {
    var datasetId = 'dataset_' + country;
    datasetWithFilters.push({
      id: datasetId,
      fromDatasetId: 'dataset_raw',
      transform: {
        type: 'filter',
        config: {
          and: [
            { dimension: 'Date', gte: 2000 },
            { dimension: 'Product', '=': country }
          ]
        }
      }
    });

    seriesList.push({
      type: 'line',
      datasetId: datasetId,
      showSymbol: false,
      name: country,
      labelLayout: {
        moveOverlap: 'shiftY'
      },
      emphasis: {
        focus: 'series'
      },
      encode: {
        x: dim2_desc,
        y: measure_desc,
        label: [dim1_desc, measure_desc],
        itemName: dim2_desc,
        tooltip: measure_desc
      }
    });
  });
  const option = {
    animationDuration: 10000,
    dataset: [
      {
        id: 'dataset_raw',
        source: data
      },
      ...datasetWithFilters
    ],
    title: {
      text: 'Income of Germany and France since 1950'
    },
    tooltip: {
      order: 'valueDesc',
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      nameLocation: 'middle'
    },
    yAxis: {
      name: measure_desc
    },
    grid: {
      right: 140
    },
    series: seriesList
  };
 // myChart.setOption(option);


option && myChart.setOption(option);
        };

    }
        customElements.define('com-cg-line-race', LINERACE);  

})();
