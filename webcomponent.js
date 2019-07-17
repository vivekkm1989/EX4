(function()  {
    let d3Script = document.createElement('script');
	let d3Script1 = document.createElement('script');
	let d3Script2 = document.createElement('script');
   
   // d3Script.src="http://d3js.org/d3.v4.min.js";
     d3Script2.src="https://d3js.org/topojson.v1.min.js";
	 d3Script.src = 'https://d3js.org/d3.v5.min.js';
	d3Script1.src="https://d3js.org/queue.v1.min.js";
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
    
     /*        this._outerRad = 0.0;
            this._endAngleDeg = 0.0;
            this._endAngleDegMax = 145.0;
            this._startAngleDeg = -145.0;
            const bcRect = this.getBoundingClientRect();
            this._widgetHeight = bcRect.height;
            this._widgetWidth = bcRect.width;
            
            //Guide Lines
            this._ringColorCode = 'blue';
            this._guideOpacity = 0.75;
            this._ringThickness = 3;
            this._bracketThickness = 5;

            if (this._widgetHeight < this._widgetWidth){
                this._widgetWidth = this._widgetHeight;
            } */

            //Adding event handler for click events
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
            });
            
            this.redraw();
        };

        //Getters and Setters
      /*   get angleMax() {
            return this._endAngleDeg;
        }
        set angleMax(value) {
            //Empty the shadow dom
            if (this._svgContainer){
                this._svgContainer._groups[0][0].innerHTML = "";
            }

            this._endAngleDeg = value;
            this.redraw();
        }; */

        redraw() {
            if (!this._svgContainer){
                this._svgContainer = window._d3.select(this._shadowRoot)
                .append("svg:svg")
                .attr("id", "Worldmap")
                .attr("width", this._widgetWidth)
                .attr("height", this._widgetWidth);
            }

            var format = d3.format(",");

// Set tooltips
/* var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Population: </strong><span class='details'>" + format(d.population) +"</span>";
            }) */

var margin = {top: 0, right: 0, bottom: 0, left: 0},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

var color = d3.scaleThreshold()
    .domain([10000,100000,500000,1000000,5000000,10000000,50000000,100000000,500000000,1500000000])
    .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);

var path = d3.geoPath();

var svg = window._d3.select(this._shadowRoot)
            .append("svg")
            .attr("width", this._widgetWidth)
            .attr("height", this._widgetWidth)
            .append('g')
            .attr('class', 'map');

var projection = d3.geoMercator()
                   .scale(130)
                  .translate( [width / 2, height / 1.5]);

var path = d3.geoPath().projection(projection);

//svg.call(tip);

queue()
    .defer(d3.json, "world_countries.json")
    .defer(d3.tsv, "https://vivekkm1989.github.io/Worldmap/Population.tsv")
    .await(ready);

function ready(error, data, population) {
  var populationById = {};
console.log("Inside ready");
  population.forEach(function(d) { populationById[d.id] = +d.population; 
    console.log(d.id);});
  data.features.forEach(function(d) { d.population = populationById[d.id] });

  svg.append("g")
      .attr("class", "countries")
    .selectAll("path")
      .data(data.features)
    .enter().append("path")
      .attr("d", path)
      .style("fill", function(d) { return color(populationById[d.id]); })
      .style('stroke', 'white')
      .style('stroke-width', 1.5)
      .style("opacity",0.8);
      // tooltips
       /* .style("stroke","white")
        .style('stroke-width', 0.3)
        .on('mouseover',function(d){
          tip.show(d);

          d3.select(this)
            .style("opacity", 1)
            .style("stroke","white")
            .style("stroke-width",3);
        })
        .on('mouseout', function(d){
          tip.hide(d);

          d3.select(this)
            .style("opacity", 0.8)
            .style("stroke","white")
            .style("stroke-width",0.3);
        });*/

  svg.append("path")
      .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
       // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
      .attr("class", "names")
      .attr("d", path);
}

       /*      var pi = Math.PI;		
            this._outerRad = (this._widgetWidth)/2;

            var arcDef = window._d3.arc()
                .innerRadius(0)
                .outerRadius(this._outerRad);

            var guageArc = this._svgContainer.append("path")
                .datum({endAngle: this._endAngleDeg * (pi/180), startAngle: this._startAngleDeg * (pi/180)})
                .style("fill", this._displayedColor)
                .attr("width", this._widgetWidth).attr("height", this._widgetWidth) // Added height and width so arc is visible
                .attr("transform", "translate(" + this._outerRad + "," + this._outerRad + ")")
                .attr("d", arcDef)
                .attr( "fill-opacity", this._gaugeOpacity );
            

            ///////////////////////////////////////////	
            //Lets build a border ring around the gauge
            ///////////////////////////////////////////
            var visRing = window._d3.select(this._shadowRoot).append("svg:svg").attr("width", "100%").attr("height", "100%");
                
            var ringOuterRad = this._outerRad + ( -1 * this._ringThickness);  //Outer ring starts at the outer radius of the inner arc
    
            var ringArcDefinition = window._d3.arc()
                .innerRadius(this._outerRad)
                .outerRadius(ringOuterRad)
                .startAngle(this._startAngleDeg * (pi/180)) //converting from degs to radians
                .endAngle(this._endAngleDegMax * (pi/180)) //converting from degs to radians
    
            var ringArc = this._svgContainer
                .append("path")
                .attr("d", ringArcDefinition)
                .attr("fill", this._ringColorCode)
                .attr("transform", "translate(" + this._outerRad + "," + this._outerRad + ")");


            ///////////////////////////////////////////
            //Lets build a the start and end lines
            ///////////////////////////////////////////
            var visStartBracket = window._d3.select(this._shadowRoot).append("svg:svg").attr("width", "100%").attr("height", "100%");
            var lineData = [this.endPoints(this._outerRad, this._startAngleDeg), {x:this._outerRad, y:this._outerRad}, this.endPoints (this._outerRad, this._endAngleDegMax)];
            var lineFunction = window._d3.line()
                .x(function(d) { return d.x; })
                .y(function(d) { return d.y; });
                                        
            var borderLines = this._svgContainer
                .attr("width", this._widgetWidth).attr("height", this._widgetWidth) // Added height and width so line is visible
                .append("path")
                .attr("d", lineFunction(lineData))
                .attr("stroke", this._ringColorCode)
                .attr("stroke-width", this._bracketThickness)
                .attr("fill", "none");	 */
	
        };


        //Helper function	
   
    
    
    });
        
})();
