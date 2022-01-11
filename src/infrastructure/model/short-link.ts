import { ShortUrlFields } from "@domain/entities/short-url"
import mongoose from "mongoose"
import { nanoid } from "nanoid"

interface ShortLinkAttrs extends Omit<ShortUrlFields, "id"> {
    _id: string;
}

export interface ShortLinkDoc extends ShortLinkAttrs, mongoose.Document {
    _id: string;
}

interface ShortLinkModel extends mongoose.Model<ShortLinkDoc> {
  build(attrs: ShortLinkAttrs): ShortLinkDoc
}

const shortLinkSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(10),
    },
    originalUrl: {
      type: String,
      required: true,
    },
    customAlias: {
      type: String,
    },
    expireDate: {
      type: Number,
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        const id = ret._id
        delete ret._id
      },
    },
  }
)

shortLinkSchema.statics.build = (attrs: ShortLinkAttrs) => {
    return new ShortLink(attrs);
}

const ShortLink = mongoose.model<ShortLinkDoc, ShortLinkModel>("ShortLink", shortLinkSchema);


export { ShortLink };
