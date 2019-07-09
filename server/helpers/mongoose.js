module.exports = {
  normalizeErrors: function(errors) {
    let normalizedErrors = [];
    const entries = Object.entries(errors);
    for (const [key, value] of entries) {
      normalizedErrors.push({ title: key, detail: value.message });
    }
    return normalizedErrors;
  }
};
