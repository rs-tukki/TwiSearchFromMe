'use strict';

/**
 * Redirect with "from: your ID" parameter.
 */
const init: (() => void) = function() {
  const newUrl = new URL(location.href);
  if (newUrl.pathname !== '/search') {
    return;
  }

  const myId = getMyId();
  var query = newUrl.searchParams.get('q')?.toString();

  if (query?.includes('from:') || myId === '') {
    return;
  }

  query = query + ` from:${myId}`;
  newUrl.searchParams.set("q", query);
  location.href = newUrl.toString();
};

const getMyId = (): string => {
  const profileLink = document.querySelector('[data-testid="AppTabBar_Profile_Link"]');
  const myId = profileLink?.getAttribute('href')?.substring(1);
  return myId ? myId : '';
};

const mutationObserver = new MutationObserver(init)
const config = {
  childList: true,
  subtree: true
}
mutationObserver.observe(document, config)