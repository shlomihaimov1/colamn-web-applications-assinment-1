import { Express } from "express";
import request from "supertest";

// DB Connectivity
import mongoose from "mongoose";
import { initApp } from "../src/app";

// Schemas and Models
import { User } from "../src/models/user";
import { IUser } from "../src/types/models";
import { Post } from "../src/models/post";
import { Comment } from "../src/models/comment";
import testComments from "./comments_testing.json";

var app: Express;

type User = IUser & {
  accessToken?: string,
  refreshToken?: string
};

const testUser: User = {
  username: "test",
  email: "test@user.com",
  password: "testpassword",
}

let postId = ""

beforeAll(async () => {
  console.log("beforeAll");
  app = await initApp();
  
  // Delete existing data
  await Comment.deleteMany();
  await Post.deleteMany();
  await User.deleteMany();

  // Login
  await request(app).post("/auth/register").send(testUser);
  const res = await request(app).post("/auth/login").send(testUser);
  testUser.accessToken = res.body.accessToken;
  testUser.refreshToken = res.body.refreshToken;
  testUser._id = res.body._id;
  expect(testUser.accessToken).toBeDefined();
  expect(testUser.refreshToken).toBeDefined();


  const response = await request(app).post("/posts")
    .set({ 
      "Authorization": "Bearer " + testUser.accessToken,
      "x-refresh-token": testUser.refreshToken
    })
    .send({
      title: "Test Post",
      content: "Test Content"
    });
  expect(response.statusCode).toBe(200);
  postId = response.body._id;
});

afterAll((done) => {
  console.log("afterAll");
  mongoose.connection.close();
  done();
});

let commentId = "";

describe("Comments Tests", () => {
  test("Comments test post by id", async () => {
    const response = await request(app).get("/comments/" + postId)
    .set({ 
      "Authorization": "Bearer " + testUser.accessToken,
      "x-refresh-token": testUser.refreshToken
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });

  test("Test Create Comment", async () => {
    const response = await request(app).post("/comments")
    .set({ 
      "Authorization": "Bearer " + testUser.accessToken,
      "x-refresh-token": testUser.refreshToken
    })
    .send( {
      "content": testComments.comments[0].content,
      "postId": postId
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.content).toBe(testComments.comments[0].content);
    expect(response.body.postId).toBe(postId);
    commentId = response.body._id;
  });

  test("Comments update", async () => {
    const response = await request(app).put("/comments/" + commentId)
    .set({ 
      "Authorization": "Bearer " + testUser.accessToken,
      "x-refresh-token": testUser.refreshToken
    }).send({"content": testComments.comments[1].content});
    expect(response.statusCode).toBe(200);
    expect(response.body.content).toBe(testComments.comments[1].content);
  });

  test("Comments delete", async () => {
    // Delete comment
    const response = await request(app).delete("/comments/" + commentId)
    .set({ 
      "Authorization": "Bearer " + testUser.accessToken,
      "x-refresh-token": testUser.refreshToken
    });
    expect(response.statusCode).toBe(200);
  });

});