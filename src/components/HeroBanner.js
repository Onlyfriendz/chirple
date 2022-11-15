import { Grid, Typography } from "@mui/material";

const HeroBanner = (props) => {

  return (
    <Grid container spacing={6} justifyContent="center" alignItems="center" sx={{ mt: "7em", paddingLeft: "10em", paddingRight: "10em" }} padding={10}>
      <Grid item lg={8} sx={{ mr: "2em"}}>
        <Typography
          variant="h3"
          component="h1"
          sx={{ fontWeight: "bold", fontSize: "3" }}
          align="left"
        >
          We provide{" "}
          <Typography
            variant="h3"
            component="span"
            sx={{ color: "secondary.main", fontWeight: "bold" }}
          >
            tailored data analysis
          </Typography>{" "}
          for
          {
            <Typography
              component="span"
              sx={{ display: { xs: "inline", xl: "none" } }}
            >
              <br></br>
            </Typography>
          }{" "}
          your products or events.
        </Typography>
        <Typography variant="body1" sx={{ my: "2rem" }} align="left">
        This application will be targeting startups and Small Medium Enterprises (SME) 
        who would like to analyze their marketing or sentiments of their product. As 
        startups and SMEs are rather lean, less resources are spent on analyzing their 
        marketing. With our application, analyzing the sentiments and marketing of their 
        products becomes much easier and cheaper. Chirple currently uses Hashscrapper's 
        twitter API.
        </Typography>
      </Grid>

      <img src="https://cf.channel.io/thumb/200x200/pub-file/22754/620dfd59628394adb529/10.png"
        alt={"Hero Banner"}
        maxWidth={{ maxWidth: "500px" }} />
    </Grid>
  );
};

export default HeroBanner;