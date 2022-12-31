const FIREBASE_DOMAIN = 'https://react-movies-b2487-default-rtdb.europe-west1.firebasedatabase.app';

export async function getAllQuotes() {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`);

  if (!response.ok) {
    throw new Error('Could not fetch quotes.');
  }

  const data = await response.json();

  if (!data) {
    return null;
  }

  return Object.keys(data).map((key) => ({
    id: key,
    ...data[key],
  }));
}

export async function getSingleQuote(quoteId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${quoteId}.json`);

  if (!response.ok) {
    throw new Error('Could not fetch quote.');
  }

  const data = await response.json();

  if (!data) {
    return null;
  }

  return {
    id: quoteId,
    ...data,
  };
}

export async function addQuote(quoteData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
    method: 'POST',
    body: JSON.stringify(quoteData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Could not create quote.');
  }

  return null;
}

export async function addComment(requestData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/comments/${requestData.quoteId}.json`,
    {
      method: 'POST',
      body: JSON.stringify(requestData.commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Could not add comment.');
  }

  const data = await response.json();

  if (!data) {
    return null;
  }

  return { commentId: data.name };
}

export async function getAllComments(quoteId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`);

  if (!response.ok) {
    throw new Error('Could not get comments.');
  }

  const data = await response.json();

  if (!data) {
    return null;
  }

  return Object.keys(data).map((key) => ({
    id: key,
    text: data[key],
  }));
}
