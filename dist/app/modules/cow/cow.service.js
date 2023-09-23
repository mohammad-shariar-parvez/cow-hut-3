'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {}
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p]
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]]
      }
    return t
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.CowService = void 0
const http_status_1 = __importDefault(require('http-status'))
const ApiError_1 = __importDefault(require('../../../errors/ApiError'))
const cow_model_1 = require('./cow.model')
const cow_constants_1 = require('./cow.constants')
const paginationHelpers_1 = require('../../../helpers/paginationHelpers')
const createCow = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.create(payload)
    if (!result) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Failed to create cow'
      )
    }
    return result
  })
const getAllCows = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters,
      filtersData = __rest(filters, ['searchTerm'])
    const andConditions = []
    if (searchTerm) {
      andConditions.push({
        $or: cow_constants_1.CowSearchAbleFields.map(field => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      })
    }
    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => {
          if (field === 'minPrice') {
            return {
              price: { $gte: parseInt(value) },
            }
          }
          if (field === 'maxPrice') {
            return {
              price: { $lte: parseInt(value) },
            }
          }
          return {
            [field]: value,
          }
        }),
      })
    }
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers_1.paginationHelper.calculatePagination(
        paginationOptions
      )
    const sortCondition = {}
    if (sortBy && sortOrder) {
      sortCondition[sortBy] = sortOrder
    }
    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {}
    const result = yield cow_model_1.Cow.find(whereConditions)
      .populate('seller')
      .sort(sortCondition)
      .skip(skip)
      .limit(limit)
    const total = yield cow_model_1.Cow.countDocuments(whereConditions)
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    }
  })
const getSingleCow = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findById(id)
    if (!result) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Cow not found!'
      )
    }
    return result
  })
const updateCow = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield cow_model_1.Cow.findById(id)
    if (!isExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Cow not found!'
      )
    }
    const result = yield cow_model_1.Cow.findByIdAndUpdate(id, payload, {
      new: true, // return new document of the DB
    })
    return result
  })
const deleteCow = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findByIdAndDelete(id)
    if (!result) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Failed to delete Cow'
      )
    }
    return result
  })
exports.CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
}
