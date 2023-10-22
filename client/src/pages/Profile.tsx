import { Navigate, useParams } from "react-router-dom";

const Profile = () => {
  const { tag } = useParams();

  if (!tag?.startsWith("@")) {
    return <Navigate to="/404/*" replace />;
  }

  return <div>Profile</div>;
};

export default Profile;
