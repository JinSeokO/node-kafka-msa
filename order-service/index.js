import mongoose from 'mongoose';
import OrderModel from './model/orderModel.js';

const run = async () => {
  await mongoose.connect('mongodb://root:tsdafiaf!!@localhost:27017', { dbName: 'kafka' });
  const order = new OrderModel({ name: 'test2', status: 'pending' });
  await order.save();
  console.log(order);
  const orders = await OrderModel.find();
  console.log(orders);
};

run().catch(console.error);
