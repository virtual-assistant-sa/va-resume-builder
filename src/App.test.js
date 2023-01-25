import { render, screen } from "@testing-library/react";
import App from "./pages/resume";

test("renders Home page", () => {
  render(<App />);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});
