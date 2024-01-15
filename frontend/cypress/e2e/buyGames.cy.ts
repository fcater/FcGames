const addGameToCart = (gameIndex: number | number[]) => {
  if (Array.isArray(gameIndex)) {
    gameIndex.forEach((index) => {
      cy.get(".card").eq(index).find(".actions").find("button").eq(0).click();
    });
  } else {
    cy.get(".card").eq(gameIndex).find(".actions").find("button").eq(0).click();
  }
};

describe("buy game", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#username").type("admin");
    cy.get("#password").type("admin");
    cy.get(".login").click();
  });

  describe("view games", () => {
    it("should be able to search game", () => {
      cy.get(".search").type("奥德赛");
      cy.get(".search").find("button").click();
      cy.get(".card").should("have.length", 1);
    });

    it("should view games as chart or list", () => {
      cy.get(".el-switch__core").click();
      cy.get(".description").should("exist");
      cy.get(".el-switch__core").click();
      cy.get(".description").should("not.exist");
    });
  });

  describe("buy a game", () => {
    it("should be able buy 1 game in game list", () => {
      cy.get(".card").eq(0).find(".already-have").should("not.exist");
      cy.get(".card").eq(0).find(".buy-game-button").click();
      cy.get(".buy-game-modal-confirm").click();
      cy.get(".card").eq(0).find(".already-have").should("exist");
    });

    it("should be able buy 1 game in game info page", () => {
      cy.get(".card").eq(0).click();
      cy.get(".already-have").should("not.exist");
      cy.get(".purchage").click();
      cy.get(".buy-game-modal-confirm").click();
      cy.get(".already-have").should("exist");
    });

    it("should not be able buy 1 game when account balance is not enough", () => {
      cy.get(".card")
        .eq(1)
        .find(".actions")
        .find("button")
        .eq(1)
        .should("have.prop", "disabled");
      cy.get(".card").eq(1).click();
      cy.get(".actions").find("button").eq(1).should("have.prop", "disabled");
    });
  });

  describe("buy game in cart", () => {
    it("should be able add game to cart", () => {
      addGameToCart([0, 1]);
      cy.get(".shopping-dropdown").click();
      cy.get(".cart-dropdown").find(".cart-game-item").should("have.length", 2);
      cy.get(".card").eq(2).click();
      cy.get(".actions").find("button").eq(1).click();
      cy.get(".shopping-dropdown").click();
      cy.get(".cart-dropdown").find(".cart-game-item").should("have.length", 3);
    });

    it("should be able remove game from cart", () => {
      addGameToCart([0, 1, 2]);
      cy.get(".shopping-dropdown").click();
      cy.get(".cart-dropdown").find(".cart-game-item").should("have.length", 3);
      addGameToCart(0);
      cy.get(".shopping-dropdown").click();
      cy.get(".cart-dropdown").find(".cart-game-item").should("have.length", 2);
      cy.get(".card").eq(2).click();
      cy.get(".actions").find("button").eq(1).click();
      cy.get(".shopping-dropdown").click();
      cy.get(".cart-dropdown").find(".cart-game-item").should("have.length", 1);
      cy.get(".cart-dropdown")
        .find(".cart-game-item")
        .find(".actions")
        .find("button")
        .eq(0)
        .click();
      cy.get(".cart-dropdown").find(".cart-game-item").should("have.length", 0);
    });

    it("should be able to buy multiple games in cart", () => {
      addGameToCart([0, 2]);
      cy.get(".shopping-dropdown").click();
      cy.get(".cart-dropdown").find(".cart-game-item").should("have.length", 2);
      cy.get(".buy-all-games").click();
      cy.get(".already-have").should("have.length", 2);
    });

    it("should not able to buy multiple games in cart when account balance is not enough", () => {
      addGameToCart([0, 1, 2]);
      cy.get(".shopping-dropdown").click();
      cy.get(".buy-all-games").should("contain.text", "余额不足");
    });
  });
});
