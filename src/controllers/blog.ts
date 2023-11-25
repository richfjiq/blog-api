import type { Request, Response } from 'express';
import dotenv from 'dotenv';

import type { IBlog } from '../interfaces/blog';
import { db } from '../database';
import Blog from '../models/Blog';

dotenv.config();
const defaultImage = process.env.DEFAULT_IMAGE as string;

export const createBlog = async (req: Request, res: Response): Promise<void> => {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const { title, author, description, image_url } = req.body as IBlog;
	let image = '';

	if (image_url === '') {
		image = defaultImage;
	}

	try {
		await db.connect();
		const blog = new Blog({
			title,
			author,
			description,
			image_url: image,
		});
		await blog.save();
		await db.disconnect();
		res.status(201).json(blog);
	} catch (error) {
		await db.disconnect();
		// eslint-disable-next-line no-console
		console.log({ error });
		res.status(400).json({ message: 'Server error.' });
	}
};

export const getBlogs = async (req: Request, res: Response): Promise<void> => {
	try {
		await db.connect();
		const blogs = await Blog.find().select('title author description image_url createdAt');
		await db.disconnect();
		res.status(200).json(blogs);
	} catch (error) {
		await db.disconnect();
		res.status(404).json({ message: 'Server Error.' });
	}
};

export const getBlogById = async (req: Request, res: Response): Promise<void> => {
	const { blogId } = req.params;

	try {
		await db.connect();
		const blog = await Blog.findById(blogId).select('-__v -updatedAt');
		await db.disconnect();
		res.status(200).json(blog);
	} catch (error) {
		await db.disconnect();
		res.status(404).json({ message: 'Server Error.' });
	}
};
