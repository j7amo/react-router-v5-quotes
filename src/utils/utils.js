function sortQuotes(quotes, isAscending) {
  if (isAscending) {
    return quotes.sort((quoteA, quoteB) => (quoteA.text > quoteB.text ? 1 : -1));
  }

  return quotes.sort((quoteA, quoteB) => (quoteA.text < quoteB.text ? 1 : -1));
}

export default sortQuotes;
