import { datacy } from "../support/constants";

describe("Открытие модальных окон", () => {
  before(() => {
    cy.visit("http://localhost:3000");
    cy.viewport(1920, 1280);
  });
  it("should open the modal", () => {
    cy.get(datacy.ingredients.ingredientName)
      .contains("Кристаллы марсианских альфа-сахаридов")
      .click();
    cy.get(datacy.ingredients.ingredientDetailsName).contains(
      "Кристаллы марсианских альфа-сахаридов"
    );
    cy.get(datacy.modal.modalClose).click();
    cy.get(datacy.modal.modal).should("not.exist");
  });
});

describe("Отправка заказа", () => {
  beforeEach(() => {
    const email = "polo@mail.ru";
    const password = "qweqweqwe";
    cy.viewport(1920, 1280);
    cy.visit("http://localhost:3000/#/login");
    cy.get(datacy.login.inputEmail).type(`${email}`);
    cy.get(datacy.login.inputPassword).type(`${password}{enter}`);
  });

  it("Заказ должен отправляться", () => {
    cy.get(datacy.ingredients.ingredientItem + ":eq(1)").trigger("dragstart");
    cy.get(datacy.constructor.constructorСontent).trigger("drop");
    cy.get(datacy.constructor.contentBunTop).should("exist");
    cy.get(datacy.constructor.contentBunBottom).should("exist");

    cy.get(datacy.ingredients.ingredientItem + ":eq(2)").trigger("dragstart");
    cy.get(datacy.constructor.constructorСontent).trigger("drop");
    cy.get(datacy.constructor.contentMain).should("not.be.empty");

    cy.get(datacy.constructor.buttonOrder).should("not.have.attr", "disabled");
    cy.get(datacy.constructor.buttonOrder).click();

    cy.get(datacy.modal.modal).should("exist");
    cy.get(datacy.modal.orderNumber, { timeout: 20000 }).should("be.visible");
    cy.get(datacy.modal.modalClose, { timeout: 25000 }).click();
  });
});
