"use client";
import * as React from "react";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";
import koreaData from "@/util/korea.json";

// interface FeatureDataType {
//   featureData:
// }

let korea = JSON.parse(JSON.stringify(koreaData));
const featureData = feature(korea, korea.objects["korea"]);

const Map = () => {
  const chart = useRef<SVGSVGElement>(null);

  const printD3 = () => {
    const width = 800; //지도의 넓이
    const height = 800; //지도의 높이
    const initialScale = 5500; //확대시킬 값
    const initialX = -11900; //초기 위치값 X
    const initialY = 4050; //초기 위치값 Y

    const projection = d3
      .geoMercator()
      .scale(initialScale)
      .translate([initialX, initialY]);

    const path = d3.geoPath().projection(projection);

    const svg = d3
      .select(chart.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const states = svg
      .selectAll("path")
      .data(featureData.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("id", function (d) {
        return d.properties.CTP_ENG_NM;
      })
      .style("fill", "#333");

    const labels = svg
      .selectAll("text")
      .data(featureData.features) //라벨표시
      .enter()
      .append("text")
      .attr("transform", translateTolabel)
      .attr("id", function (d) {
        return "label-" + d.properties.CTP_ENG_NM;
      })
      .attr("text-anchor", "middle")
      .attr("text", ".35em")
      .text(function (d) {
        return d.properties.CTP_KOR_NM;
      })
      .style("fill", "#fff");

    function translateTolabel(d) {
      var arr = path.centroid(d);
      // if (d.properties.CTPRVN_CD == 41) {
      //   //서울 경기도 이름 겹쳐서 경기도 내리기
      //   arr[1] +=
      //     d3.event && d3.event.scale
      //       ? d3.event.scale / height + 20
      //       : translate / height + 20;
      // } else if (d.properties.CTPRVN_CD == 34) {
      //   //충남은 조금 더 내리기
      //   arr[1] +=
      //     d3.event && d3.event.scale
      //       ? d3.event.scale / height + 10
      //       : translate / height + 10;
      // }
      return "translate(" + arr + ")";
    }
  };

  useEffect(() => {
    printD3();
  }, []);

  return <div ref={chart}></div>;
};

export default Map;
