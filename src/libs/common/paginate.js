const handlePaginate = (page, count, limit, data) => {
  const totalPage = Math.ceil(count / limit);

  return {
    totalPage,
    itemsPerPage: limit,
    currentPage: Number(page),
    data,
  };
};

module.exports = handlePaginate;
