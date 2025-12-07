const dummy = (blogs) => 1;

const totalLikes = (blogs) =>
  blogs.length ? blogs.reduce((b, blog) => b + blog.likes, 0) : null;

const favoriteBlog = (blogs) =>
  blogs.length ? blogs.reduce((a, b) => (a.likes > b.likes ? a : b)) : null;

const mostBlogs = (blogs) => {
  if (!blogs.length) return null;
  const counts = blogs.reduce(
    (acc, { author }) => ((acc[author] = (acc[author] || 0) + 1), acc),
    {}
  );
  const topAuthor = Object.entries(counts).reduce((a, b) =>
    a[1] > b[1] ? a : b
  );
  return { author: topAuthor[0], blogs: topAuthor[1] };
};

const mostLikes = (blogs) => {
  if (!blogs.length) return null;
  const counts = blogs.reduce(
    (acc, { author, likes }) => (
      (acc[author] = (acc[author] || 0) + likes), acc
    ),
    {}
  );
  const topAuthor = Object.entries(counts).reduce((a, b) =>
    a[1] > b[1] ? a : b
  );
  return { author: topAuthor[0], likes: topAuthor[1] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
