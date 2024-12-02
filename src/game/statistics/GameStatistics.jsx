import React from "react";
import { Score } from "./Score";
import { useScoreStore } from "../../store/score";
import { CrownIcon } from "../../icons/CrownIcon";
import { WalletTransfer } from "./WalletTransfer";

export const GameStatistics = () => {
  const scoreWinner = useScoreStore((state) => state.winner);
  // GRAY
  // #212529, rgba(33,37,41,0.5)  - gray 900
  // #495057, rgba(73,80,87,0.5)   - gray 700
  // #adb5bd, rgba(173,181,189,0.5)   - gray 500
  const gray900 = "rgba(33,37,41,0.5)";
  const gray700 = "rgba(73,80,87,0.5)";
  const gray500 = "rgba(173,181,189,0.5)";

  // BLUE
  // #1864ab, rgba(24,100,171,0.5)  - blue 900
  // #1c7ed6, rgba(28,126,214,0.5)   - blue 700
  // #339af0, rgba(51,154,240,0.5)   - blue 500
  const blue900 = "rgba(24,100,171,0.5)";
  const blue700 = "rgba(28,126,214,0.5)";
  const blue500 = "rgba(51,154,240,0.5)";

  // GREEN
  // #2b8a3e, rgba(43,138,62,0.5)  - green 900
  // #37b24d, rgba(55,178,77,0.5)   - green 700
  // #51cf66, rgba(81,207,102,0.5)  - green 500
  const green900 = "rgba(43,138,62,0.5)";
  const green700 = "rgba(55,178,77,0.5)";
  const green500 = "rgba(81,207,102,0.5)";

  // RED
  // #c92a2a, rgba(201,42,42,0.5)  - red 900
  // #f03e3e, rgba(240,62,62,0.5)   - red 700
  // #ff6b6b, rgba(255,107,107,0.5)  - red 500
  const red900 = "rgba(201,42,42,0.5)";
  const red700 = "rgba(240,62,62,0.5)";
  const red500 = "rgba(255,107,107,0.5)";

  const defaultBgColor = {
    background: `linear-gradient(to right, ${blue900},
     ${blue900}, ${blue700}, ${gray700},${gray700},${gray500})`,
  };

  const wonBgColor = {
    background: `linear-gradient(to right, ${green900}, 
    ${green900}, ${green700}, ${gray700},${gray700},${gray500})`,
  };

  const lostBgColor = {
    background: `linear-gradient(to right, ${red900},
     ${red900}, ${red700}, ${gray700},${gray700},${gray500})`,
  };

  const getBgColor = () => {
    if (!scoreWinner || scoreWinner === "pending") return defaultBgColor;
    if (scoreWinner === "human") return wonBgColor;
    if (scoreWinner === "computer") return lostBgColor;
  };

  return (
    <div
      className="w-full flex items-center gap-4 justify-between px-32
      py-4 transition-all shadow-lg"
      style={getBgColor()}
    >
      <div>
        <GetGameStatus scoreWinner={scoreWinner} />
      </div>
      {/* <div>Real time stats Transfer</div> */}
      <div>
        <WalletTransfer />
      </div>
      <div>
        <Score />
      </div>
    </div>
  );
};

const GetGameStatus = ({ scoreWinner }) => {
  if (!scoreWinner) {
    return <span className="font-extrabold text-3xl uppercase">Tennis</span>;
  }
  if (scoreWinner === "pending") {
    return (
      <span className="font-extrabold text-3xl uppercase">in progress</span>
    );
  }
  if (scoreWinner === "human") {
    return (
      <div className="flex items-center gap-2 justify-center">
        <CrownIcon />
        <span className="font-extrabold text-3xl uppercase">won</span>
      </div>
    );
  }
  if (scoreWinner === "computer") {
    return <span className="font-extrabold text-3xl uppercase">lost</span>;
  }
};
