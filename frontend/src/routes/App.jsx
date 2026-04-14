import Navigationbar from "../components/Navigationbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Fetchitems from "../components/FetchStatus";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";

function App() {
  const fetchStatus = useSelector((state) => state.fetchStatus);
  const uiStatus = useSelector((state) => state.uiStatus);

  return (
    <>
      <Navigationbar />
      <div className="flex min-h-screen bg-gray-50">
        {uiStatus.sideBar && <Sidebar />}
        <Fetchitems />
        {fetchStatus.currentlyFetching ? <LoadingSpinner /> : <Outlet />}
      </div>
      <Footer />
    </>
  );
}

export default App;
