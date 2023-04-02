export const getHome = async (req, res) => {
  return res.render("home", { pageTitle: "Home" });
};

export const postHome = async (req, res, next) => {
  const { keyword } = req.body;
  console.log(`SEARCH KEYWORD: ${keyword}`);

  const https = require("https");
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&type=video&key=${process.env.YOUTUBE_API_KEY}`;
  https
    .get(url, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const result = JSON.parse(data);
          console.log(result.items);
        } catch (error) {
          console.error(error);
        }
      });
    })
    .on("error", (error) => {
      console.error(error);
    });
  return res.render("home", { searchKeyword: keyword });
};
