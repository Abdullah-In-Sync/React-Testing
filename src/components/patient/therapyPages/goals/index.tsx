import React, { useState } from "react";
import type { NextPage } from "next";
import ContentHeader from "../../../common/ContentHeader";
import Loader from "../../../common/Loader";
import Goals from "../../../common/Goals/Goals";

const GoalIndex: NextPage = () => {
  const [loader, setLoader] = useState<boolean>(false);

  /* istanbul ignore next */

  return (
    <>
      <Loader visible={loader} />
      <ContentHeader title="Goals" />
      <Goals setLoader={setLoader} />
    </>
  );
};
export default GoalIndex;
