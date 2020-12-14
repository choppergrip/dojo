import pages from '../../constants/pages';
import { NoSuchPageException } from './exceptions';

export default (pageName) => {
    let pageObjectName = pageName.replace(/\s/g, '');
    pageObjectName = pageObjectName.endsWith('Page') ? pageObjectName : `${pageObjectName}Page`;

    const page = pages.get(pageObjectName);

    if (!page) {
        throw new NoSuchPageException(pageObjectName).toString();
    }

    return page;
};
