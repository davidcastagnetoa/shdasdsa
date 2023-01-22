import Post from "../models/Post.js";
import User from "../models/User.js";

// CREATE
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;

    // find and grab the user
    const user = await User.findById(userId);

    // create new post of user
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {
        // "someId": true,
      },
      commets: [],
    });

    // save schemma
    await newPost.save();

    //Find and grab the post
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// READ

export const getFeedPost = async (req, res) => {
  try {
    //Find and grab the post
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getUserPost = async (req, res) => {
  try {
    const { userId } = req.params;
    //Find and grab the post
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// UPDATE
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLike = post.likes.get(userId);

    // Delete the like if it's already exists, set if it's doesn't exists
    if (isLike) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
