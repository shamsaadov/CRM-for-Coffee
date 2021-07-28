import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";

function HomePage({ classes, products }) {
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {products.map((item) => (
          <Grid item key={item._id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={item.img}
                title={item.name}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.name}
                </Typography>
                <Typography>{item.description}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() =>
                    alert(`Цена ${item.name} - ${item.price} рублей`)
                  }
                >
                  Узнать цену
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box>
        <CardMedia
          className={classes.cardMedia}
          image="https://kudago.com/media/thumbs/xl/images/list/98/d7/98d792f890af8f545071959d73587435.jpg"
        />
      </Box>

      <Typography>
        В пасмурные и ненастные дни чашка горячего ароматного кофе становится
        вдвойне желанной: с каким облегчением мы забегаем в спасительную
        кофейню, потирая озябшие руки! KudaGo предлагает ознакомиться с лучшими
        заведениями столицы, где для вас приготовят действительно вкусный кофе.
        Так что устраивайтесь поудобнее в ожидании согревающего напитка.
      </Typography>
    </Container>
  );
}

export default HomePage;
