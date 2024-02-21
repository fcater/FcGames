describe("manage users", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#username").type("admin");
    cy.get("#password").type("admin");
    cy.get(".login").click();
    cy.get(".header").should("exist");
    cy.visit("/#/users");
  });

  describe("recharge user", () => {
    it("should be able to recharge for a user", () => {
      cy.get(".user-table-recharge").eq(0).click();
      cy.get(".recharge-amount").clear().type("100");
      cy.get(".user-dialog-recharge").click();
      cy.get(".el-table_1_column_3").eq(1).should("contain.text", 100);
    });

    it("should be able to decrease balance for a user", () => {
      cy.get(".user-table-recharge").eq(2).click();
      cy.get(".recharge-amount").clear().type("-100");
      cy.get(".user-dialog-recharge").click();
      cy.get(".el-table_1_column_3").eq(3).should("contain.text", 1100);
    });

    it("should ensure user's balance is at least 0 after recharge", () => {
      cy.get(".user-table-recharge").eq(2).click();
      cy.get(".recharge-amount").clear().type("-2000");
      cy.get(".user-dialog-recharge").click();
      cy.get(".el-table_1_column_3").eq(3).should("contain.text", 0);
    });
  });

  describe("delete user", () => {
    it("should not allow an admin to delete themselves", () => {
      cy.get(".el-table_1_column_4")
        .eq(1)
        .find(".cell")
        .children()
        .should("have.length", 1);
      cy.get(".el-table_1_column_4")
        .eq(2)
        .find(".cell")
        .children()
        .should("have.length", 2);
      cy.get(".el-table_1_column_4")
        .eq(3)
        .find(".cell")
        .children()
        .should("have.length", 2);
    });

    it("should be able to delete a user by admin", () => {
      cy.get(".user-table-row").should("have.length", 3);
      cy.get(".user-table-delete").eq(1).click();
      cy.get(".user-dialog-delete").click();
      cy.get(".user-table-row").should("have.length", 2);
    });
  });
});
