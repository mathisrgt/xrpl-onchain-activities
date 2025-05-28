import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ['qcm', 'onchain', 'lesson', 'document'], required: true },
    relatedContents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }],
    data: {
        type: [new mongoose.Schema({
          type: { type: String, enum: ['title', 'body', 'link', 'code'], required: true },
          value: { type: String, required: true }
        }, { _id: false })]
      }      
}, { timestamps: true })

contentSchema.index({ title: 1 });

export default mongoose.model('Content', contentSchema);