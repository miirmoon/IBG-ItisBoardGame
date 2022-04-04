import { useState, useEffect } from "react";
import { getDealDetail, closeDeal } from "../../../../api/deal";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Box,
  Container,
  Divider,
  Button,
  Typography,
} from "@mui/material";
import Title from "../component/Title";
import AvatarGenerator from "../../../../component/AvatarGenerator";
import { RootStateOrAny, useSelector } from "react-redux";

export default function DealDetail() {
  const userNo = useSelector((state: RootStateOrAny) => state.user.userNo);
  const [dealDetail, setDealDetail] = useState<any>();
  const params = useParams();

  useEffect(() => {
    console.log(params.dealNo);
    getDealDetail(Number(params.dealNo)).then((data) => {
      console.log(data);
      setDealDetail(data.data);
    });
  }, [params.dealNo]);

  const handleChangeStatus = () => {
    closeDeal(Number(params.dealNo)).then((data) => {
      console.log(data);
      if (data.code === 200) {
        setDealDetail({ ...dealDetail, dealStatus: true });
      }
    });
  };

  /* 제목 style */
  const DealTitle = styled("div")(() => ({
    fontSize: 24,
    marginTop: 10,
    fontWeight: "bold",
  }));

  /* 거래상태 style */
  const DealStatus = styled("span")(({ theme, color }) => ({
    textAlign: "center",
  }));

  /* 가격 style */
  const DealPrice = styled("div")(() => ({
    fontSize: 18,
    marginTop: 10,
    fontWeight: "bold",
  }));

  /* 설명 style */
  const DealContent = styled("div")(() => ({
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  }));

  /* 이미지 style */
  const Img = styled("img")({
    width: "100%",
    marginTop: -10,
  });

  /* 거래 상태 */
  const MarketState = styled("span")(({ theme, color }) => ({
    lineHeight: 2,
    fontSize: 18,
    color: color,
    borderRadius: 10,
    border: "1px solid " + color,
    backgroundColor: "transparent",
    padding: theme.spacing(1, 2, 1, 2),
  }));

  return (
    <>
      <Container style={{ marginTop: 20, padding: 20 }}>
        {/* BGM */}
        <Box
          style={{ marginBottom: 10 }}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Title />
        </Box>
        <Divider />
        {/* 내용 */}
        <Grid
          container
          spacing={1}
          style={{ marginTop: 14 }}
          direction="column"
        >
          <Grid item>
            {/* 상단 */}
            <Box
              style={{ marginBottom: 10 }}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box style={{ marginBottom: 10 }} sx={{ display: "flex" }}>
                <Typography variant="subtitle1">
                  <AvatarGenerator
                    userName={dealDetail ? String(dealDetail.userNo) : ""}
                  />
                </Typography>
                <Typography style={{ marginLeft: 8, marginTop: 8 }}>
                  {dealDetail ? String(dealDetail.userNo) : ""}
                </Typography>
              </Box>
              <Button
                style={{ height: 30 }}
                sx={{ top: { md: 7, xs: 6 } }}
                color="primary"
                variant="outlined"
              >
                거래하기
              </Button>
            </Box>
          </Grid>
          {/* 사진 */}
          <Grid item direction="row">
            {/* BE 오류 수정 후, src={dealDetail?.dealPath + "/" + dealDetail?.dealSavedName} 변경필수!!! */}
            <Img src="https://cf.geekdo-images.com/original/img/o07K8ZVh0PkOpOnSZs1TuABb7I4=/0x0/pic4001505.jpg" />
          </Grid>
          <Grid item direction="row">
            <DealTitle>{dealDetail?.dealTitle}</DealTitle>
          </Grid>
          <Grid item direction="row">
            <MarketState color={dealDetail?.dealStatus ? "#67B6FF" : "#FCB500"}>
              {dealDetail?.dealStatus ? (
                "거래완료"
              ) : dealDetail?.userNo === userNo ? (
                <DealStatus onClick={handleChangeStatus}>거래중</DealStatus>
              ) : (
                "거래중"
              )}
            </MarketState>
          </Grid>
          <Grid item direction="row">
            <DealPrice>{dealDetail?.dealPrice.toLocaleString()}원</DealPrice>
          </Grid>
          <Grid item direction="row">
            <DealContent>{dealDetail?.dealContent}</DealContent>
          </Grid>
          <Grid item direction="row">
            <Typography
              sx={{
                fontSize: { xs: 12, md: 16 },
                top: 10,
                right: 5,
                color: "gray",
              }}
            >
              {(() => {
                const date = new Date(dealDetail?.dealReg);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1);
                const day = String(date.getDate());
                return `${year}. ${month.padStart(2, "0")}. ${day.padStart(
                  2,
                  "0"
                )}`;
              })()}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

// 임시 데이터
// const tempData = {
//   dealList: [
//     {
//       dealTitle: "보드게임 팝니다.",
//       dealState: false,
//       dealNo: 1,
//       dealImage:
//         "https://ae01.alicdn.com/kf/H886df0f1371840bc8607e8eccd08a84bd/Mattel-Games-UNO-Kartenspiel-UNO.jpg_Q90.jpg_.webp",
//       dealPrice: 5000,
//     },
//   ],
// };
