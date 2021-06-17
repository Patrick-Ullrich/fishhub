import { Box } from "@chakra-ui/react";
import { Game } from "../components/game";
import { EventEnum } from "../components/game/hooks/useAnalytics";
import { connectToDatabase } from "../util/mongodb";

interface IProps {
  events: any;
}

export default function Home({ events }: IProps) {
  const fishCaught =
    events.find((x: any) => x._id === EventEnum.CaughtFish)?.count ?? 0;

  return <Game fishCaught={fishCaught} />;
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const events = await db
    .collection("events")
    .aggregate([{ $group: { _id: "$event", count: { $sum: 1 } } }])
    .toArray();

  console.log("events", events);
  return {
    props: {
      events,
    },
  };
}
