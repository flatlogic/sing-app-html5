module.exports = {
  activeClass: function(firstValue, valuesString, options) {
    return valuesString.split(' ').indexOf(firstValue) !== -1 && options.fn(this);
  },
  
  // Other helpers goes here
};