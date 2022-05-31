import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "flowbite";

const url = "http://127.0.0.1:3000";

function DropdownYear() {
  const [years, setYears] = useState([]);

  useEffect(() => {
    fetch(url + `/years`)
      .then((r) => r.json())
      .then((years) => setYears(years));
  }, []);

  return (
    <Dropdown label="Dropdown button">
      <Dropdown.Item>Earnings</Dropdown.Item>
      <Dropdown.Item>Sign out</Dropdown.Item>
    </Dropdown>
  );
}

export default DropdownYear;
