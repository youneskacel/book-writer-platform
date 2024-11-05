import React from "react";
import { render, screen } from "@testing-library/react";
import NestedMenu from "./components/NestedMenu";
import { SectionWithChildren } from "./types/section";
import { MemoryRouter } from "react-router-dom";

const item: SectionWithChildren = {
  id: "id1",
  title: "section main",
  permittedUsers: [],
  children: [
    {
      id: "id2",
      title: "sub section 1",
      permittedUsers: [],
      children: [],
    },
    {
      id: "id3",
      title: "sub section 2",
      permittedUsers: [],
      children: [],
    },
  ],
};

test("renders subitems", () => {
  render(
    <MemoryRouter>
      <NestedMenu item={item} handleOpenModal={(_, __) => {}} />
    </MemoryRouter>
  );
  const arrowElements = screen.getAllByTestId(/arrowButton/);
  expect(arrowElements.length).toBeGreaterThanOrEqual(1);
});
