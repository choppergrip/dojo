import { Given, When, Then } from 'cucumber';
import openWebsite from '../support/action/openWebsite';
import pageByName from '../support/lib/pageByName';
import pageMethodByName from '../support/lib/pageMethodByName';

Given(/^I open the (url|site) "([^"]*)?"$/,
    openWebsite);

When(/^I enter "([^"]*)" into ([^"]*) field on "([^"]*)" page$/, (text, fieldName, pageName) => {
    const page = pageByName(pageName);
    const enterText = pageMethodByName({ prefix: 'enter', elementName: fieldName, page });
    page[enterText](text);
});

When(/^I click "([^"]*)" (Link|Button|Field) on "([^"]*)" page$/, (elementName, elementType, pageName) => {
    const page = pageByName(pageName);
    const clickElement = pageMethodByName({
        prefix: 'click', elementName, postfix: elementType, page,
    });
    page[clickElement]();
});

Then(/^I verify "([^"]*)" page$/, (pageName) => {
    const page = pageByName(pageName);
    page.verifyPage();
});

Then(/^I verify "([^"]*)" button (is active|is not active) on "([^"]*)" page$/, (buttonName, buttonState, pageName) => {
    const page = pageByName(pageName);
    const isButtonActive = pageMethodByName({
        prefix: 'button', elementName: buttonName, postfix: 'IsActive', page,
    });

    const expectedResult = buttonState === 'is active';

    expect(page[isButtonActive]()).toBe(expectedResult);
});

Then(/^I verify no error message on "([^"]*)" page$/, (pageName) => {
    const page = pageByName(pageName);
    page.verifyNoErrorMessage();
});

Then(/^I verify password (is hidden|is shown) on "([^"]*)" page$/, (passwordState, pageName) => {
    const page = pageByName(pageName);
    const expectedResult = passwordState === 'is hidden';

    expect(page.isPasswordHidden()).toBe(expectedResult);
});

Then(/^I verify text "([^"]*)" in ([^"]*) field on "([^"]*)" page$/, (text, fieldName, pageName) => {
    const page = pageByName(pageName);
    const verifyText = pageMethodByName({
        prefix: 'verifyTextIn', elementName: fieldName, postfix: 'Field', page,
    });
    page[verifyText](text);
});

Then(/^I verify ([^"]*) ([^"]*) error on "([^"]*)" page$/, (error, fieldName, pageName) => {
    const page = pageByName(pageName);
    const verifyError = pageMethodByName({
        prefix: 'verify', elementName: fieldName, postfix: 'Error', page,
    });
    page[verifyError](error);
});
