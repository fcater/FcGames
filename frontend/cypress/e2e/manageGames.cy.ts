const modifyGame = (gameIndex?: number) => {
  cy.get("#manageMode").click();
  if (!gameIndex) cy.get(".add-game-card").click();
  else cy.get(".card").eq(gameIndex).click();

  cy.get("#gameTitle").clear().type("cypress game title");
  cy.get("#gameCategory").click();
  cy.get(".SPORTS").click();
  cy.get("#gamePrice").clear().type("100");
  cy.get("#gameDesc").clear().type("cypress game description");
  cy.get("#gameDiscount").find("input").clear().type("50");
  cy.get("#createGameButton").click();
};

const expectedGame = () => {
  cy.get("#gameTitle").should("have.value", "cypress game title");
  cy.get("#gameCategory").should("have.value", "体育运动");
  cy.get("#gamePrice").should("have.value", "100");
  cy.get("#gameDesc").should("have.value", "cypress game description");
  cy.get("#gameDiscount").find("input").should("have.value", "50");
};

describe("manageGames", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#username").type("admin");
    cy.get("#password").type("admin");
    cy.get(".login").click();
  });

  describe("get games", () => {
    it("should get all games", () => {
      cy.get(".card").should("have.length", 2);
    });

    it("should get all game categories", () => {
      cy.get(".el-tabs__item").should("have.length.at.least", 2);
    });

    it("should filter games by categories", () => {
      cy.get("#tab-STRATEGY").click();
      cy.get(".card").should("have.length", 0);
      cy.get("#tab-PUZZLE").click();
      cy.get(".card").should("have.length", 1);
      cy.get("#tab-all").click();
      cy.get(".card").should("have.length", 2);
    });

    it("should view games as chart or list", () => {
      cy.get(".el-switch__core").click();
      cy.get(".description").should("exist");
      cy.get(".el-switch__core").click();
      cy.get(".description").should("not.exist");
    });
  });

  describe("create a game", () => {
    it("should be able to create a new game", () => {
      modifyGame();
      cy.get(".card").eq(2).click();
      expectedGame();
    });
  });

  describe("update a game", () => {
    it("should be able to update a game", () => {
      modifyGame(1);
      cy.get(".card").eq(1).click();
      expectedGame();
    });
  });

  describe("delete a game", () => {
    it("should be able to delete a game", () => {
      cy.get(".card").should("have.length", 2);
      cy.get("#manageMode").click();
      cy.get(".card").eq(1).click();
      cy.get(".delete-game-button").click();
      cy.get(".el-popconfirm__action").find("button").eq(1).click();
      cy.get(".card").should("have.length", 1);
    });
  });
});
