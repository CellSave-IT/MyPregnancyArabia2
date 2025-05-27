import { Schema, model } from 'mongoose'
import { TestimonialInterface } from '../interfaces'

const schema = new Schema<TestimonialInterface.ITestimonialDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
  },
  {
    timestamps: true,
  }
)

const TestimonialModel = model<TestimonialInterface.ITestimonialDocument>('Testimonials', schema)

export default TestimonialModel
