import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function Home(props) {
  return (
    <Box className="tab-wrapper">
      <div style={{ display: "flex", gap: "20px", padding: "50px" }}>
        <Card>
          <CardMedia
            component="img"
            height="140"
            width={140}
            image={`${process.env.PUBLIC_URL}/logo.png`}
            alt="Feature Image"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              EMI Calculator
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Feature description goes here.
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardMedia
            component="img"
            height="140"
            width={140}
            image="https://www.hamropatro.com/images/hamropatro.png"
            alt="Feature Image"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              Stock Analyzer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Feature description goes here.
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardMedia
            component="img"
            height="140"
            width={140}
            image="https://www.hamropatro.com/images/hamropatro.png"
            alt="Feature Image"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              E-Unit Calculator
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Feature description goes here.
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardMedia
            component="img"
            height="140"
            width={140}
            image="https://www.hamropatro.com/images/hamropatro.png"
            alt="Feature Image"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              Statics Calculator
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Feature description goes here.
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardMedia
            component="img"
            height="140"
            width={140}
            image="https://www.hamropatro.com/images/hamropatro.png"
            alt="Feature Image"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              Probabilty Calculator
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Feature description goes here.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </Box>
  );
}
