import { Cuboid, History, LogOut, UserRound } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useIPD } from "../../context/IPDContext";
import WorkflowStepper from "./WorkflowStepper";

export default function AppHeader() {
  const { user, signOut } = useIPD();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header>
      <Link to="/select-model" className="brand">
        <span className="brand-mark">
          <Cuboid size={20} />
        </span>
        <span>
          IPD <b>Modelling</b>
          <small>INTELLIGENT PRODUCT DESIGN</small>
        </span>
      </Link>
      <WorkflowStepper currentPath={location.pathname} />
      <div className="user-menu">
        <Link to="/job-history" className="history-link">
          <History size={16} /> Job history
        </Link>
        <span className="user-avatar">
          <UserRound size={15} />
        </span>
        <span className="user-copy">
          <b>{user?.email}</b>
          <small>{user?.role}</small>
        </span>
        <button
          className="icon-button"
          onClick={() => {
            signOut();
            navigate("/login");
          }}
          aria-label="Sign out"
        >
          <LogOut size={17} />
        </button>
      </div>
    </header>
  );
}
