const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('./utils/list_helper')
var _ = require('lodash')


describe("dummy tests", ()=> {

  test('dummy returns one', () => {
    const blogs = []
    
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})


describe("likes", ()=> {
  const testBlogs = [
    {
      _id:"1q2w3e4r5t6y",
      title:"Test for blog apps",
      author:"B. Virtanen",
      url:"www.bvirta.fi",
      likes:67,
      _v:0
    },
    {
      _id:"0o9i8u7y6t5",
      title:"Apps for blogs tests",
      author:"Millen Sapkowski",
      url:"www.websyte.to",
      likes:5,
      _v:0
    },
    {
      _id:"12o3i44y6t",
      title:"test blogs for blog test",
      author:"Touko Mäkinen",
      url:"www.net.net",
      likes:34,
      _v:0
    },
    {
      _id:"1pq02ow93ie8u4r7",
      title:"blog test for test blogs",
      author:"A.U Thor",
      url:"www.valhalla.nor",
      likes:123,
      _v:0
    }
  ]
  test("Total likes", ()=> {
    const result = listHelper.totalLikes(testBlogs)
    assert.strictEqual(result, 229)
  })
  
})


describe("popular", () => {
  const testBlogs = [
    {
      _id:"1q2w3e4r5t6y",
      title:"Test for blog apps",
      author:"B. Virtanen",
      url:"www.bvirta.fi",
      likes:67,
      _v:0
    },
    {
      _id:"0o9i8u7y6t5",
      title:"Apps for blogs tests",
      author:"Millen Sapkowski",
      url:"www.websyte.to",
      likes:5,
      _v:0
    },
    {
      _id:"12o3i44y6t",
      title:"test blogs for blog test",
      author:"Touko Mäkinen",
      url:"www.net.net",
      likes:34,
      _v:0
    },
    {
      _id:"1pq02ow93ie8u4r7",
      title:"blog test for test blogs",
      author:"A.U Thor",
      url:"www.valhalla.nor",
      likes:123,
      _v:0
    }
  ]
  test('most likes for blog post', () => {
    const result = listHelper.favoriteBlog(testBlogs)  
    assert.strictEqual(result.title, "blog test for test blogs")
  })
})


describe("blogs by author", () => {
    const testBlogs = [
    {
      _id:"1q2w3e4r5t6y",
      title:"Test for blog apps",
      author:"B. Virtanen",
      url:"www.bvirta.fi",
      likes:67,
      _v:0
    },
    {
      _id:"0o9i8u7y6t5",
      title:"Apps for blogs tests",
      author:"Millen Sapkowski",
      url:"www.websyte.to",
      likes:5,
      _v:0
    },
    {
      _id:"12o3i44y6t",
      title:"test blogs for blog test",
      author:"Touko Mäkinen",
      url:"www.net.net",
      likes:34,
      _v:0
    },
    {
      _id:"1pq02ow93ie8u4r7",
      title:"blog test for test blogs",
      author:"Touko Mäkinen",
      url:"www.valhalla.nor",
      likes:123,
      _v:0
    }
  ]

  test("most blog post by author", () => {
    const result = listHelper.mostBlogs(testBlogs)
    assert.deepStrictEqual(result, {author:"Touko Mäkinen", count:2})
  })
})