import React from "react";
import { useAppSelector } from "~/store/hooks";

import { userRoles } from "~/constants/main";
import ChildHomePage from "./components/child-home";
import ParentHomePage from "./components/parent-home";

interface Props {}

const HomeScreen: React.FC<Props> = ({}) => {
  const userRole = useAppSelector((state) => state.user.user.role);
  const accessToken = useAppSelector((state) => state.user.accessToken);

  console.log(accessToken, "accessTokenaccessToken");

  return (
    <>
      {userRole === userRoles.parent && <ParentHomePage />}
      {userRole === userRoles.child && <ChildHomePage />}
    </>
  );
};

export default HomeScreen;
