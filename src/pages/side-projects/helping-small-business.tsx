import React from "react";
import Layout from "../../components/layout";
import SEO from "../../components/seo";

const HelpingSmallBusiness = () => {
  return (
    <Layout
      seo={<SEO title={"Helping small businesses"} description={"Helping small businesses in North London"} keywords={[
        "small business",
        "charity",
        "pro bono",
        "Stoke Newington",
        "Finsbury Park",
        "Highbury",
        "Walthamstow",
        "Horsham"
      ]}/>}>
      <h2 style={{paddingTop: 24}}>Helping small businesses</h2>
      <p>If you’re a small business or charity in Highbury, Stoke Newington, Walthamstow, or Horsham and would like some
        pro bono help with a website, app, or would like a chat about how to use technology, get in touch!</p>
      <p>I’ve been in tech for over 10 years and looking to help local small businesses and charities improve their
        tech, whether it means improving an existing app or website, or talking through some ideas you’d like to
        bring.</p>
      <p><b>This is free!</b></p>
      <p>If you’d be interested in finding out more please do email with the link above. Or if you think of a charity or
        small business that could need a hand, do forward this page.</p>
    </Layout>
  );
}

export default HelpingSmallBusiness
