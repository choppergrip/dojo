Feature: Forgot password

    As a user on the Dojo forgot password page
    I can recover a lost password
    Because I want to log into the Dojo app

    Background:

        Given I open the url "Forgot Password"
        Then  I verify "Forgot Password" page
        And   I verify "Send Link" button is not active on "Forgot Password" page

    Scenario: Retrieving password for existing user
        When I enter "ninja@dojo.com" into Email field on "Forgot Password" page
        Then I verify text "ninja@dojo.com" in Email field on "Forgot Password" page
        And  I verify "Send Link" button is active on "Forgot Password" page
        And  I verify no error message on "Forgot Password" page
        When I click "Send Link" Button on "Forgot Password" page
        Then I verify "Reset Password Link Sent" page
        When I click "Go To Login" Link on "Reset Password Link Sent" page
        Then I verify "Login" page

    Scenario Outline: Retrieving password with invalid email
        When I enter <email> into Email field on "Forgot Password" page
        Then I verify <error> Email error on "Forgot Password" page
        And  I verify "Send Link" button is not active on "Forgot Password" page

        Examples:
        | email        | error            |
        | "dojo"       | EmailWrongFormat |
        | " "          | EmailIsRequired  |
        | "ninja@dojo" | EmailWrongFormat |