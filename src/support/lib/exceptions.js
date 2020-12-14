/**
 * Exception if method is not implemented on the page
 * @param {string} pageMethodName - page method name
 * @param {Object} pageObj - page object
 */
export function NoSuchMethodOnThePageException(pageMethodName, pageObj) {
    this.pageMethodName = pageMethodName;
    this.pageObj = pageObj.constructor.name;
    this.message = ' method is not implemented on the page ';
    this.toString = function () {
        return this.pageMethodName + this.message + this.pageObj;
    };
}

NoSuchMethodOnThePageException.prototype = Error.prototype;

/**
 * Exception if page not found
 * @param {Object} pageObj - page object
 */
export function NoSuchPageException(pageObj) {
    this.pageObj = pageObj;
    this.message = 'No such page: ';
    this.help = ' Check page name and /src/constants/pages.js file';
    this.toString = function () {
        return this.message + this.pageObj + this.help;
    };
}

NoSuchPageException.prototype = Error.prototype;
