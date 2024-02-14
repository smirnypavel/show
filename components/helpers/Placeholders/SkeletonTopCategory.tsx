import React from "react";
import ContentLoader from "react-content-loader";

const SceletonTopCategory = (props: any) => (
  <>
    <ContentLoader
      speed={2}
      width={240}
      height={347}
      viewBox="0 0 240 347"
      backgroundColor="#3b3b3b"
      foregroundColor="#a159ff75"
      {...props}>
      <rect
        x="0"
        y="0"
        rx="20"
        ry="20"
        width="240"
        height="240"
      />
      <rect
        x="0"
        y="210"
        rx="7"
        ry="0"
        width="240"
        height="30"
      />
      <rect
        x="0"
        y="250"
        rx="0"
        ry="0"
        width="240"
        height="20"
      />
      <rect
        x="0"
        y="250"
        rx="20"
        ry="20"
        width="240"
        height="97"
      />
    </ContentLoader>
  </>
);

export default SceletonTopCategory;
