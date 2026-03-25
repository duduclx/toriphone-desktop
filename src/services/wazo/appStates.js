import { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "@chakra-ui/react";

const useAppStates = () => {
  /**
   * App is loading
   * Show the loading page during the initialisation of the app
   */
  const [appIsLoading, setAppIsLoading] = useState(true);

  /**
   * App routes
   */
  const [appCurrentPage, setAppCurrentPage] = useState("phone");

  const appCurrentPageRef = useRef(appCurrentPage);

  useEffect(() => {
    appCurrentPageRef.current = appCurrentPage;
  }, [appCurrentPage]);

  /**
   * Sub routes for Contacts
   */
  const [appContactsComponent, setAppContactsComponent] = useState("favorites");

  /**
   * Sub routes for User
   */
  const [appUserComponent, setAppUserComponent] = useState("preferences");

  /**
   * App sidebar
   */
  const [showSidebar, setShowSidebar] = useState(true);

  /**
   * App media query
   */
  const [appLarge] = useMediaQuery("(min-width: 1200px)");

  /**
   * App items per page
   */
  const [appItemsPerPage, setAppItemsPerPage] = useState(10);

  return {
    appIsLoading,
    setAppIsLoading,
    appCurrentPage,
    setAppCurrentPage,
    appCurrentPageRef,
    appContactsComponent,
    setAppContactsComponent,
    appUserComponent,
    setAppUserComponent,
    showSidebar,
    setShowSidebar,
    appLarge,
    appItemsPerPage,
    setAppItemsPerPage
  };
};

export default useAppStates;
