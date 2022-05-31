import React from "react";
import PropTypes from "prop-types";
import { accessorPropsType } from "../utils/Utils";

const Circles = ({
  data,
  keyAccessor,
  xAccessor,
  yAccessor,
  radius,
  colorCategories,
}) => (
  <React.Fragment>
    {data.map((d, i) => (
      <circle
        className="Circles__circle"
        // className=`fill- `
        key={keyAccessor(d, i)}
        cx={xAccessor(d, i)}
        cy={yAccessor(d, i)}
        r={typeof radius == "function" ? radius(d) : radius}
        fill={colorCategories(d)}
      />
    ))}
  </React.Fragment>
);

Circles.propTypes = {
  data: PropTypes.array,
  keyAccessor: accessorPropsType,
  xAccessor: accessorPropsType,
  yAccessor: accessorPropsType,
  radius: accessorPropsType,
};

Circles.defaultProps = {
  radius: 2.5,
};

export default Circles;
