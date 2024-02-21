describe("auth", () => {
  describe("router", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("should redirect to /login when not login in", () => {
      cy.url().should("include", "/login");
    });

    it("should redirect to /home when non-admin go to manage users", () => {
      cy.get("#username").type("fcater");
      cy.get("#password").type("fcater");
      cy.get(".login").click();
      cy.visit("/#/users");
      cy.url().should("include", "/home");
    });
  });

  describe("login", () => {
    beforeEach(() => {
      cy.visit("/#/login");
    });

    it("should login failed with wrong username or password", () => {
      cy.get("#username").type("fcater");
      cy.get("#password").type("wrong");
      cy.get(".login").click();
      cy.get(".error").should("contain.text", "用户名或密码错误");
    });

    it("should login in with a Admin", () => {
      cy.get("#username").type("admin");
      cy.get("#password").type("admin");
      cy.get(".login").click();
      cy.get(".user-header").click();
      cy.get("[role='menuitem']").eq(0).should("contain.text", "admin");
    });

    it("should login in with a user", () => {
      cy.get("#username").type("fcater");
      cy.get("#password").type("fcater");
      cy.get(".login").click();
      cy.get("[role='menuitem']").eq(0).should("contain.text", "fcater");
    });
  });

  describe("register", () => {
    beforeEach(() => {
      cy.visit("/#/login");
    });

    it("should register failed with duplicate username", () => {
      cy.get("#username").type("admin");
      cy.get("#password").type("admin");
      cy.get(".register").click();
      cy.get(".error").should("contain.text", "用户名已存在");
    });

    it("should register success with a new user", () => {
      cy.get("#username").type("fcater");
      cy.get("#password").type("fcater");
      cy.get(".register").click();
      cy.get(".user-header").click();
      cy.get("[role='menuitem']").eq(0).should("contain.text", "fcater");
    });
  });

  describe("logout", () => {
    beforeEach(() => {
      cy.visit("/#/login");
    });

    it("should clear localstorage after logout", () => {
      cy.get("#username").type("admin");
      cy.get("#password").type("admin");
      cy.get(".login").click();
      cy.window().then((window) => {
        expect(window.localStorage.getItem("token")).not.to.equal(null);
      });
      cy.get(".user-header").click();
      cy.get("[role='menuitem']").last().click();
      cy.url().should("include", "/login");
      cy.window().then((window) => {
        expect(window.localStorage.getItem("token")).to.equal(null);
      });
    });
  });
});
