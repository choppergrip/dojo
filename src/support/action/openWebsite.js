import appUrls from '../../constants/urls';

/**
 * Open the given URL
 * @param  {String}   type Type of navigation (getUrl or site)
 * @param  {String}   page The URL to navigate to
 */
export default (type, page) => {
    /**
     * The URL to navigate to
     * @type {String}
     */

    const pageName = page.replace(/\s/g, '');
    const path = appUrls[pageName];

    const absoluteUrl = (type === 'url') ? path : browser.options.baseUrl + path;
    browser.url(absoluteUrl);
};
