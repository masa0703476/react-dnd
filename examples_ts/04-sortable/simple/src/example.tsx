import React from "react";
import type { FC } from "react";
import { Container as DefaultContainer } from "./default/Container";
import { Container as SUUContainer } from "./SuppressingUnnecessaryUpdates/Container";

const Page: FC = () => {
  return (
    <div>
      <h1>Sortable Simple</h1>
      <DefaultContainer />

      <hr />

      <h1>SuppressingUnnecessaryUpdates</h1>
      <SUUContainer />
    </div>
  );
};

export default Page;
