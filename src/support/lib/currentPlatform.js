import { platform, minimalDesktopBrowserWidth } from '../../constants/platform';

export default () => {
    const currentBrowserWidth = browser.getWindowSize();
    return currentBrowserWidth > minimalDesktopBrowserWidth ? platform.Desktop : platform.Mobile;
};
