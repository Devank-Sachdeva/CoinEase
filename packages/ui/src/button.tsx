"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  appName?: string;
  executeFunction: Function;
}

export const Button = ({ children, executeFunction }: ButtonProps) => {
  return (
    <button
      className="text-white bg-blue-950 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
      onClick={() => executeFunction() }
    >
      {children}
    </button>
  );
};
