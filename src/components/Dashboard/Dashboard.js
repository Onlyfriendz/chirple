import { Grid, Typography, Box } from "@mui/material";
import React, {useState} from 'react'
import { useEffect } from "react";
import { get3MostLikedPosts, getGeneralSentiments, getNumberSentiments, getTotal } from "../../chirple-api/analysis.js";
import { scrape } from "../../chirple-api/api.js";
import { timeAnalysis } from "../../chirple-api/time-analysis.js";
import { Card, Title, DonutChart } from '@tremor/react';
import '@tremor/react/dist/esm/tremor.css';
import "./Dashboard.css"

const DashBoard = (props) => {
    let[keywords, setKeywords] = useState("");
    let[search, setSearch] = useState("");
    let[totalData, setTotalData] = useState([]);
    let[tweets, setTweets] = useState([]);
    let[sentimentScore, setSentimentScore] = useState("");
    let[sentimentTweets, setSentimentTweets] = useState([]);
    let[timeGraph, setTimeGraph] = useState({});

    const handleChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setKeywords(search);
        const allTweets = await scrape(keywords);
        displayStats(allTweets);
    };

    const displayStats = (allTweets) => {
      console.log(allTweets);
        setTotalData(getTotal(allTweets));
        setTweets(get3MostLikedPosts(allTweets));
        setSentimentScore(getGeneralSentiments(allTweets));
        setSentimentTweets(getNumberSentiments(allTweets));
        setTimeGraph(timeAnalysis(allTweets));
    }

    const cities = [
      {
          name: 'Positive',
          sales: sentimentTweets[0],
      },
      {
          name: 'Negative',
          sales: sentimentTweets[1],
      },
      {
          name: 'Neutral',
          sales: sentimentTweets[2],
      },
  ];
  
  const valueFormatter = (number) => (
      `$ ${Intl.NumberFormat('us').format(number).toString()}`
  );



  return (
    <Grid container border={1} spacing={6} justifyContent="center" alignItems="center" padding={10}
      direction="column">
      <Box item lg={8} border={1}>
        <form onSubmit={handleSubmit}>
          <input
          id="keywordInput"
          type="search"
          placeholder="Enter keyword here"
          onChange={handleChange}
          value={search} />
        </form>
      </Box>

      <Box item width={500} border={1}>
        <Typography>{keywords}</Typography>
        <Card maxWidth="max-w-lg">
          <Title>Sales by City</Title>
          <DonutChart
              data={ cities }
              category="sales"
              dataKey="name"
              valueFormatter={ valueFormatter }
              marginTop="mt-6"
              colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
          />
        </Card>
      </Box>
    </Grid>
  );
};

export default DashBoard;