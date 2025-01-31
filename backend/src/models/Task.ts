import { Schema, model, Document } from 'mongoose';

interface ITask extends Document {
  title: string;
  description: string;
  status: string;
  createdAt: Date;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'pending' }, // pending, completed
  createdAt: { type: Date, default: Date.now },
});

export default model<ITask>('Task', TaskSchema);