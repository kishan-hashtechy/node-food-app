const handlePaginate = (page, count, limit, data) => {
  const totalPages = Math.ceil(count / limit);
  return {
    totalPages,
    itemsPerPage: limit,
    currentPage: Number(page),
    data,
  };
};
module.exports = handlePaginate;
