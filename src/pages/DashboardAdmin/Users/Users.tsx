import "./users.css";

const Users = () => {
  return (
    <div className="users-page">
      <div className="users-header">
        <h1>Users Management</h1>

        <button>Add User</button>
      </div>

      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Aditya</td>
              <td>aditya@gmail.com</td>
              <td>Admin</td>
              <td>Active</td>
            </tr>

            <tr>
              <td>2</td>
              <td>Rahul</td>
              <td>rahul@gmail.com</td>
              <td>User</td>
              <td>Active</td>
            </tr>

            <tr>
              <td>3</td>
              <td>Aman</td>
              <td>aman@gmail.com</td>
              <td>User</td>
              <td>Inactive</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
