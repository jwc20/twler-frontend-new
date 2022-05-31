import { useEffect, useState } from "react";
import * as d3 from "d3";
import Scatterplot from "../charts/Scatterplot";

const totalAccessor = (d) => d.total;
const snatchAccessor = (d) => d.snatch;
const jerkAccessor = (d) => d.jerk;
// const categoryAccessor = (d) => d.category;

const colorScale = d3
  .scaleSequential()
  .domain([0, 99])
  .interpolator((d) => d3.interpolateRainbow(-d));

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
      // console.log(data)
      setLoading(false);
    });
    d3.json(urlWomen).then((data) => {
      setWomenData(data);
      // console.log(data)
      setLoading(false);
    });

    return () => undefined;
  }, []);

  return (
    <div>
      <div className="mt-2 flex flex-col px-15 max-w-full">
        <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">


                  <tr className="border-b border-dashed">
                    <td className="border-r border-dashed max-w-md min-w-max">
                      <p className="mx-2">Information</p>
                    </td>
                    <td className="text-left">
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

                  {/* <tr className="border-b border-dashed">
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
                  </tr> */}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
              {loading && <div>Loading...</div>}
              {!loading && (
                <div className="App__charts">
                  <div className="h-56 grid grid-cols-2 gap-4 text-center	">
                    <div>
                      <h3>Men</h3>
                      <Scatterplot
                        data={menData}
                        xAccessor={snatchAccessor}
                        yAccessor={totalAccessor}
                        xLabel="Snatch"
                        yLabel="Total"
                      />
                      <Scatterplot
                        data={menData}
                        xAccessor={jerkAccessor}
                        yAccessor={totalAccessor}
                        xLabel="Clean and Jerk"
                        yLabel="Total"
                      />
                    </div>

                    <div>
                      <h3>Women</h3>
                      <Scatterplot
                        data={womenData}
                        xAccessor={snatchAccessor}
                        yAccessor={totalAccessor}
                        xLabel="Snatch"
                        yLabel="Total"
                      />
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
