import { useEffect, useState } from "react";
import BoardCardMain from "../../../component/BoardCardMain";
import { Box, Container, Grid, Typography } from "@mui/material";
import { getLikedList } from "../../../api/user";
import { RootStateOrAny, useSelector } from "react-redux";

// Game 객체 => types파일로 빼는 것이 좋음
export interface Game {
  gameNo: number;
  gameImg: string;
  gameName: string;
  gameMinPlayer: number;
  gameMaxPlayer: number;
  gameCategory: string;
  gameTotalScore: number;
  like: boolean;
  gameKorName: string;
}

// 테마별 게임리스트: sm(600) 이상(pc)에서는 버튼으로, 이하(모바일)에서는 스크롤로 동작
export default function MyGames() {
  const [gameList, setGameList] = useState<Game[]>([]);
  const [userno] = useState(
    useSelector((state: RootStateOrAny) => state.user.userNo)
  );
  // 관심 게임이 없는 경우 추가해야함
  useEffect(() => {
    // API 연결(게임리스트 불러오기)
    const init = async () => {
      let data = await getLikedList(userno);
      setGameList(data); //gameImg, gameName, gameNo를 준다
      // console.log(data);
    };
    init();
  });

  return (
    <Container style={{ marginTop: 20, padding: 20 }}>
      <Typography
        sx={{
          fontSize: { xs: 20, md: 24 },
          fontWeight: "bold",
          mb: 1,
        }}
      >
        나의 관심 게임 목록
      </Typography>
      <Container style={{ marginTop: 20, padding: 10 }}>
        <Grid container spacing={2}>
          {gameList.map((game) => (
            <BoardCardMain key={game.gameNo} game={game}></BoardCardMain>
          ))}
        </Grid>
        <Box sx={{ mb: 15 }} />
      </Container>
    </Container>
  );
}
