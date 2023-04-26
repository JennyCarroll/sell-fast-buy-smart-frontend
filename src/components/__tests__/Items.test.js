import React from "react";
import Items from "../Items";
import { render, cleanup, fireEvent } from "@testing-library/react";

// const { render, cleanup } = require("@testing-library/react");

afterEach(cleanup);

describe("Items", () => {
  it("renders without crashing", () => {
    render(<Items items={[]} images={[]} endingSoon={[]} />);
  });
});
