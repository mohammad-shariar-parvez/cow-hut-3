import { ICow, ICowFilters } from './cow.interface'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { Cow } from './cow.model'
import { IGenericResponse } from '../../../interface/error'
import { IPaginationOptions } from '../../../interface/pagination'
import { CowSearchAbleFields } from './cow.constants'
import { paginationHelper } from '../../../helpers/paginationHelpers'
import { SortOrder } from 'mongoose'

const createCow = async (payload: ICow): Promise<ICow | null> => {
  const result = await Cow.create(payload)
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create cow')
  }
  return result
}

const getAllCows = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: CowSearchAbleFields.map(field => ({
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
            price: { $gte: parseInt(value as string) },
          }
        }
        if (field === 'maxPrice') {
          return {
            price: { $lte: parseInt(value as string) },
          }
        }
        return {
          [field]: value,
        }
      }),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions)

  const sortCondition: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Cow.find(whereConditions)
    .populate('seller')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await Cow.countDocuments(whereConditions)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id)

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found!')
  }
  return result
}

const updateCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const isExist = await Cow.findById(id)
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found!')
  }
  const result = await Cow.findByIdAndUpdate(id, payload, {
    new: true, // return new document of the DB
  })
  return result
}

const deleteCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete(id)
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete Cow')
  }

  return result
}

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
}
