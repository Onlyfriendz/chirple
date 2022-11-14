import { Grid, Typography, Box, Button } from "@mui/material";
import React, {useState} from 'react'
import { get3MostLikedPosts, getGeneralSentiments, getNumberSentiments, getTotal } from "../../chirple-api/analysis.js";
import { scrape } from "../../chirple-api/api.js";
import { timeAnalysis } from "../../chirple-api/time-analysis.js";
import { Card, Title, DonutChart, Metric, Text, LineChart } from '@tremor/react';
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
          sales: 23,
      },
      {
          name: 'Negative',
          sales: 12,
      },
      {
          name: 'Neutral',
          sales: 5,
      },
  ];
  
  const valueFormatter = (number) => (
      `$ ${Intl.NumberFormat('us').format(number).toString()}`
  );

  const chartdata = [
    {
      year: 1951,
      "Population growth rate": 1.74,
    },
    {
      year: 1952,
      "Population growth rate": 1.93,
    },
    {
      year: 1953,
      "Population growth rate": 1.9,
    },
    {
      year: 1954,
      "Population growth rate": 1.98,
    },
    {
      year: 1955,
      "Population growth rate": 2,
    },
  ];
  
  const dataFormatter = (number) =>
    `${Intl.NumberFormat("us").format(number).toString()}%`;



  return (
    <Grid containery spacing={6} justifyContent="center" alignItems="center" padding={10}
      direction="column">
      <Box item lg={8} >
        <form onSubmit={handleSubmit}>
          <input
          id="keywordInput"
          type="search"
          placeholder="Enter keyword here"
          onChange={handleChange}
          value={search} />
        </form>
      </Box>

      <Grid container item width={1200} direction="row">
        <Grid item xs={12} sm={4} >
          <Card maxWidth="max-w-xs" decoration="top" decorationColor="indigo">
            <Text>Favorites</Text>
            <Metric>172</Metric>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} >
          <Card maxWidth="max-w-xs" decoration="top" decorationColor="indigo">
            <Text>ReTweets</Text>
            <Metric>34</Metric>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} >
          <Card maxWidth="max-w-xs" decoration="top" decorationColor="indigo">
            <Text>Quotes</Text>
            <Metric>23</Metric>
          </Card>
        </Grid>
      </Grid>

      <Grid container item width={1200} direction="row">
        <Grid item xs={12} sm={4} >
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
        </Grid>
        <Grid item xs={12} sm={8} >
          <Card>
            <Title>Population growth rate (1951 to 2021)</Title>
            <LineChart
              data={chartdata}
              dataKey="year"
              categories={["Population growth rate"]}
              colors={["blue"]}
              valueFormatter={dataFormatter}  
              marginTop="mt-6"         
              yAxisWidth="w-10"
            />
          </Card>
        </Grid>
      </Grid>

    </Grid>
  );
};

export default DashBoard;