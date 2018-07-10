export const isPassed = (flag) => {
  if (!flag.type || !flag.dateStart) {
    return true;
  }

  const { dateEnd } = flag;
  if (!dateEnd) {
    return false;
  }

  const today = new Date();
  const flagEndDate = new Date(dateEnd);

  if (flagEndDate === 'Invalid Date') {
    return true;
  }

  return today > flagEndDate;
};

export const asDateString = (date) => {
  if (!date) {
    return 'N/A';
  }

  return `${date.getFullYear()}-${`00${date.getMonth() + 1}`.substr(-2)}-${`00${date.getDate()}`.substr(-2)}`;
};
