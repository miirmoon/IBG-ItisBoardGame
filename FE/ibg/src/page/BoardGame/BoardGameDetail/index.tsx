import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RootStateOrAny, useSelector } from "react-redux";
import { getGameDetail } from "../../../api/game";
import { getReviewList } from "../../../api/review";
import GameInfo from "./component/GameInfo";
import ReviewInfo from "../component/ReviewInfo";
import PageNotFound from "../../../component/PageNotFound";
import SkelGameInfo from "./component/SkelGameInfo";
import { IReview } from "../../../types/IReview";
import { Container, Divider } from "@mui/material";
import { IGameDetail } from "../../../types/IGame";

export default function BoardGameDetail() {
  const gameNo = Number(useParams().no);
  const userNo = useSelector((state: RootStateOrAny) => state.user.userNo);
  const [game, setGame] = useState<IGameDetail | null>(null);
  const [reviewList, setReviewList] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);

  // gameNo, userNo를 이용해서 게임 상세 정보 불러오기
  useEffect(() => {
    getGameDetail(gameNo, userNo || 0)
      .then((data) => {
        setGame(data);
        setReviewList(data.responseReviewList);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [gameNo, userNo]);

  const refreshReview = () => {
    getReviewList(gameNo).then((data) => {
      setReviewList(data);
    });
  };

  return (
    <Container>
      {loading ? (
        <SkelGameInfo />
      ) : game ? (
        <>
          <GameInfo game={game} />
          <Divider />

          <ReviewInfo
            reviewList={reviewList}
            gameNo={gameNo}
            userNo={userNo}
            addCallback={refreshReview}
          />
        </>
      ) : (
        <PageNotFound />
      )}
    </Container>
  );
}
