<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="static/static.css">
 
    <script src="{{ url_for('static', path='script.js') }}"></script>
    <title>Employee Management</title>
    <style>
      .align-left {
          margin-left: auto;
      }
      .search-icon {
          display: inline-block;
          vertical-align: middle;
      }
  </style>
</head>

<body>
<section>
  <nav>
    <nav>
      <ul>
          <li class="align-left"><a href="#employee-list">Employee List</a></li>
          <li class="align-right"><a href="#search">Search</a></li>
      </ul>
  </nav>
</nav>
    <h1>Add Employee</h1>
    <form action="/add" method="post">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required><br>
        <br>
        <label for="position">Position:</label>
        <input type="text" id="position" name="position" required><br>
        <br>
        <label for="department">Department:</label>
        <input type="text" id="department" name="department" required><br>
        <br>
        <label for="salary">Salary:</label>
        <input type="number" id="salary" name="salary" required><br>
        <input type="submit" value="Add Employee">
    </form>
    <div id="employee-list-content"></div>
    <h1 id="employee-list">Employee List</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Position</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {% for employee in employee_list %}
          <tr>
            <td>{{ employee.id }}</td>
            <td>{{ employee.name }}</td>
            <td>{{ employee.position }}</td>
            <td>{{ employee.department }}</td>
            <td>{{ employee.salary }}</td>
            <td>
              <form action="/delete/{{ employee.id }}" method="get">
                <button type="submit">Delete</button>
              </form>
            </td>
          </tr>
        {% endfor %}
      </tbody>
    </table>
  </div>

    
  <div id="search-content" style="display: none;">
    <form action="/search" method="get" id="search">
        <label for="min_salary">Search Salary:</label>
        <input type="number" id="min_salary" name="min_salary" required>
        <input type="submit" value="Search" class="search-icon">
    </form>
  
    <h1 id="search-results-table">Search Results</h1>
   
<table  id="search-results-table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Position</th>
      <th>Department</th>
      <th>Salary</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {% for employee in search_results %}
      <tr>
        <td>{{ employee.id }}</td>
        <td>{{ employee.name }}</td>
        <td>{{ employee.position }}</td>
        <td>{{ employee.department }}</td>
        <td>{{ employee.salary }}</td>
        <td>
          <form action="/delete/{{ employee.id }}" method="get">
            <button type="submit">Delete</button>
          </form>
        </td>
      </tr>
    {% endfor %}
  </tbody>
</table>
</div>
</section>

<script>
  const employeeListLink = document.querySelector('a[href="#employee-list"]');
  const searchLink = document.querySelector('a[href="#search"]');
  const employeeListContent = document.getElementById('employee-list-content');
  const searchContent = document.getElementById('search-content');

  employeeListLink.addEventListener('click', function() {
      employeeListContent.style.display = 'block';
      searchContent.style.display = 'none';
  });

  searchLink.addEventListener('click', function() {
      searchContent.style.display = 'block';
      employeeListContent.style.display = 'none';
  });
 


</script>

</body>
</html>

