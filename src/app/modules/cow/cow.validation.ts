import { z } from 'zod'
import { breed, category, label, location } from './cow.constants'

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
    }),
    age: z.number({ required_error: 'age is required' }),
    price: z.number({ required_error: 'price is required' }),
    location: z.enum([...location] as [string, ...string[]], {
      required_error: 'location is required',
    }),
    breed: z.enum([...breed] as [string, ...string[]], {
      required_error: 'breed is required',
    }),
    weight: z.number({ required_error: 'weight is required' }),
    label: z.enum([...label] as [string, ...string[]], {
      required_error: 'label is required',
    }),
    category: z.enum([...category] as [string, ...string[]], {
      required_error: 'category is required',
    }),
    seller: z.string({
      required_error: 'seller is required',
    }),
  }),
})

const updateCowZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'name is required',
      })
      .optional(),
    age: z.number({ required_error: 'age is required' }).optional(),
    price: z.number({ required_error: 'price is required' }).optional(),
    location: z
      .enum([...location] as [string, ...string[]], {
        required_error: 'location is required',
      })
      .optional(),
    breed: z
      .enum([...breed] as [string, ...string[]], {
        required_error: 'breed is required',
      })
      .optional(),
    weight: z.number({ required_error: 'weight is required' }).optional(),
    label: z
      .enum([...label] as [string, ...string[]], {
        required_error: 'label is required',
      })
      .optional(),
    category: z
      .enum([...category] as [string, ...string[]], {
        required_error: 'category is required',
      })
      .optional(),
    seller: z
      .string({
        required_error: 'seller is required',
      })
      .optional(),
  }),
})
export const CowValidation = {
  createCowZodSchema,
  updateCowZodSchema,
}
