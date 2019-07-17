(function()  {
    let d3Script = document.createElement('script');
	let d3Script1 = document.createElement('script');
	let d3Script2 = document.createElement('script');
   
   // d3Script.src="http://d3js.org/d3.v4.min.js";
     d3Script2.src="https://unpkg.com/topojson-client@3";
	 d3Script.src = 'https://d3js.org/d3.v5.min.js';
	d3Script1.src="https://unpkg.com/d3@4";
 //   d3Script.src="d3-tip.js";
    d3Script.async = false;
	d3Script1.async = false;
	d3Script2.async = false;
    document.head.appendChild(d3Script);
	document.head.appendChild(d3Script1);
	document.head.appendChild(d3Script2);

    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
      <style>
      .names {
        fill: none;
        stroke: #fff;
        stroke-linejoin: round;
        }
      </style>
    `;

    d3Script.onload = () => 

    customElements.define('com-infy-wm-sol', class WM extends HTMLElement {


        disconnectedCallback () {
            // your cleanup code goes here
            try{
                document.head.removeChild(d3Script);
		    document.head.removeChild(d3Script1);
		    document.head.removeChild(d3Script2);
            }
            catch{}
            }
    
        constructor() {
            super();
            //Constants
                         if (!window._d3){
                window._d3 = d3;
            }
            
            this._shadowRoot = this.attachShadow({mode: 'open'});
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this.style.height = "100%";  //Beta Workaround
            this._svgContainer;

            //Adding event handler for click events
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
            });
            
            this.redraw();
        };

        redraw() {
            if (!this._svgContainer){
		      console.log("inside svg creat");
                this._svgContainer = window._d3.select(this._shadowRoot)
                .append("svg:svg")
                .attr("id", "Worldmap")
                .attr("width", this._widgetWidth)
                .attr("height", this._widgetWidth);
            }


var svg = this._svgContainer;
           

            var path = d3.geoPath().projection(d3.geoMercator());
            window._d3.json("https://unpkg.com/world-atlas@1/world/110m.json", function(error, world) {
		    console.log("inside json");
              if (error) throw error;
              svg.selectAll("path")
                 .data(topojson.feature(world,world.objects.countries).features)
                 .enter().append("path")
                 .attr("d", path);
            });

      
        };


        //Helper function	
   
    
    
    });
        
})();
