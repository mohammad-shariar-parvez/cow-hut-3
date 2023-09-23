'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const cors_1 = __importDefault(require('cors'))
const app = (0, express_1.default)()
const routes_1 = __importDefault(require('./app/routes'))
const globalErrorHandler_1 = __importDefault(
  require('./app/middleware/globalErrorHandler')
)
const notFoundHandler_1 = __importDefault(
  require('./app/middleware/notFoundHandler')
)
/* cors */
app.use((0, cors_1.default)())
/* parser */
app.use(express_1.default.json())
app.use(express_1.default.urlencoded({ extended: true }))
/* application route */
app.use('/api/v1', routes_1.default)
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(globalErrorHandler_1.default)
/* handle not found */
app.use(notFoundHandler_1.default)
exports.default = app
