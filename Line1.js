var getScriptPromisify=(src)=>{
    return new Promise((resolve)=>{
        $.getScript(src,resolve);
    });
};

(function () {
    let d3Script = document.createElement('script');
    let d3Script1 = document.createElement('script');
    d3Script.src = 'https://d3js.org/d3.v5.min.js';
    d3Script1.src = 'https://requirejs.org/docs/release/2.3.5/minified/require.js';
    d3Script.async = false;
    d3Script1.async = false;
    document.head.appendChild(d3Script);
    document.head.appendChild(d3Script1);
    var sgname;
    var flag=0; //check if arr already having the value
    var checkload=0;
    var arr = new Array();
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
    <style>
 </style>
 <div id="root" style="width:100%; height:100%;">
 </div>
 `;

    class WMM extends HTMLElement {


        disconnectedCallback() {
            // your cleanup code goes here
            try {
                document.head.removeChild(d3Script);
                document.head.removeChild(d3Script1);
            }
            catch{ }
        }

        constructor() {
            super();

            //Constants
            if (!window._d3) {
                window._d3 = d3;
            }

            this._shadowRoot = this.attachShadow({ mode: 'open' });
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._root=this.shadowRoot.getElementById("root");
            this.style.height = "100%";  //Beta Workaround
            const aabb = this.getBoundingClientRect();
            this._width = aabb.width;
            this._height = aabb.height;
                  
            this.redraw();


 // do something with the passed text
}
await getScriptPromisify("https://cdn.bootcdn.net/ajax/libs/echarts/5.0.0/echarts.min.js");
            //Adding event handler for click events
            this.addEventListener("click", event => {
                var event = new Event("onClick");
                this.dispatchEvent(event);
            });

        };


        redraw() {
     var myChart = echarts.init(this._root,"wight");

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

option && myChart.setOption(option);

        };

    }

    d3Script.onload = () => {

        customElements.define('com-infy-wm-sol', WMM);
    };

})();
