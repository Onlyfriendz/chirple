import { Grid, Typography, Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import React, { useState } from "react";
import {
  get3MostLikedPosts,
  getNumberSentiments,
  getTotal,
} from "../../chirple-api/analysis.mjs";
import { scrape } from "../../chirple-api/api.mjs";
import { timeAnalysis } from "../../chirple-api/time-analysis.mjs";
import {
  Card,
  Title,
  DonutChart,
  Metric,
  Text,
  LineChart,
} from "@tremor/react";
import "@tremor/react/dist/esm/tremor.css";
import "./Dashboard.css";
import { TwitterTweetEmbed } from "react-twitter-embed";

const DashBoard = (props) => {
  let [loading, setLoading] = useState(false);
  let [search, setSearch] = useState("");
  let [totalData, setTotalData] = useState([]);
  let [tweets, setTweets] = useState([]);
  let [sentimentTweets, setSentimentTweets] = useState([]);
  let [timeGraph, setTimeGraph] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const allTweets = await scrape(search);
      displayStats(allTweets);
      if (allTweets) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      alert("Error: Server not responsive.\nPlease try again later.");
    }
  };

  const displayStats = (allTweets) => {
    setTotalData(getTotal(allTweets));
    setTweets(get3MostLikedPosts(allTweets));
    setSentimentTweets(getNumberSentiments(allTweets));
    setTimeGraph(timeAnalysis(allTweets));
  };

  const sentiTweets = [
    {
      name: "Positive",
      sales: sentimentTweets[0],
    },
    {
      name: "Negative",
      sales: sentimentTweets[1],
    },
    {
      name: "Neutral",
      sales: sentimentTweets[2],
    },
  ];

  const valueFormatter = (number) =>
    ` ${Intl.NumberFormat("us").format(number).toString()}`;

  const dataFormatter = (number) =>
    `${Intl.NumberFormat("us").format(number).toString()}`;

  return (
    <Grid
      container
      spacing={6}
      justifyContent="center"
      alignItems="center"
      padding={10}
      direction="column"
      sx={{ mb: "7em" }}
    >
      <Box item lg={8}>
        <form onSubmit={handleSubmit}>
          <input
            id="keywordInput"
            type="search"
            placeholder="Enter keyword here"
            onChange={handleChange}
            value={search}
          />
        </form>
      </Box>

      {loading ? (
        <Grid container item justifyContent="center" width={1200}>
          <Typography variant="h3" padding={5} sx={{ fontSize: 30 }}>
            기다리세요. This may take up to 5mins ...
          </Typography>
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <LinearProgress color="primary" />
          </Stack>
        </Grid>
      ) : (
        <>
          <Grid container item width={1200} direction="row">
            <Grid item xs={12} sm={4}>
              <Card
                maxWidth="max-w-xs"
                decoration="top"
                decorationColor="indigo"
              >
                <Text>Favorites</Text>
                <Metric>{totalData[0]}</Metric>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card
                maxWidth="max-w-xs"
                decoration="top"
                decorationColor="indigo"
              >
                <Text>ReTweets</Text>
                <Metric>{totalData[1]}</Metric>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card
                maxWidth="max-w-xs"
                decoration="top"
                decorationColor="indigo"
              >
                <Text>Quotes</Text>
                <Metric>{totalData[2]}</Metric>
              </Card>
            </Grid>
          </Grid>
          <Grid container item width={1200} direction="row" sx={{ mb: "50px" }}>
            <Grid item xs={12} sm={4}>
              <Card maxWidth="max-w-lg">
                <Title>Sentiment</Title>
                <DonutChart
                  data={sentiTweets}
                  category="sales"
                  dataKey="name"
                  valueFormatter={valueFormatter}
                  marginTop="mt-6"
                  colors={[
                    "indigo",
                    "violet",
                    "slate",
                    "rose",
                    "cyan",
                    "amber",
                  ]}
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Card>
                <Title>Number of Tweets</Title>
                <LineChart
                  data={timeGraph}
                  dataKey="time"
                  categories={["value"]}
                  colors={["blue"]}
                  valueFormatter={dataFormatter}
                  marginTop="mt-6"
                  yAxisWidth="w-10"
                />
              </Card>
            </Grid>
          </Grid>

          <Grid
            container
            item
            width={1200}
            direction="column"
            justifyContent="left"
          >
            <Typography
              variant="h3"
              sx={{
                color: "primary.main",
                fontWeight: "bold",
                fontSize: 40,
                mb: "20px",
              }}
            >
              Top 3 Tweets
            </Typography>
            <Grid
              container
              item
              width={1200}
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Grid width={300} sx={{ mr: "40px" }}>
                {/* <Typography>id: {tweets[0]}</Typography> */}
                <TwitterTweetEmbed tweetId={tweets[0]} />
              </Grid>
              <Grid width={300}>
                {/* <Typography>id: {tweets[1]}</Typography> */}
                <TwitterTweetEmbed tweetId={tweets[1]} />
              </Grid>
              <Grid width={300} sx={{ ml: "40px" }}>
                {/* <Typography>id: {tweets[2]}</Typography> */}
                <TwitterTweetEmbed tweetId={tweets[2]} />
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default DashBoard;
