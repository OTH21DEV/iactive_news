import React, { useEffect, memo } from "react";

const getExtension = (url) => {
  url.split(".")?.at(-1)
}

export default memo(getExtension)