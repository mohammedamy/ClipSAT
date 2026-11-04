'use strict';

module.exports = function () {
  return {
    cdnBase: (process.env.CLIPSAT_CDN_BASE || '').replace(/\/+$/, ''),
  };
};
