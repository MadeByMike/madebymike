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
      background: "#c9f3e0",
      background50: "#f2fcf8",
      text: "#333",
      highlight: "#555",
    },
    secondary: {
      background: "white",
      text: "#244e3b",
      highlight: "#244e3b",
    },
    mute: {
      background: "#fbfbfb",
      text: "#555",
      highlight: "#244e3b",
    },
  },
  keystone: {
    comments: false,
    bookmarks: false,
    claps: true,
    login: false,
  },
  criticalCSS: process.env.NODE_ENV === "production",
};
