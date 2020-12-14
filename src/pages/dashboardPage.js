import Page from './page';

class DashboardPage extends Page {
    verifyPage() {
        expect(browser).toHaveTitle('Dashboard');
    }
}

export default new DashboardPage();
