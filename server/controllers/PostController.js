let Post = require('../models/Post');

class PostController {
    //POST api/posts
    // desc: create post
    //access: private
    async create(req, res) {
        let { title, description, url, status } = req.body;
        if (!title) {
            return res
                .status(400)
                .json({ success: false, message: "Title is require" })
        }
        try {
            const newPost = await Post.create({
                title,
                description,
                url: url.startsWith("https://") ? url : `https://${url}`,
                status: status || 'TO LEARN',
                user: req.userId
            });
            res.json({
                success: true,
                message: "Created Post",
                post: newPost,
            })
        }
        catch (err) {
            return res
                .status(500)
                .json({ success: false, message: 'err' })
        }
    }
    //GET api/posts
    // desc: get post
    //access: private
    async find(req, res) {
        try {
            const posts = await Post.find({ user: req.userId }).populate('user', ['username']);
            // console.log(posts)
            res.json({
                success: true,
                posts,
            })
        }
        catch (err) {
            return res
                .status(500)
                .json({ success: false, message: 'Internal server err' })
        }
    }

    //PUT api/posts/:id
    // desc: update post
    //access: private
    async update(req, res) {
        let { title, description, url, status } = req.body;
        let { id } = req.params;

        if (!title) {
            return res
                .status(400)
                .json({ success: false, message: "Title is require" })
        }
        try {
            let newPost = {
                title,
                description,
                url: url.startsWith("https://") ? url : `https://${url}`,
                status: status || 'TO LEARN',
            }
            // console.log({ ...newPost })
            newPost = await Post.findOneAndUpdate({ _id: id, user: req.userId },
                { ...newPost }, { new: true })

            if (!newPost) {
                return res
                    .status(401)
                    .json({ success: false, message: 'no found Post' })
            }

            res.json({
                success: true,
                message: "Updated Post",
                post: newPost,
            })
        }
        catch (err) {
            return res
                .status(500)
                .json({ success: false, message: 'err' })
        }
    }

    //DELETE api/posts/:id
    // desc: delete post
    //access: private

    async delete(req, res) {
        let { id } = req.params;
        try {
            let deletePost = await Post.findOneAndDelete({ _id: id, user: req.userId })

            if (!deletePost) {
                return res
                    .status(401)
                    .json({ success: false, message: 'no found Post' })
            }

            res.json({
                success: true,
                message: "Deleted Post",
                post: deletePost,
            })
        }
        catch (err) {
            return res
                .status(500)
                .json({ success: false, message: 'err' })
        }
    }
}

module.exports = new PostController();