import express from "express";

const app = express();
const port = 8092;

app.get("/getwebsite", async (req, res) => {
  if (!req.query.url) {
    return res.send("URL not provided");
  }
  let response
  try {
    response = await fetch(req.query.url, {
      mode: "cors",
      method: "GET",
    });
    if (!response.ok) {
      // throw new Error(`Error fetching website: ${response.statusText}`);
      console.error(`Error fetching website ${req.query.url}: ${response.statusText}`);
      return "";
    }
    res.send(await response.text());
  }
  catch (e) {
    console.error(e.message);
    res.send();
  }
})

app.listen(port);
