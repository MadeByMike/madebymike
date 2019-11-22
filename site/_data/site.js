module.exports = {
  name: "MadeByMike",
  shortDesc: "I think stuff and sometimes I write it down.",
  url: "",
  authorEmail: "mike@madebymike.com.au",
  authorHandle: "@MikeRiethmuller",
  authorName: "Mike",
  postsPerPage: 4,
  theme: {
    background: "black",
    text: "white"
  },
  keystone: {
    comments: true,
    bookmarks: true,
    claps: true,
    login: false
  },
  criticalCSS: Boolean(process.env.NODE_ENV === 'production' ),
};
