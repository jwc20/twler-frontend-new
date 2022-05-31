import PropTypes from "prop-types";
import * as d3 from "d3";

import Chart from "./Chart";
import Circles from "./Circles";
import Axis from "./Axis";

import { useChartDimensions, accessorPropsType } from "../utils/Utils";

const ResultTotals = ({ data, xAccessor, yAccessor, xLabel, yLabel }) => {
  const [ref, dimensions] = useChartDimensions({
    // width: 600,
    // height: 500,
    marginBottom: 100,
  });

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xAccessor))
    .range([0, dimensions.boundedWidth])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice();

  const xAccessorScaled = (d) => xScale(xAccessor(d));
  const yAccessorScaled = (d) => yScale(yAccessor(d));
  const keyAccessor = (d, i) => i;

  const resultCategories = data
    .map((d) => d.category)
    .filter((v, i, s) => s.indexOf(v) === i);

  const colorCategories = d3
    .scaleOrdinal()
    .domain(resultCategories)
    .range(d3.schemeSet3);

  return (
    <div className="ScatterPlot" ref={ref}>
      <Chart dimensions={dimensions}>
        <Axis
          dimensions={dimensions}
          dimension="x"
          scale={xScale}
          label={xLabel}
        />
        <Axis
          dimensions={dimensions}
          dimension="y"
          scale={yScale}
          label={yLabel}
        />
        <Circles
          data={data}
          keyAccessor={keyAccessor}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
          colorCategories={colorCategories}
        />
      </Chart>
    </div>
  );
};

ResultTotals.propTypes = {
  xAccessor: accessorPropsType,
  yAccessor: accessorPropsType,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
};

ResultTotals.defaultProps = {
  xAccessor: (d) => d.x,
  yAccessor: (d) => d.y,
};

export default ResultTotals;
