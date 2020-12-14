import Page from './page';
import lexemes from '../lexemes/forgotPasswordLexemes';
import { EmailAddressError } from '../lexemes/fieldErrorsLexemes';

class ForgotPasswordPage extends Page {
    get logo() { return $('.dojo-logo'); }

    get title() { return $('h2'); }

    get subTitle() { return $('.has-text-centered'); }

    get emailFieldLabel() { return $('.form-field-label'); }

    get emailField() { return $('#emailInput'); }

    get sendLinkButton() { return $('#emailPasswordResetLinkBtn'); }

    get emailInputFormatError() { return $('#emailInputFormatError'); }

    get emailInputRequiredError() { return $('#emailInputRequiredError'); }

    enterEmail(email) {
        this.emailField.waitForDisplayed({ timeout: 20000 });
        this.emailField.setValue(email);
        // INFO: to remove focus from field
        browser.keys(['\t']);
    }

    clickSendLinkButton() {
        this.sendLinkButton.click();
    }

    buttonSendLinkIsActive() {
        return this.sendLinkButton.isEnabled();
    }

    verifyTextInEmailField(text) {
        expect(this.emailField).toHaveValue(text);
    }

    verifyNoErrorMessage() {
        expect(this.emailInputFormatError).not.toBeDisplayed();
        expect(this.emailInputRequiredError).not.toBeDisplayed();

        expect($(`//*[contains(text(), "${EmailAddressError.EmailIsRequired}")]`)).not.toBeDisplayed();
        expect($(`//*[contains(text(), "${EmailAddressError.EmailWrongFormat}")]`)).not.toBeDisplayed();
    }

    verifyEmailError(error) {
        switch (error) {
            case 'EmailWrongFormat':
                expect(this.emailInputFormatError.getText()).toBe(EmailAddressError.EmailWrongFormat);
                break;
            case 'EmailIsRequired':
                expect(this.emailInputRequiredError.getText()).toBe(EmailAddressError.EmailIsRequired);
                break;
            default:
                throw 'Unsupported error message';
        }
    }

    verifyPage() {
        this.logo.waitForDisplayed();
        this.title.waitForDisplayed();
        this.subTitle.waitForDisplayed();
        this.emailFieldLabel.waitForDisplayed();
        this.emailField.waitForDisplayed();
        this.sendLinkButton.waitForDisplayed();

        expect(browser).toHaveTitle(lexemes.PageTitle);
        expect(this.title).toHaveText(lexemes.Title);
        expect(this.subTitle).toHaveText(lexemes.SubTitle);
        expect(this.emailFieldLabel).toHaveText(lexemes.EmailAddress);
        expect(this.sendLinkButton).toHaveText(lexemes.EmailMeButton);
    }
}

export default new ForgotPasswordPage();
