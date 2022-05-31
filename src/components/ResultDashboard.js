import { useEffect, useState } from "react";
import * as d3 from "d3";
import Scatterplot from "../charts/Scatterplot";
import Histogram from "../charts/Histogram";
import { range } from "d3";
import DonutChart from "../charts/DonutChart";

const totalAccessor = (d) => d.total;
const snatchAccessor = (d) => d.snatch;
const jerkAccessor = (d) => d.jerk;
const categoryAccessor = (d) => d.category;
const countriesAccessor = (d) => d.nation;

// Placeholder
const urlMen =
  "http://127.0.0.1:3000/events/years/2021/xxxii-olympic-games/men_results";
const urlWomen =
  "http://127.0.0.1:3000/events/years/2021/xxxii-olympic-games/women_results";

const ResultDashboard = () => {
  const [menData, setMenData] = useState([]);
  const [womenData, setWomenData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    d3.json(urlMen).then((data) => {
      setMenData(data);
      setLoading(false);
    });
    d3.json(urlWomen).then((data) => {
      setWomenData(data);
      setLoading(false);
    });
    return () => undefined;
  }, []);

  const countMen = Object.keys(menData).reduce(function (r, k) {
    var country = menData[k].nation;
    r[country] = (r[country] || 0) + 1;
    return r;
  }, Object.create(null));
  // console.log(countMen);

  const objMenNation = {};
  let arr1 = Object.keys(countMen);
  let arr2 = Object.values(countMen);

  for (let i = 0; i < countMen.length; i++ ) {
    objMenNation.name = arr1[i];
    console.log(arr1[i])
    objMenNation['value'] = arr2[i];

    // objMenNation['name'] = Object.keys(countMen);
    // objMenNation['value'] = Object.values(countMen)
  }

  console.log(objMenNation)



  

  return (
    <div>
      <div className="mt-2 flex justify-content">
        <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="border-b border-dashed">
                    <td className="border-r border-dashed">
                      <p className="mx-2">Information</p>
                    </td>
                    <td className="text-left table-auto">
                      <ul className="mx-2">
                        <li>
                          <b>Location: </b> PLACEHOLDER
                        </li>
                        <li>
                          <b>Date: </b>PLACEHOLDER
                        </li>
                      </ul>
                    </td>
                  </tr>

                  <tr className="border-b border-dashed">
                    <td className="border-r border-dashed">
                      <p className="mx-2">Participants #</p>
                    </td>
                    <td className="text-left">
                      <ul className="mx-2">
                        <li>
                          <b>Total: </b> PLACEHOLDER
                        </li>
                        <li>
                          <b>Men: </b>PLACEHOLDER
                        </li>
                        <li>
                          <b>Women: </b>PLACEHOLDER
                        </li>
                        <li>
                          <b>Countries: </b>PLACEHOLDER
                        </li>
                      </ul>
                    </td>
                  </tr>

                  <tr className="border-b border-dashed">
                    <td className="border-r border-dashed">
                      <p className="mx-2">Group: </p>
                    </td>
                    <td className="text-left">
                      <ul className="mx-2">
                        <li>
                          <b>Group A: </b>PLACEHOLDER
                        </li>
                        <li>
                          <b>Group B: </b>PLACEHOLDER
                        </li>
                        <li>
                          <b>Group C: </b>PLACEHOLDER
                        </li>
                        <li>
                          <b>Group D: </b>PLACEHOLDER
                        </li>
                      </ul>
                    </td>
                  </tr>

                  <tr className="">
                    <td className="border-r border-dashed">
                      <p className="mx-2">Source Link: </p>
                    </td>
                    <td className="text-left">
                      <ul className="mx-2">
                        <li>View the original file</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
              {loading && <div>Loading...</div>}
              {!loading && (
                <div className="App__charts">
                  <div className="h-56 grid grid-cols-2 gap-4 text-center	">
                    <div>
                      <h3>Men's Categories</h3>
                      <DonutChart
                        data={[countMen]}
                        // xAccessor={categoryAccessor}
                        // label="Category"
                      />
                    </div>
                    <div>
                      <h3>Women's Categories</h3>
                      {/* <Histogram
                        data={womenData}
                        xAccessor={categoryAccessor}
                        label="Category"
                      /> */}
                    </div>

                    <div>
                      <h3>Men Snatch vs Total</h3>
                      <Scatterplot
                        data={menData}
                        xAccessor={snatchAccessor}
                        yAccessor={totalAccessor}
                        xLabel="Snatch"
                        yLabel="Total"
                      />
                      <h3>Men CJ vs Total</h3>
                      <Scatterplot
                        data={menData}
                        xAccessor={jerkAccessor}
                        yAccessor={totalAccessor}
                        xLabel="Clean and Jerk"
                        yLabel="Total"
                      />
                    </div>

                    <div>
                      <h3>Women Snatch vs Total</h3>
                      <Scatterplot
                        data={womenData}
                        xAccessor={snatchAccessor}
                        yAccessor={totalAccessor}
                        xLabel="Snatch"
                        yLabel="Total"
                      />
                      <h3>Women CJ vs Total</h3>
                      <Scatterplot
                        data={womenData}
                        xAccessor={jerkAccessor}
                        yAccessor={totalAccessor}
                        xLabel="Clean and Jerk"
                        yLabel="Total"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDashboard;
