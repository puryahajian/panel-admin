const convertPriceToNumber = (price) => {
  if (!price || typeof price !== 'string') return null;
  const numericValue = price.replace(/[^0-9]/g, ''); // حذف تمام کاراکترهای غیرعددی
  const result = parseInt(numericValue, 10);
  return isNaN(result) ? null : result;
};

export default convertPriceToNumber;