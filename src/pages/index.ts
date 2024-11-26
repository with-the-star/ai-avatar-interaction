import React from "react";

const Avatar = React.lazy(() => import("./Avatar"));
const Quiz = React.lazy(() => import("./Quiz"));

const Page = { Avatar, Quiz };

export default Page;
