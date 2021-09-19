import Mongoose from 'mongoose';

const orderSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  transactionId: {
    type: Number,
    required: false,
  },
  couponId: {
    type: Number,
    required: false,
  },
  status: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const OrderModel = Mongoose.model('Order', orderSchema);

export default OrderModel;
