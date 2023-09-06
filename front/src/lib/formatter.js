// example - 10000 -> 10,000
const formatAmount = (value) => {
  if (value !== null && value !== undefined) {
    return value.toLocaleString();
  }
  return value;
};

const formatDate = (value) => {
  if (value !== null && value !== undefined) {
    return new Date(value).toLocaleDateString();
  }
  return value;
};

export { formatAmount, formatDate };
