const waitFor = (seconds) => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, seconds * 1000);
});


const getTextOfElement = async ({page, query}) => {
  if (!page || !query) {
    console.error('no page or query when searching for', {query, page});
    return undefined;
  }

  const el = await page.locator(query);
  const texts = await el.allInnerTexts();
  const text = texts[0];

  return text;
};

const searchAndRepeat = async ({page, queryToFind, repeatedAction, countLimit}) => {
  await repeatedAction();

  let searchResult = await page.locator(queryToFind);
  let searchResultCount = await searchResult.count();

  let count = 0;
  while (searchResultCount === 0 && (countLimit ? count !== countLimit : true)) {
    count = count + 1;
    await repeatedAction();

    searchResult = await page.locator(queryToFind);
    searchResultCount = await searchResult.count();

    await waitFor(1);
  }

  return;
};

module.exports = {
  getTextOfElement,
  searchAndRepeat,
};
