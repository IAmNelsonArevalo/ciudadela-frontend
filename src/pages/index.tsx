import React from "react";
import useViews from "@/views";
import axios from "axios";
import type {NextPage} from "next";
import {ICharacters} from "@/interfaces/home.interfaces";
import {Box, Container, Grid, Card, CardMedia, CardActionArea, Typography, CardContent, Stack, Pagination} from "@mui/material";

interface IHomeProps {
    characters: Array<ICharacters>
}

const Home: NextPage<IHomeProps> = ({
    characters
                                    }) => {
  /** Views */
  const {useComponents} = useViews();
  const {Header} = useComponents();

  /** States */
  const [charactersRender, setCharactersRender] = React.useState<ICharacters[] | any[]>(characters);
  const [page, setPage] = React.useState<number>(1);

  const getCharacters = async (pageNumber: number) => {
      const res = await axios({
          url: `http://127.0.0.1:8000/get-characters?page=${pageNumber}`,
          method: "GET"
      });

      const {data} = res.data;

      setCharactersRender(data);
  }

  React.useEffect(() => {
      getCharacters(page).then();
  }, [page])

    const getPadding = () => {
      if(typeof window !== "undefined") {
          return window.innerWidth > 768 ? "24px" : "0px";
      }
    }

  return (
      <React.Fragment>
        <Header/>
          <Container className="mt-6">
              <Box sx={{marginTop: 10}}>
                  <Grid container sx={{marginLeft: 0, marginRight: 0, width: "100%"}}>
                      {
                          charactersRender.map((item: ICharacters, index: number) => (
                              <Grid xs={12} sm={6} md={4} key={index} sx={{paddingRight: "24px"}}>
                                  <Card sx={{marginBottom: 5, width: "100% !important"}}>
                                      <CardActionArea>
                                          <CardMedia
                                              component="img"
                                              height="140"
                                              image={item.image}
                                              alt="green iguana"
                                          />
                                          <CardContent>
                                              <Typography gutterBottom variant="h5" component="div">
                                                  {item.name}
                                              </Typography>
                                              <Typography variant="body2" color="text.secondary">
                                                  Especie: {item.species}
                                              </Typography>
                                          </CardContent>
                                      </CardActionArea>
                                  </Card>
                              </Grid>
                          ))
                      }

                  </Grid>
                  <Box sx={{display: "flex", justifyContent: "center"}}>
                      <Stack spacing={2} sx={{marginBottom: "30px"}}>
                          <Pagination count={22} color="primary" onChange={(e: any, value: number) => setPage(value)}/>
                      </Stack>
                  </Box>
              </Box>
          </Container>
      </React.Fragment>
  );
}

export const getServerSideProps = async () => {
    const res = await axios({
        url: "http://127.0.0.1:8000/get-characters?page=1",
        method: "GET"
    });

    const {data: characters} = res.data

    return {
        props: {
            characters
        }
    }
}

export default Home;