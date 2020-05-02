module.exports = {
  name: "MadeByMike",
  shortDesc: "I think stuff and sometimes I write it down.",
  url: "",
  authorEmail: "mike@madebymike.com.au",
  authorHandle: "@MikeRiethmuller",
  authorName: "Mike",
  postsPerPage: 4,
  socialImage: "/img/mug/mike.jpg",
  theme: {
    primary: {
      background: "white",
      text: "black",
      highlight: "#666",
    },
    secondary: {
      background: "black",
      text: "white",
      highlight: "#666",
    },
  },
  keystone: {
    comments: true,
    bookmarks: true,
    claps: true,
    login: false,
  },
  criticalCSS: true, //process.env.NODE_ENV === "production"
};
