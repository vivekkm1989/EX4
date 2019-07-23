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
    var arr = new Array();
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
      <style>
      
      </style>
    `;

    class WM extends HTMLElement {


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
            this.style.height = "100%";  //Beta Workaround
            const aabb = this.getBoundingClientRect();
            this._width = aabb.width;
            this._height = aabb.height;
            this._svgContainer;

            this.redraw();
            //Adding event handler for click events
            this.addEventListener("click", event => {
                var event = new Event("onClick");
                this.dispatchEvent(event);
            });

        };


        redraw() {
            if (!this._svgContainer) {
                this._svgContainer = window._d3.select(this._shadowRoot)
                    .append("svg:svg")
                    .attr("id", "rect")
                    .attr("width", "100%")
                    .attr("height", "100%");
            }

            var vis = this._svgContainer;

            //new code added
            //load SVG
            d3.xml("https://vivekkm1989.github.io/Rect/image.svg")
                .then(function (data) {

                    var segmentname;
                    var svgNode = data.getElementsByTagName("svg")[0];
                    //use plain Javascript to extract the node

                    vis.node().appendChild(svgNode);
                    var innerSVG = vis.select("svg");                    
                    innerSVG.selectAll("polygon").style("fill", "white");
                    innerSVG.selectAll("polygon").each(function () {                    
                   
                    })
                        .on("click", function () {
                            //get selected segment
                                                
                            
                            //change color on click
                            if (this.style.fill == "white") {                               
                                innerSVG.selectAll("polygon").style("fill", "white");
                                d3.select(this).style("fill", "yellow"); 
                                  sgname = d3.select(this).attr("id");
                            segmentname = d3.select(this).attr("id"); 
                            arr.push(segmentname);
                            }
                            else if (this.style.fill == "yellow") {
                                 sgname="";
                                segmentname="";
                                innerSVG.selectAll("polygon").style("fill", "white"); 
                                for(var i=0;i<arr.length;i++)
                                {
                                    if(arr[i]==segmentname)
                                    {
                                    arr.splice(i,1);
                                    }
                                }                              
                            }  
                          
                        });


                }, function (error) {
                    if (error) {
                        console.log(error);
                        return;
                    }

                });

        };


     

        //Getters and Setters
        getSegmentname() {
            /* var sgname = d3.select(this).attr("title");
           */
            // console.log("get m "+sgname);
           
            
          //  ar[0]="Alcohol";
          //  ar[1]="Juices";
           console.log(arr);
            return arr;
        }       

    }

    d3Script.onload = () => {

        customElements.define('com-infy-wm-sol', WM);
    };

})();
