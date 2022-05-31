import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import sample from "../db/sample.json";

function ExampleGraph() {
  const [data, setData] = useState(sample);
  const svgRef = useRef();

  useEffect(() => {
    var div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // Setting svg
    const margin = { top: 10, right: 40, bottom: 30, left: 30 },
      width = 450 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select("#area")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Setting scale and axes
    const x = d3.scaleLinear().domain([0, 190]).range([0, width]);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));
    const y = d3.scaleLinear().domain([0, 460]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Setting up data for the svg
    svg
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.bweight))
      .attr("cy", (d) => y(d.total))
      .attr("r", 5)

      .on("mouseover", function (d, i) {
        console.log(d);
        d3.select(this).transition().duration("100").attr("r", 7);
        div.transition().duration(100).style("opacity", 1);
        div.html("$" + data.lname);
      })
      .on("mouseout", function (d, i) {
        d3.select(this).transition().duration("200").attr("r", 5);
        div.transition().duration("200").style("opacity", 0);
      });
  }, [data]);

  return (
    <div className="example">
      <svg ref={svgRef}></svg>
      <svg id="area" height={400} width={500}></svg>
    </div>
  );
}

export default ExampleGraph;
