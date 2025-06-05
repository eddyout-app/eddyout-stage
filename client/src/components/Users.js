const UserList = ({ users }) => {
    return (<>
      {users &&
            users.map((user) => (<div className="row align-center mb-5" key={user.id}>
            <div className="col-md-6">
              <h2>
                {user.id}. {user.username}
              </h2>
            </div>
            <div className="col-md-6">
              <h3>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </h3>
            </div>
          </div>))}
    </>);
};
export default UserList;
