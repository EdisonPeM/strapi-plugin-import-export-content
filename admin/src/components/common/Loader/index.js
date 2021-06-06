import React, { memo } from "react";
import { Wrapper } from "./styles";
import { LoadingIndicator } from "@buffetjs/styles";

function Loader() {
  return (
    <Wrapper>
      <LoadingIndicator
        borderWidth="6px"
        borderColor="#f3f3f3"
        borderTopColor="#007EFF"
        size="60px"
      />
    </Wrapper>
  );
}

export default memo(Loader);
