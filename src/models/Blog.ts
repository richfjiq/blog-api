import mongoose, { Schema, model } from 'mongoose';

import type { IBlog } from '../interfaces/blog';

const blogSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		image_url: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

const Blog: mongoose.Model<IBlog> = mongoose.models.Blog ?? model('Blog', blogSchema);

export default Blog;
