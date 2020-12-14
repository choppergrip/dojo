import Page from './page';
import lexemes from '../lexemes/resetPasswordLinkSentLexemes';

class ForgotPasswordPage extends Page {
    get logo() { return $('.dojo-logo'); }

    get title() { return $('h2'); }

    get subTitle() { return $('.info'); }

    get goToLoginLink() { return $('#backToLoginLink'); }

    clickGoToLoginLink() {
        this.goToLoginLink.click();
    }

    verifyPage() {
        this.logo.waitForDisplayed();
        this.title.waitForDisplayed();
        this.subTitle.waitForDisplayed();
        this.goToLoginLink.waitForDisplayed();

        expect(browser).toHaveTitle(lexemes.PageTitle);
        expect(this.title).toHaveText(lexemes.Title);
        expect(this.subTitle).toHaveText(lexemes.SubTitle);
        expect(this.goToLoginLink).toHaveText(lexemes.Link);
    }
}

export default new ForgotPasswordPage();
