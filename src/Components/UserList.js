import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import "./UserList.css";

const UserList = () => {
  // State variables to manage users, page, sorting, filters, and loading status
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filters, setFilters] = useState({
    gender: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch initial users when the component mounts
  useEffect(() => {
    fetchUsers(1);
  }, []);

  // Apply filters whenever filters state changes
  useEffect(() => {
    setPage(1);
    setUsers([]);
    fetchUsers(1);
  }, [filters]);

  // Function to fetch users from the API
  const fetchUsers = async (pageNumber) => {
    setLoading(true);
    const limit = 10;
    const skip = (pageNumber - 1) * limit;
    const response = await axios.get("https://dummyjson.com/users", {
      params: {
        limit,
        skip,
      },
    });

    let fetchedUsers = response.data.users;

    // Apply filters
    if (filters.gender) {
      fetchedUsers = fetchedUsers.filter(
        (user) => user.gender === filters.gender
      );
    }
    if (filters.country) {
      fetchedUsers = fetchedUsers.filter((user) =>
        user.address.country
          .toLowerCase()
          .includes(filters.country.toLowerCase())
      );
    }

    // Append new users to existing users
    setUsers((prevUsers) =>
      pageNumber === 1 ? fetchedUsers : [...prevUsers, ...fetchedUsers]
    );
    setLoading(false);
  };

  // Function to handle sorting
  const handleSort = (field) => {
    const newSortOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  // Function to handle filter changes
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Function to render sorting icons
  const renderSortIcon = (field) => {
    return (
      <>
        <FaArrowUp
          style={{
            color:
              sortField === field && sortOrder === "asc" ? "black" : "gray",
          }}
        />
        <FaArrowDown
          style={{
            color:
              sortField === field && sortOrder === "desc" ? "black" : "gray",
          }}
        />
      </>
    );
  };

  // Function to handle loading next page
  const handleNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchUsers(nextPage);
  };

  // Function to get sorted users based on the sortField and sortOrder
  const getSortedUsers = () => {
    if (!sortField) return users;

    return [...users].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  };

  // Get the sorted users
  const sortedUsers = getSortedUsers();

  return (
    <div className="box">
      <div className="container">
        <div className="filters">
          <label>
            <b>Gender:</b>
            <select name="gender" onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label>
          <b>Gender:</b>
            <input type="text" name="country" onChange={handleFilterChange} />
          </label>
        </div>
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>
                ID {renderSortIcon("id")}
              </th>
              <th onClick={() => handleSort("firstName")}>
                Name {renderSortIcon("firstName")}
              </th>
              <th onClick={() => handleSort("age")}>
                Age {renderSortIcon("age")}
              </th>
              <th>Gender</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>{user.address.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <p>Loading...</p>}
        <button onClick={handleNextPage} disabled={loading}>
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
