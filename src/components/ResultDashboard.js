import { useEffect, useState } from "react";
import * as d3 from "d3";
import Scatterplot from "../charts/Scatterplot";
import Histogram from "../charts/Histogram";
import { range } from "d3";
import DonutChart from "../charts/DonutChart";
import { Suspense, useMemo } from "react";
import ResultTable, { SelectColumnFilter } from "../components/ResultTable";
import { count } from "d3";

const totalAccessor = (d) => d.total;
const snatchAccessor = (d) => d.snatch;
const jerkAccessor = (d) => d.jerk;
const categoryAccessor = (d) => d.category;
const countriesAccessor = (d) => d.nation;

const url = "http://127.0.0.1:3000/events/years";

// // Placeholder
// const urlMen =
//   "http://127.0.0.1:3000/events/years/2021/xxxii-olympic-games/men_results";
// const urlWomen =
//   "http://127.0.0.1:3000/events/years/2021/xxxii-olympic-games/women_results";

const ResultDashboard = ({ state }) => {
  // console.log(state.event, state.year, state.location);

  // const event_name = state.event.replace(/\s/g, "-").toLowerCase(); // backend handles this
  const year = state.date.split(", ")[1];

  let numberOfMen = 0;
  let numberOfWomen = 0;
  const [menData, setMenData] = useState([]);
  const [womenData, setWomenData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);

  const event_url = url + "/" + year + "/" + state.event;
  const urlMen = event_url + "/men_results";
  const urlWomen = event_url + "/women_results";
  // console.log(urlMen, urlWomen);

  /////////////////////////////////////////////////////////////

  useEffect(() => {
    d3.json(urlMen).then((data) => {
      setMenData(data);
      setResult(data);
      numberOfMen = menData.length;
    });
    d3.json(urlWomen).then((data) => {
      setWomenData(data);
      setResult(data);
      numberOfWomen = womenData.length;
    });
    setLoading(false);
    // return () => undefined;
  }, []);

  console.log(menData.length, womenData.length);

  // useEffect(() => {
  //   Promise.all([
  //     d3.json(urlMen),
  //     d3.json(urlWomen)

  //   ]).then(([d1, d2]) => {
  //     console.log(d1)
  //     console.log(d2)
  //     setMenData(d1)
  //     setWomenData(d2)
  //   })
  // }, [])

  // console.log(data)

  let results = result.filter(
    (result, index, self) =>
      index ===
      self.findIndex(
        (t) => t.name === result.name && t.birthdate === result.birthdate
      )
  );

  let cleanMenData = menData.filter(
    (menData, index, self) =>
      index ===
      self.findIndex(
        (t) => t.name === menData.name && t.birthdate === menData.birthdate
      )
  );

  let cleanWomenData = womenData.filter(
    (womenData, index, self) =>
      index ===
      self.findIndex(
        (t) => t.name === womenData.name && t.birthdate === womenData.birthdate
      )
  );

  /////////////////////////////////////////////////////////////

  // result = result.push(Object.assign({}, menData, womenData));

  function jsonConcat(o1, o2) {
    for (var key in o2) {
      o1[key] = o2[key];
    }
    return o1;
  }
  // console.log(result);

  const countNation = Object.keys(menData).reduce(function (r, k) {
    var country = menData[k].nation;
    r[country] = (r[country] || 0) + 1;
    return r;
  }, Object.create(null));

  // console.log(countNation, Object.keys(countNation).length);

  var resMen = menData.reduce(function (x, cur) {
    let item = cur.nation;
    if (!x[item]) x[item] = 0;
    x[item] = x[item] + 1;
    return x;
  }, {});

  var menNations = [];
  for (const key in resMen) {
    const count = resMen[key];
    const data = key;
    menNations.push({
      name: data,
      value: count,
    });
  }

  var resWomen = womenData.reduce(function (x, cur) {
    let item = cur.nation;
    if (!x[item]) x[item] = 0;
    x[item] = x[item] + 1;
    return x;
  }, {});

  var womenNations = [];
  for (const key in resWomen) {
    const count = resWomen[key];
    const data = key;
    if (count === NaN || count === "") {
      count = 0;
    }
    womenNations.push({
      name: data,
      value: count,
    });
  }
  // console.log('MEN: ', menNations);

  // console.log('Women: ', womenNations);

  // const menNationAccessor = (d) => d.menNations.value;
  // const womenNationAccessor = (d) => d.womenNations.name;
  // console.log(womenData[womenNationAccessor[0]])

  // async function handleChange(e) {
  //   const response = await fetch(url + `/events/years/${e.target.value}`)
  //     .then((r) => r.json())
  //     .then((menData) => {
  //       setMenData(menData.filter((value) => Object.keys(value).length !== 0));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Birthdate",
        accessor: "birthdate",
      },
      {
        Header: "Country",
        accessor: "nation",
      },
      {
        Header: "Group",
        accessor: "group",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Snatch",
        accessor: "snatch",
      },
      {
        Header: "Clean and Jerk",
        accessor: "jerk",
      },
      {
        Header: "total",
        accessor: "total",
      },
      {
        Header: "Rank",
        accessor: "rank",
      },
    ],
    []
  );

  return (
    <div>
      <div className="min-h-screen col-12 mt-2 flex">
        <div className="col-12 -my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 min-w-full sm:px-6 lg:px-8">
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
                          <b>Location: </b>
                          {state.location}
                        </li>
                        <li>
                          <b>Date: </b>
                          {state.date}
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
                          <b>Men: </b>
                          {/* {Object.keys(cleanMenData).length} */}
                          {/* {menData.length} */}
                          {numberOfMen}
                        </li>
                        <li>
                          <b>Women: </b>
                          {/* {Object.keys(cleanWomenData).length} */}
                          {/* {womenData.length} */}
                          {numberOfWomen}
                        </li>
                        <li>
                          <b>Countries: </b>
                          {Object.keys(countNation).length}
                          {/* {numberOfWomen} */}
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

            <div className="inline-block flex col-12 text-gray-900  grid  gap-4">
              <main className="col-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                <Suspense fallback={<div>Loading...</div>}>
                  {!results.length ? (
                    <div>Loading..</div>
                  ) : (
                    <div>
                      <h2 className="text-3xl font-semibold py-5">
                        Results Table
                      </h2>
                      <div className="inline-block col-12 mt-4">
                        <ResultTable
                          columns={columns}
                          results={results}
                          // menData={menData}
                        />

                        <div className="flex inline-block py-6 md:justify-start md:space-x-10 grid  gap-4">
                          {loading && <div>Loading...</div>}
                          {!loading && (
                            <div className="App__charts">
                              <div className="h-56 grid grid-cols-2 gap-4 text-center	">
                                <div className="col-12">
                                  <h3>Men Snatch vs Total</h3>
                                  <Scatterplot
                                    data={cleanMenData}
                                    xAccessor={snatchAccessor}
                                    yAccessor={totalAccessor}
                                    xLabel="Snatch"
                                    yLabel="Total"
                                  />
                                  <h3>Men CJ vs Total</h3>
                                  <Scatterplot
                                    data={cleanMenData}
                                    xAccessor={jerkAccessor}
                                    yAccessor={totalAccessor}
                                    xLabel="Clean and Jerk"
                                    yLabel="Total"
                                  />
                                </div>

                                <div className="col-12">
                                  <h3>Women Snatch vs Total</h3>
                                  <Scatterplot
                                    data={cleanWomenData}
                                    xAccessor={snatchAccessor}
                                    yAccessor={totalAccessor}
                                    xLabel="Snatch"
                                    yLabel="Total"
                                  />
                                  <h3>Women CJ vs Total</h3>
                                  <Scatterplot
                                    data={cleanWomenData}
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
                  )}
                </Suspense>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDashboard;
