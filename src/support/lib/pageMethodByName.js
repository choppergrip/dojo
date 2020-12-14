import { NoSuchMethodOnThePageException } from './exceptions';

export default ({
    prefix = null, elementName, postfix = null, page,
}) => {
    // INFO: remove spaces from elements name
    const trimmedElementName = elementName.replace(/\s/g, '');
    let pageMethodName = prefix ? `${prefix}${trimmedElementName}` : trimmedElementName;
    pageMethodName = postfix ? `${pageMethodName}${postfix}` : pageMethodName;

    if (typeof page[pageMethodName] === 'function') {
        return pageMethodName;
    }

    throw new NoSuchMethodOnThePageException(pageMethodName, page).toString();
};
