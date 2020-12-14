Feature: User login

    As a user on the Dojo login page
    I can enter credentials
    Because I want to log into the Dojo app

    Background:

        Given I open the url "Login"
        Then  I verify "Login" page
        And   I verify "Log In" button is not active on "Login" page

    Scenario: Login as existing user with valid credentials
        When I enter "ninja@dojo.com" into Email field on "Login" page
        Then I verify text "ninja@dojo.com" in Email field on "Login" page
        And  I verify "Log In" button is not active on "Login" page
        When I enter "ninja" into Password field on "Login" page
        Then I verify "Log In" button is active on "Login" page
        And  I verify password is hidden on "Login" page
        When I click "Show Password" Button on "Login" page
        Then I verify password is shown on "Login" page
        And  I verify text "ninja" in Password field on "Login" page
        And  I verify no error message on "Login" page
        When I click "Log In" Button on "Login" page
        Then I verify "Dashboard" page

    Scenario Outline: User can't login with invalid email
        When I enter <email> into Email field on "Login" page
        And  I enter "ninja" into Password field on "Login" page
        Then I verify <error> Email error on "Login" page
        And  I verify "Log In" button is not active on "Login" page

    Examples:
        | email        | error            |
        | "dojo"       | EmailIsInvalid   |
        | "ninja@dojo" | EmailIsInvalid   |

    Scenario: User can't login with empty credentials
        When I click "Email" Field on "Login" page
        And  I click "Password" Field on "Login" page
        # INFO: to get password error we should unfocus password field
        And  I click "Email" Field on "Login" page
        Then I verify EmailIsRequired Email error on "Login" page
        And  I verify PasswordIsRequired Password error on "Login" page
        And  I verify "Log In" button is not active on "Login" page
