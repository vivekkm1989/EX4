var getScriptPromisify=(src)=>{
    return new Promise((resolve)=>{
        $.getScript(src,resolve);
    });
};

(function () {
   
    const tmpl = document.createElement('template');
    tmpl.innerHTML = `
    <style>
 </style>
 <div id="root" style="width:100%; height:100%;">
 </div>
 `;

    class WMM extends HTMLElement {


        constructor() {
            super();

            //Constants
            if (!window._d3) {
                window._d3 = d3;
            }

            this._shadowRoot = this.attachShadow({ mode: 'open' });
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._root=this.shadowRoot.getElementById("root");
			this._props={};
			console.log("before redraw");
            this.redraw();

}
onCustomWidgetResize(width,height){
this.redraw();
}

       async redraw() {
    await getScriptPromisify("https://cdn.bootcdn.net/ajax/libs/echarts/5.4.0/echarts.min.js");
     var myChart = echarts.init(this._root,"wight");
console.log("after myChart");
const option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
};
console.log("before option");
option && myChart.setOption(option);

        };

    }


        customElements.define('com-infy-wm-sol', WMM);


})();
