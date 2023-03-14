import Grid from "./grid";
import { useGridCtx } from "./grid-ctx";
import Sidebar from "./sidebar";

function App() {
  const { gridLoading } = useGridCtx();
  return (
    <>
      {gridLoading ? <div className="loading-overlay"></div> : null}
      <div className="app-container">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="grid-container-outer">
          <div className="flex-spacer"></div>
          <div className="grid-container-inner">
            <div className="flex-spacer"></div>
            <Grid />
            <div className="flex-spacer"></div>
          </div>
          <div className="flex-spacer"></div>
        </div>
      </div>
    </>
  );
}

export default App;
