import Link from "next/link";

const Dashboard = () => {
  return (
    <div>
      <h1>Welcome To Dashboard!</h1>
      <Link href="dashboard/post/create" className="btn btn-info">
        <i className="bi bi-box-arrow-right"></i> Create A Post
      </Link>
    </div>
  );
};

export default Dashboard;
