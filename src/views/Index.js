import React, { useState, useEffect } from "react";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PageHeader from "components/PageHeader/PageHeader.js";
import Footer from "components/Footer/Footer.js";
import LockScreen from "components/LockScreen";

// sections for this page/view
import Basics from "views/IndexSections/Basics.js";
import Navbars from "views/IndexSections/Navbars.js";
import Tabs from "views/IndexSections/Tabs.js";
import Pagination from "views/IndexSections/Pagination.js";
import Notifications from "views/IndexSections/Notifications.js";
import Typography from "views/IndexSections/Typography.js";
import JavaScript from "views/IndexSections/JavaScript.js";
import NucleoIcons from "views/IndexSections/NucleoIcons.js";
import Signup from "views/IndexSections/Signup.js";
import Examples from "views/IndexSections/Examples.js";
import Download from "views/IndexSections/Download.js";

export default function Index() {
  const [unlocked, setUnlocked] = useState(false);

  const handleUnlock = () => {
    setUnlocked(true);
  };

  useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);

  return (
    <>
      {unlocked ? (
        <>
          <IndexNavbar />
          <div className="wrapper">
            <PageHeader />
            <div className="main">
              {/* <Basics />
              <Navbars />
              <Tabs />
              <Pagination />
              <Notifications />
              <Typography />
              <JavaScript />
              <NucleoIcons /> */}
              <Examples />
              <Signup />
              {/* <Download /> */}
            </div>
            {/* <Footer /> */}
          </div>
        </>
      ) : (
        <LockScreen onUnlock={handleUnlock} />
      )}
    </>
  );
}
