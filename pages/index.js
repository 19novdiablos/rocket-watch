import React from 'react'
import Head from 'next/head'
var d3 = require("d3")
class index extends React.Component {
  componentDidMount () {
    var width = Math.max(960, innerWidth),
    height = Math.max(500, innerHeight);

    var i = 0;

    var svg = d3.select("#ahihi").append("svg")
    .attr("width", width)
    .attr("height", height);

    svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .on("ontouchstart" in document ? "touchmove" : "mousemove", particle);

    function particle() {
      var m = d3.mouse(this)

      svg.insert("circle", "rect")
        .attr("cx", m[0])
        .attr("cy", m[1])
        .attr("r", 1e-6)
        .style("stroke", d3.hsl((i = (i + 1) % 360), 1, .5))
        .style("stroke-opacity", 1)
        .transition()
        .duration(5000)
        .ease(Math.sqrt)
        .attr("r", 100)
        .style("stroke-opacity", 1e-6)
        .remove();

      d3.event.preventDefault();
    }
  }
  render() {
    return <div id="ahihi">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <svg width="1078" height="782"><circle cx="726" cy="145" r="85.40304458752374" style={ {stroke: 'rgb(0, 255, 217)', 'stroke-opacity': '0.14597', fill:  'red'}}>
        </circle>
        <rect width="1078" height="782"></rect>
      </svg> */}
      <style>{`
        rect {
          fill: none;
          pointer-events: all;
        }
        
        circle {
          fill: none;
          stroke-width: 2.5px;
        }
      `}</style>
    </div>
  }
}

export default index
