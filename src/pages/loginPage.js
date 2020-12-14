import Page from './page';
import lexemes from '../lexemes/loginLexemes';
import currentPlatform from '../support/lib/currentPlatform';
import { platform } from '../constants/platform';
import { EmailAddressError, PasswordError } from '../lexemes/fieldErrorsLexemes';

class LoginPage extends Page {
    get logo() { return $('.logo'); }

    get emailFieldLabel() { return $('#login'); }

    get emailField() { return $('input#login-field'); }

    get passwordFieldLabel() { return $('#password'); }

    get passwordField() { return $('input#password-field'); }

    get showPasswordIcon() { return $('.material-icons'); }

    get logInButton() { return $('#loginButton'); }

    get forgotPasswordLink() { return $('a[href=\'https://passwords.dojo.tech/email-password-reset-link\']'); }

    get mobileAppLabel() { return $('.download-app'); }

    get appStoreLink() { return $('a[href=\'https://apps.apple.com/gb/app/paymentsense-boost/id1500585319\']'); }

    get appStoreImage() { return $('[src=\'assets/images/apple-download-badge.svg\']'); }

    get googlePlayLink() { return $('a[href=\'https://play.google.com/store/apps/details?id=uk.co.paymentsense.superpay\']'); }

    get googlePlayImage() { return $('[src=\'assets/images/google-play-badge.png\']'); }

    get inputFormatError() { return $('<mdc-helper-text />'); }

    isPasswordHidden() {
        return this.passwordField.getAttribute('type') === 'password';
    }

    clickShowPasswordButton() {
        this.showPasswordIcon.click();
    }

    buttonLogInIsActive() {
        return this.logInButton.isEnabled();
    }

    enterEmail(email) {
        this.emailField.setValue(email);
    }

    enterPassword(password) {
        this.passwordField.setValue(password);
    }

    clickLogInButton() {
        this.logInButton.click();
    }

    clickEmailField() {
        this.emailField.click();
    }

    clickPasswordField() {
        this.passwordField.click();
    }

    verifyNoErrorMessage() {
        expect($(`//*[contains(text(), "${EmailAddressError.EmailIsRequired}")]`)).not.toBeDisplayed();
        expect($(`//*[contains(text(), "${EmailAddressError.EmailWrongFormat}")]`)).not.toBeDisplayed();
        expect($(`//*[contains(text(), "${EmailAddressError.EmailIsInvalid}")]`)).not.toBeDisplayed();

        expect($(`//*[contains(text(), "${PasswordError.PasswordRequired}")]`)).not.toBeDisplayed();
    }

    verifyTextInEmailField(text) {
        expect(this.emailField).toHaveValue(text);
    }

    verifyTextInPasswordField(text) {
        expect(this.passwordField).toHaveValue(text);
    }

    verifyEmailError(error) {
        switch (error) {
            case 'EmailWrongFormat':
                expect(this.inputFormatError.getText()).toBe(EmailAddressError.EmailWrongFormat);
                break;
            case 'EmailIsRequired':
                expect(this.inputFormatError.getText()).toBe(EmailAddressError.EmailIsRequired);
                break;
            case 'EmailIsInvalid':
                expect(this.inputFormatError.getText()).toBe(EmailAddressError.EmailIsInvalid);
                break;
            default:
                throw 'Unsupported error message';
        }
    }

    verifyPasswordError(error) {
        switch (error) {
            case 'PasswordIsRequired':
                expect($(`//*[contains(., "${PasswordError.PasswordRequired}")]`)).toBeDisplayed();
                break;
            default:
                throw 'Unsupported error message';
        }
    }

    verifyPage() {
        this.logo.waitForDisplayed();
        this.emailField.waitForDisplayed();
        this.passwordField.waitForDisplayed();
        this.showPasswordIcon.waitForDisplayed();
        this.logInButton.waitForDisplayed();
        this.forgotPasswordLink.waitForDisplayed();

        expect(browser).toHaveTitle(lexemes.PageTitle);
        expect(this.emailFieldLabel).toHaveText(lexemes.EmailAddress);
        expect(this.passwordFieldLabel).toHaveText(lexemes.Password);
        expect(this.logInButton).toHaveText(lexemes.LogInButton);
        expect(this.forgotPasswordLink).toHaveText(lexemes.ForgotPassword);

        if (currentPlatform() === platform.Desktop) {
            this.appStoreLink.waitForDisplayed();
            this.googlePlayLink.waitForDisplayed();
            this.googlePlayImage.waitForDisplayed();
            this.appStoreImage.waitForDisplayed();

            expect(this.mobileAppLabel).toHaveText(lexemes.GetApp);
        }
    }
}

export default new LoginPage();
