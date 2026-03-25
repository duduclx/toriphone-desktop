import { useEffect } from "react";
import { Provider } from "./components/ui/provider";

import { UserAuthProvider } from "toriphone-auth";
import Index from "./pages/Index";

function App() {
  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    window.addEventListener("contextmenu", handleContextMenu);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <Provider>
      <UserAuthProvider>
        <Index />
      </UserAuthProvider>
    </Provider>
  );
}

export default App;
