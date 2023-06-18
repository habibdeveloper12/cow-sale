import { Schema, model } from 'mongoose';
import { CowsModal, ICows } from './cows.interface';
import { Breed, Category, Label } from './cows.enum';
const cowsSchema = new Schema<ICows>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, enum: Object.values(Location), required: true },
    breed: { type: String, enum: Object.values(Breed), required: true },
    weight: { type: Number, required: true },
    label: { type: String, enum: Object.values(Label), default: Label.ForSale },
    category: { type: String, enum: Object.values(Category), required: true },
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

// academicSemesterSchema.pre('save', async function (next) {
//   const isExist = await Cows.findOne({
//     title: this.title,
//     year: this.year,
//   });
//   if (isExist) {
//     throw new ApiError(
//       status.CONFLICT,
//       'There academic semester is already exist '
//     );
//   }
//   next();
// });
export const Cows = model<ICows, CowsModal>('Cows', cowsSchema);
//handling same year and same semester issue

//Data-same year and semester for that we can use prehook
