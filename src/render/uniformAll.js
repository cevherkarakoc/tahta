const uniformAll = uniformList => {
  uniformList.forEach(uniform => uniform.fn(uniform.value, uniform.location));
};

module.exports = uniformAll;
