import React, { useState, useEffect } from "react";
import Map from "./component/Map";
import { Box, Container, Typography } from "@mui/material";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

export default function Index() {
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  //const [loading, setLoading] = useState(false);
  const [addr, setAddr] = useState("");
  const { kakao } = window;

  useEffect(() => {
    //setLoading(true);
    navigator.geolocation.getCurrentPosition(function (pos) {
      var latitude = pos.coords.latitude;
      var longitude = pos.coords.longitude;
      setLong(longitude);
      setLat(latitude);
      getAddr();
      //console.log("address : " + addr);
    });
    //좌표  => 주소
    function getAddr() {
      let geocoder = new kakao.maps.services.Geocoder();
      let coord = new kakao.maps.LatLng(lat, long);

      let callback = function (result: any, status: number) {
        if (status === kakao.maps.services.Status.OK) {
          setAddr(result[0].address.region_3depth_name);
        }
      };
      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    }
    // setLoading(false);
  });
  return (
    <>
      <Container style={{ marginTop: 20, padding: 20 }}>
        <Typography
          sx={{
            fontSize: { xs: 20, md: 24 },
            fontWeight: "bold",
            mb: 1,
          }}
        >
          주변 보드게임 카페 찾기
          <FmdGoodIcon sx={{ verticalAlign: "-0.2rem", ml: 1 }} />
        </Typography>

        <Box>
          <Map long={long} lat={lat} addr={addr} />
        </Box>
      </Container>
    </>
  );
}
