import "@testing-library/jest-dom";

import {
  grade_to_letter,
  date_to_american,
  remove_surname,
  format_line,
} from "./App";

describe("Individual functions", () => {
  test("grade conversion", () => {
    expect(grade_to_letter(99)).toBe("A");
    expect(grade_to_letter(94)).toBe("A");
    expect(grade_to_letter(92)).toBe("A-");
    expect(grade_to_letter(88)).toBe("B+");
    expect(grade_to_letter(80)).toBe("B-");
    expect(grade_to_letter(74)).toBe("C");

    expect(grade_to_letter(30)).toBe("E");
  });

  test("date conversion", () => {
    expect(date_to_american("17/08/2022")).toBe("08/17/2022");
    expect(date_to_american("31/12/2022")).toBe("12/31/2022");
    expect(date_to_american("01/01/2022")).toBe("01/01/2022");
  });

  test("remove surname", () => {
    expect(remove_surname("One Two Three")).toBe("One Two");
    expect(remove_surname("Gilberto Echeverria Furio")).toBe(
      "Gilberto Echeverria"
    );
    expect(remove_surname("Paco Gomez Juarez")).toBe("Paco Gomez");
  });
});

describe("Complete line", () => {
  test("convert line", () => {
    expect(format_line(0, "1")).toBe("1");
    expect(format_line(1, "One Two Three")).toBe("One Two");
    expect(format_line(2, "A01234567")).toBe("A01234567@tec.mx");
    expect(format_line(3, "20/08/2020")).toBe("08/20/2020");
    expect(format_line(4, "70")).toBe("C-");
  });
});
