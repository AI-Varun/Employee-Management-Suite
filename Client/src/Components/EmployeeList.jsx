import React, { useState, useEffect } from 'react';
import './styles/EmployeeList.css';
import { useNavigate } from 'react-router-dom';
import { fetchEmployees, deleteEmployee } from '../Utils/api';
import { DateTime } from 'luxon';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState('name'); // Default sorting column
  const [sortDirection, setSortDirection] = useState('asc'); // Default sorting direction
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchEmployees();
        if (response && response.success) {
          setEmployees(response.data);
        } else {
          console.error('Failed to fetch employees');
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredEmployees = employees.filter((employee) => {
    const { name, email, uniqueId, createdAt } = employee;
    const lowerCaseQuery = searchQuery.toLowerCase();

    return (
      name.toLowerCase().includes(lowerCaseQuery) ||
      email.toLowerCase().includes(lowerCaseQuery) ||
      uniqueId.toLowerCase().includes(lowerCaseQuery) ||
      DateTime.fromISO(createdAt, { zone: 'utc' })
        .toFormat('dd-MMM-yy')
        .toLowerCase()
        .includes(lowerCaseQuery)
    );
  });

  const sortEmployees = (employees) => {
    const sortedEmployees = [...employees];
    sortedEmployees.sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (sortColumn === 'createdAt') {
        return sortDirection === 'asc'
          ? new Date(aValue) - new Date(bValue)
          : new Date(bValue) - new Date(aValue);
      }

      if (typeof aValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
    return sortedEmployees;
  };

  const sortedEmployees = sortEmployees(filteredEmployees);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleCreateEmployee = () => {
    localStorage.setItem('action', 'create');
    navigate('/create-employee', { state: { action: 'create' } });
  };

  const handleEditEmployee = (employee) => {
    localStorage.setItem('action', 'edit');
    navigate('/create-employee', { state: { action: 'edit', employee } });
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter(employee => employee._id !== id));
      console.log('Employee deleted successfully');
    } catch (error) {
      console.error('Error deleting employee: ', error);
    }
  };

  return (
    <div className="container">
      <main className="main">
        <div className="employee-list-header">
          <div className='count'>
            <div className="total-count">
              Total Count: {filteredEmployees.length}
            </div>
            <button className="create-employee-button" onClick={handleCreateEmployee}>Create Employee</button>
          </div>
          <div className='search'>
            <p className='ptag'>
              Search
            </p>
            <div>
              <input
                type="text"
                placeholder="Enter Search Keyword"
                className="search-input"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        <div className="table-container">
          <table className="employee-list-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('uniqueId')}>Unique Id</th>
                <th>Image</th>
                <th onClick={() => handleSort('name')}>Name</th>
                <th onClick={() => handleSort('email')}>Email</th>
                <th>Mobile No</th>
                <th>Designation</th>
                <th>Gender</th>
                <th>Course</th>
                <th onClick={() => handleSort('createdAt')}>Create Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.uniqueId}</td>
                  <td>{employee.image && (
                    <img
                      src={`data:image/jpeg;base64,${employee.image}`}
                      alt={employee.name}
                      className="employee-image"
                    />
                  )}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.mobileNo}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.course}</td>
                  <td>{DateTime.fromISO(employee.createdAt, { zone: 'utc' }).toFormat('dd-MMM-yy')}</td>
                  <td>
                    <button onClick={() => handleEditEmployee(employee)}>Edit</button>
                    <button onClick={() => handleDeleteEmployee(employee._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default EmployeeList;
