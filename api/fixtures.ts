import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Post from "./models/Post";
import Comment from "./models/Comment";
import crypto from "crypto";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('posts');
    await db.dropCollection('comments');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [Vasya, Artem, David] = await User.create({
    username: 'Vasilii',
    displayName: 'Vasya',
    password: '12345',
    token: crypto.randomUUID()
  }, {
    username: 'artem1984@gmail.com',
    displayName: 'Artem',
    password: 'asfqwfds111',
    token: crypto.randomUUID()
  }, {
    username: 'David123',
    displayName: 'David',
    password: 'a@123456',
    token: crypto.randomUUID()
  });

  const [Spiderman, Marathon] = await Post.create({
    title: "I can't believe I just witnessed this on the subway",
    description: `Hey everyone, I just had to share this crazy story that happened to me on the subway today. I was sitting in my seat, minding my own business,
     when suddenly a man dressed in a full Spiderman costume jumped onto the train car.
      At first, I thought it was just some weirdo trying to get attention, but then he started climbing up the poles and doing flips and somersaults in the middle 
      of the train. People were laughing and taking pictures, but I couldn't help but feel a little uneasy about the whole thing.
      Just when I thought things couldn't get any weirder, Spiderman suddenly jumped off the poles and landed on his feet right in front of me. He looked me straight
       in the eye and said, "You have great power within you. Use it wisely."
      Then he jumped off the train and disappeared into the crowd. I still can't believe what I just witnessed. Has anyone else ever had a bizarre encounter like
      this on public transportation?`,
    image: 'fixtures/spiderman.png',
    user: Vasya._id,
    datetime: new Date()
  }, {
    title: 'I just finished a marathon for the first time!',
    description: `Hey Reddit, I just had to share my excitement with you all. I just finished a marathon for the first time and it was such an amazing experience.
     I've been training for months and it was so rewarding to finally cross that finish line.The atmosphere was electric and there were so many people cheering us on. I felt like I could conquer the world.
     I'm already planning my next marathon and I can't wait to do it all over againTo anyone who's thinking about running a marathon, I highly recommend it. It's not easy, but the feeling of accomplishment is like nothing 
     else. Have you ever run a marathon? Share your experiences in the comments!`,
    image: null,
    user: Artem._id,
    datetime: new Date()
  });

  await Comment.create({
    user: David._id,
    post: Spiderman._id,
    text: 'Every day is like this, lol'
  }, {
    user: Artem._id,
    post: Spiderman._id,
    text: 'Wow!'
  }, {
    user: David._id,
    post: Spiderman._id,
    text: 'Of course it is lying'
  }, {
    user: Vasya._id,
    post: Spiderman._id,
    text: 'It is true!'
  }, {
    user: David._id,
    post: Marathon._id,
    text: 'I also finished marathon in 1995, in was cool!'
  }, {
    user: Vasya._id,
    post: Marathon._id,
    text: 'You are cool, man'
  }, {
    user: Vasya._id,
    post: Marathon._id,
    text: "I'm too lazy to run a marathon, lol"
  });

  await db.close();
};

run().catch(console.error);