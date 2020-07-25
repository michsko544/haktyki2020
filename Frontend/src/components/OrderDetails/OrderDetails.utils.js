const isOrderCreator = (person, purchaser) => purchaser === person

export const recognizeCreator = (person, purchaser) =>
  isOrderCreator(person, purchaser) ? person + ' (Założyciel)' : person
