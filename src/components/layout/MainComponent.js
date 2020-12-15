import React from "react";
import MainBody from "../elements/MainBody";
import Navbar from "./Navbar";
import Content from "../elements/MainContentContainer";
import Footer from "./Footer";

import { Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import Map from "../pages/Map";

export default function MainComponent() {
  return (
    <MainBody>
      <Navbar />
      <Content>
        <Route exact path="/" component={MainPage} />
        <Route path="/map" component={Map} />
      </Content>
      <Footer />
    </MainBody>
  );
}