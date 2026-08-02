describe("Assignment 4 Tests", () => {

  it("Sign Up, Login, Add Project and Edit Project", () => {

    // -------------------------
    // SIGN UP
    // -------------------------

    cy.visit("http://localhost:5175/signup");

    cy.get('input[name="firstname"]').type("Cypress");
    cy.get('input[name="lastname"]').type("Test");
    cy.get('input[name="email"]').type(`cypress${Date.now()}@gmail.com`);
    cy.get('input[name="password"]').type("Password123");

    cy.contains("Sign Up").click();

    // -------------------------
    // LOGIN
    // -------------------------

    cy.visit("http://localhost:5175/login");

    cy.get('input[name="email"]').type("samuel120996@gmail.com");
    cy.get('input[name="password"]').type("Linamar123456");

    cy.contains("Login").click();

    cy.wait(2000);

    // -------------------------
    // ADD PROJECT
    // -------------------------

    cy.visit("http://localhost:5175/admin/projects");

    cy.contains("Add New Project").click();

    cy.get('input[name="title"]').type("Cypress Project");

    cy.get('textarea[name="description"]').type(
      "Project created automatically by Cypress"
    );

    cy.get('input[name="completion"]').type("2026-08-01");

    cy.get('input[name="image"]').type(
      "https://picsum.photos/200"
    );

    cy.contains("Save Project").click();

    cy.wait(2000);

    // -------------------------
    // EDIT PROJECT
    // -------------------------

    cy.contains("Edit").last().click();

    cy.get('input[name="title"]')
      .clear()
      .type("Edited Cypress Project");

    cy.get('textarea[name="description"]')
      .clear()
      .type("Updated automatically by Cypress");

    cy.contains("Update Project").click();

    cy.wait(2000);

  });

});
