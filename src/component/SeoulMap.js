"use client";
import * as React from "react";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";
// import {
//   GeometryCollection,
//   GeometryObject,
//   LineString,
//   MultiLineString,
//   MultiPoint,
//   MultiPolygon,
//   Objects,
//   Point,
//   Polygon,
//   Properties,
//   Topology,
//   Transform,
// } from "topojson-specification";
import korea from "@/util/seoul.json";

const featureData = feature(korea, korea.objects["seoul"]);

const SeoulMap = () => {
  const chart = useRef(null);

  // console.log(chart);

  const printD3 = () => {
    const width = 500;
    const height = 500;

    const projection = d3.geoMercator().scale(1).translate([0, 0]);
    const path = d3.geoPath().projection(projection);
    const bounds = path.bounds(featureData);

    const dx = bounds[1][0] - bounds[0][0];
    const dy = bounds[1][1] - bounds[0][1];
    const x = (bounds[0][0] + bounds[1][0]) / 2;
    const y = (bounds[0][1] + bounds[1][1]) / 2;
    const scale = 0.9 / Math.max(dx / width, dy / height);
    const translate = [width / 2 - scale * x, height / 2 - scale * y];

    projection.scale(scale).translate(translate);

    d3.select(chart.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .selectAll("path")
      .data(featureData.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("fill", "#333");
  };

  useEffect(() => {
    printD3();
  }, []);

  return <div ref={chart}></div>;
};

export default SeoulMap;
