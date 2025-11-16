import { GameRatingIconName } from "@/app/types/GameTypes";
import { AngryIcon } from "./AngryIcon";
import { CalmIcon } from "./CalmIcon";
import { DefaultIcon } from "./DefaultIcon";
import { HappyIcon } from "./HappyIcon";
import { LessIcon } from "./LessIcon";
import { NeutralIcon } from "./NeturalIcon";
import { SadIcon } from "./SadIcon";

export const UserRatingIcon = ({ name }: { name: GameRatingIconName }) => {
  switch (name) {
    case "angry": return <AngryIcon />;
    case "sad": return <SadIcon />;
    case "less": return <LessIcon />;
    case "netural": return <NeutralIcon />;
    case "happy": return <HappyIcon />;
    case "calm": return <CalmIcon />;
    case "gray": return <DefaultIcon />;
    default: return <DefaultIcon />;
  }
};