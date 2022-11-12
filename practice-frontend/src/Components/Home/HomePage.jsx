import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUsers, deleteUser } from "../../redux/apiRequest";
import "./home.css";

const HomePage = () => {

  const user = useSelector((state) => state.auth.login?.currentUser);
  // optional chaining
  // ternary operator
  const userList = useSelector((state) => state.users.users?.allUsers);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  useEffect(() => {
    if(!user) {
      navigate("/login")
    }
    if(user?.accessToken) {
      getAllUsers(user?.accessToken, dispatch);
    }
    // getAllUsers(user?.accessToken, dispatch);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = (id) => {
    deleteUser(user?.accessToken, dispatch, id);

  }
  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">
        {`Your role: ${user?.admin ? `Admin` : `User`}`}
      </div>
      <div className="home-userlist">
        {userList?.map((user) => {
          return (
            <div className="user-container">
              <div className="home-user">{user.username}</div>
              <div className="delete-user" onClick={() => handleDelete(user._id)}> Delete </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default HomePage;
