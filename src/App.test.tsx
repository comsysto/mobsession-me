import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "./globalStyles";
import App from "./App";

test("renders Caption", () => {
  render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );

  const linkElement = screen.getByText(/A remote timer for mob programming that works/i);
  expect(linkElement).toBeInTheDocument();
});

test("show Legal notice",() => {
  render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
  const linkElement = screen.getByText(/Legal notice/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toBeVisible();
  expect(linkElement.getAttribute("href")).toBe("https://legal.comsysto.com/comsystoreply.de/en/impressum/");
})
test("show privacy notice",() => {
  render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
  const linkElement = screen.getByText(/Privacy notice/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toBeVisible();
  expect(linkElement.getAttribute("href")).toBe("https://legal.comsysto.com/comsystoreply.de/en/datenschutz/");
})
