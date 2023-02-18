/// <reference types="cypress" />

export const ensureInMiddleOfMonthAndDay = () => {
  let now = new Date();
  if (now.getDate() > 15) {
    now.setMonth(now.getMonth() + 1);
    now.setDate(5);
  }

  if (now.getHours() > 15) {
    now.setDate(now.getDate() + 1);
    now.setHours(13);
  }

  cy.clock(now, ["Date"]);
  return now;
};

export const getMonthAndYear = (date = new Date()) => {
  return `${date.toLocaleString("default", {
    month: "long",
  })}, ${date.getFullYear()}`;
};

export const getHoursAndMinutes = date => {
  return date
    .toLocaleString("default", {
      hour: "numeric",
      minute: "2-digit",
    })
    .replace(/\s/gi, " ");
};

export const createOffsetDate = (date, what, amount) => {
  const newDate = new Date(date);
  newDate[`set${what}`](newDate[`get${what}`]() + amount);
  return newDate;
};

export const dateToHHMM = date => {
  return `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
};

export const dateToYYYYMMDD = date => {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};
