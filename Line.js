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
	const measure1=this._myDataSource.metadata.feeds.measures.values[0];
	 const measure2=this._myDataSource.metadata.feeds.measures.values[1];
	 const measure3=this._myDataSource.metadata.feeds.measures.values[2];
	const measurearea=this._myDataSource.metadata.feeds.measuresarea.values[0];
	
	const data=this._myDataSource.data.map((data)=>{
		return{
		name:data[dimension].label,
		m1:data[measure1].raw,
		m2:data[measure2].raw,
		m3:data[measure3].raw,
		marea:data[measurearea].raw,
	};
	});
	       
     const myChart = echarts.init(this._root,"wight");
var title=this._myDataSource.metadata.mainStructureMembers.measures_0.label+", "+this._myDataSource.metadata.mainStructureMembers.measures_1.label +", "+this._myDataSource.metadata.mainStructureMembers.measures_2.label+ " per "+ this._myDataSource.metadata.dimensions.dimensions_0.description;
const colors=['#5470c6', '#91cc75', '#fac858', '#E5E4E2'];
const option = {
	
  title: {
    text: title
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
 legend: {
  orient: 'vertical',
    right: 10,
	top:15
 },
color:colors,
  xAxis: {
    type: 'category',
	 name: this._myDataSource.metadata.dimensions.dimensions_0.description,
        
    data: data.map(item => item.name).sort(function(a, b){return a - b}),
    nameLocation: 'middle',
    nameGap: 50,
    boundaryGap: false
  },
yAxis: {
   axisLabel:{
  show:true
},
  },
  series: [
    // Curve measures
    {
      name: this._myDataSource.metadata.mainStructureMembers.measures_0.label,
      type: 'line',
	smooth: 'true',
	    
      data: data.map(item => item.m1)
    },
	  {
      name: this._myDataSource.metadata.mainStructureMembers.measures_1.label,
      type: 'line',
	smooth: 'true',
	
      data: data.map(item => item.m2)
    },
	   {
      name: this._myDataSource.metadata.mainStructureMembers.measures_2.label,
      type: 'line',
	smooth: 'true',
		    lineStyle: {
               type: 'dashed'
    },
	
      data: data.map(item => item.m3)
    },
	 //Area measure
	  {
	name: this._myDataSource.metadata.mainStructureMembers.measuresarea_0.label,
     type: 'line',
	smooth: 'true',
	symbol: 'none',
	lineStyle:{
		width:0,
		color:'#E5E4E2',
	},
	    areaStyle: {
	    color: '#E5E4E2',
        opacity: 0.5,
	origin:'start',
	    },
	      emphasis: {
     	areaStyle: {
       		color:'#E5E4E2'
     		}
   	},
	
      data: data.map(item => item.marea)
	  }
	  
  ]
};

option && myChart.setOption(option);
counter=2;
        };

    }
        customElements.define('com-cg-line-sol', LINECHART);  

})();
