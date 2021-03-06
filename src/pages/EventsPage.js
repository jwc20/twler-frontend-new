import { Suspense, useMemo } from "react";
import EventTable, { SelectColumnFilter } from "../components/EventTable";
import { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import ResultPage from "../pages/ResultPage";
import { useNavigate } from "react-router-dom";

const url = "http://127.0.0.1:3000";

function EventsPage() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  // Temporary solution
  const placeholderYears = [
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
    "2014",
    "2013",
    "2012",
    "2011",
    "2010",
    "2009",
    "2008",
    "2007",
    "2006",
    "2005",
    "2004",
    "2003",
    "2002",
    "2001",
    "2000",
    "1999",
    "1998",
  ];
  const [events, setEvents] = useState([]);
  const [years, setYears] = useState(placeholderYears);

  useEffect(() => {
    async function getYears() {
      const response = await fetch(url + "/years")
        .then((r) => r.json())
        .then((years) => setYears(years));
    }
    getYears();
  }, []);

  useEffect(() => {
    async function getInitialYear() {
      const response = await fetch(url + `/events/years/${currentYear}`)
        .then((r) => r.json())
        .then((events) => {
          setEvents(events.filter((value) => Object.keys(value).length !== 0));
        })
        .catch((error) => {
          console.log("error");
        });
    }
    getInitialYear();
  }, []);

  const ActionComponent = ({ row }) => {
    // const id = 0;
    const id_num = row.cell.row.original.event_url.split("=")[1];

    const handleButtonClick = (row) => {
      // console.log(row.cell.row.original)
      const event_name = row.cell.row.original.name;
      const event_location = row.cell.row.original.location;
      // id = id_num
      // console.log(id_num)
      // .replace(/\s/g, "-")
      // .toLowerCase();
      const event_date = row.cell.row.original.date;
      // console.log(event_name, event_year);
      navigate("results", {
        state: {
          event: event_name,
          date: event_date,
          location: event_location,
        },
      });
    };

    return (
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => handleButtonClick(row)}
      >
        {id_num}
      </button>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "button",
        Cell: (row) => <ActionComponent row={row}>Action</ActionComponent>,
      },

      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Location",
        accessor: "location",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Date",
        accessor: "date",
      },
    ],
    []
  );

  async function handleChange(e) {
    const response = await fetch(url + `/events/years/${e.target.value}`)
      .then((r) => r.json())
      .then((events) => {
        setEvents(events.filter((value) => Object.keys(value).length !== 0));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="min-h-screen text-gray-900">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="">
          <h1 className="text-xl font-semibold">Events</h1>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          {!events.length ? (
            <div>Loading..</div>
          ) : (
            <div>
              <div className="flex gap-x-2 flex-1  flex items-center">
                <span className="text-gray-700 items-center font-extrabold">
                  Year:
                </span>
                <select
                  name="year"
                  className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  id="year"
                  aria-label="year"
                  onChange={handleChange}
                >
                  {years.map((year, i) => (
                    <option key={i} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <EventTable columns={columns} events={events} />
              </div>
            </div>
          )}
        </Suspense>
      </main>
    </div>
  );
}

export default EventsPage;
