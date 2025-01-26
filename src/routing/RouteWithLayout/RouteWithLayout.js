import React from "react";

export function RouteWithLayout({ Component, Layout, ...rest }) {
  return (
    <Layout {...rest}>
      <Component {...rest} />
    </Layout>
  );
}
