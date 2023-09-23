'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const http_status_1 = __importDefault(require('http-status'))
const notFoundHandler = (req, res, next) => {
  res.status(http_status_1.default.NOT_FOUND).json({
    success: false,
    message: 'Not found !!',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'API is not found !!',
      },
    ],
  })
  next()
}
exports.default = notFoundHandler
