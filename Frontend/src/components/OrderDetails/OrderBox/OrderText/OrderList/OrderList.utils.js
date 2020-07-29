const isSamePerson = (person, purchaser) => purchaser === person

export const recognizeUser = (personId, loggedUserId, purchaserId, person) => {
  if (isSamePerson(personId, purchaserId)) {
    return person + ' (Założyciel)'
  } else if (isSamePerson(personId, loggedUserId)) {
    return person + ' (Ty)'
  } else {
    return person
  }
}
