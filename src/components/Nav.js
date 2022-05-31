import { Link } from "react-router-dom";
import { Popover } from "@headlessui/react";

function Nav() {
  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            <Link
              to="/"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Home
            </Link>

            <Link
              to="/results"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Results
            </Link>

            <Link
              to="/athletes"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Athletes
            </Link>

            <Link
              to="/events"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Events
            </Link>

            {/* Need cutom link/route */}
            <Link
              to="/result_page"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Result Page
            </Link>




          </Popover.Group>

          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Link
              to="login"
              className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Sign in
            </Link>

            <Link
              to="signup"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </Popover>
  );
}

export default Nav;
