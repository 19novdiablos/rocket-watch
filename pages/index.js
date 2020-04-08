import React from 'react'
import Head from 'next/head'
var d3 = require("d3")
class index extends React.Component {
  componentDidMount () {
    var width = '100%',
    height = '100%'
    var i = 0;
    var svg = d3.select("#ahihi").append("svg")
                .attr("width", width)
                .attr("height", height)

    svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .on("touchstart", listen)
    .on("touchend", ignore)
    .on("touchleave", ignore)
    .on("mousemove", onmove)


    var path
    function listen () {
      var m = d3.mouse(this)
      path = svg.insert("circle", "rect")
            .attr("cx", m[0])
            .attr("cy", m[1])
            .attr("r", 1e-6)
            .style("stroke", d3.hsl((i = (i + 1) % 360), 1, .5))
            .style("stroke-opacity", 1)
            .transition()
            .duration(2000)
            .ease(Math.sqrt)
            .attr("r", 50)
            .style("stroke-opacity", 1e-6)
            .remove()
    
      if (d3.event.type !== 'mousedown') {
        svg.on("touchmove", onmove)
      }
    }
    
    function ignore () {
      svg.on("touchmove", null);
    }

    function onmove () {
      var m = d3.mouse(this)

      svg.insert("circle", "rect")
        .attr("cx", m[0])
        .attr("cy", m[1])
        .attr("r", 1e-6)
        .style("stroke", d3.hsl((i = (i + 1) % 360), 1, .5))
        .style("stroke-opacity", 1)
        .transition()
        .duration(2000)
        .ease(Math.sqrt)
        .attr("r", 50)
        .style("stroke-opacity", 1e-6)
        .remove()

      d3.event.preventDefault()
    }
  }
  render() {
    return <div id="ahihi" style={{ position: 'fixed', width: '100%', height: '100%', background: '#222' }}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ 'position': 'fixed', 'top': '50%', 'font-size': '20px', 'margin': 'auto', 'text-align': 'center', 'width': '100%', 'z-index': '-1', color: '#424242'}}>Comming soon ...</div>
      <style>{`
        rect {
          fill: none;
          pointer-events: all;
        }
        body {
          margin: 0;
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
