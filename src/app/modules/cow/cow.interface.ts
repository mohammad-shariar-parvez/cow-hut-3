import { Model, Types } from 'mongoose'
import { IUser } from '../user/user.interface'

export type ICow = {
  name: string
  age: number
  price: number
  location:
    | 'Dhaka'
    | 'Chattogram'
    | 'Barishal'
    | 'Rajshahi'
    | 'Sylhet'
    | 'Comilla'
    | 'Rangpur'
    | 'Mymensingh'
  breed:
    | 'Brahman'
    | 'Nellore'
    | 'Sahiwal'
    | 'Gir'
    | 'Indigenous'
    | 'Tharparkar'
    | 'Kankrej'
  weight: number
  label: 'for sale' | 'sold out'
  category: 'Dairy' | 'Beef ' | 'DualPurpose'
  seller: Types.ObjectId | IUser
}

export type CowModel = Model<ICow, Record<string, unknown>>

export type ICowFilters = {
  searchTerm?: string
  minPrice?: number
  maxPrice?: number
  location?: string
}
