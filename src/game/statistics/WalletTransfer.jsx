import React, { useEffect, useRef, useState } from "react";
import { useScoreStore } from "../../store/score";

export const WalletTransfer = () => {
  const scoreWinner = useScoreStore((state) => state.winner);
  const logoRef = useRef(null); // Reference to the Bitcoin logo
  const wallet1Ref = useRef(null); // Reference to Wallet 1
  const wallet2Ref = useRef(null); // Reference to Wallet 2
  const parentRef = useRef(null); // Reference to the parent element
  const [isMoving, setIsMoving] = useState(false);

  const moveBitcoinLogo = (sourceWallet, targetWallet) => {
    if (
      !logoRef.current ||
      !sourceWallet ||
      !targetWallet ||
      !parentRef.current
    )
      return;

    const logo = logoRef.current;
    const parentRect = parentRef.current.getBoundingClientRect();
    const sourceRect = sourceWallet.getBoundingClientRect();
    const targetRect = targetWallet.getBoundingClientRect();

    // Position the logo at 32px from the top and 32px from the respective side of the source wallet
    const startX = sourceRect.left - parentRect.left + 32; // 32px from the left of the source wallet
    const startY = sourceRect.top - parentRect.top + 32; // 32px from the top of the source wallet

    logo.style.left = `${startX}px`;
    logo.style.top = `${startY}px`;

    // Calculate the movement delta for translation
    const deltaX =
      targetRect.left - parentRect.left + targetRect.width - 32 - startX; // 32px from the right of the target wallet
    const deltaY = targetRect.top - parentRect.top + 32 - startY; // Move to 32px from the top of the target wallet

    // Start the animation
    logo.style.transition = "transform 1.5s cubic-bezier(0.25, 0.1, 0.25, 1)";
    logo.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

    // Reset position after animation
    setTimeout(() => {
      logo.style.transition = "none";
      logo.style.transform = "none";
      setIsMoving(false); // Mark movement as completed
    }, 1500);
  };

  useEffect(() => {
    if (!scoreWinner) return;
    // if (!scoreWinner || scoreWinner === "pending") return;

    setIsMoving(true); // Mark as moving
    if (scoreWinner === "human") {
      setIsMoving(true); // Mark as moving
      moveBitcoinLogo(wallet2Ref.current, wallet1Ref.current);
    } else if (scoreWinner === "computer") {
      setIsMoving(true); // Mark as moving
      moveBitcoinLogo(wallet1Ref.current, wallet2Ref.current);
    }
  }, [scoreWinner]);

  return (
    <div
      ref={parentRef}
      className="w-full max-w-96 border-4 border-gray-300 rounded-xl p-3s 
      flex items-center justify-between gap-16 relative"
    >
      {/* Wallet 1 */}
      <div
        ref={wallet1Ref}
        className="flex items-center justify-between gap-2
          text-gray-300  bg-indigo-400 px-4 py-2
          rounded-lg relative"
        id="wallet-1"
      >
        <span className="font-bold">Wallet 1</span>
      </div>

      {/* Bitcoin Logo */}
      <img
        ref={logoRef}
        src="/assets/bitcoin-logo.png"
        alt="Bitcoin Logo"
        className={`absolute w-10 h-10 ${isMoving ? "visible" : "hidden"}`}
        style={{
          position: "absolute",
          transform: "translate(-50%, -50%)", // This ensures that the logo is properly aligned when positioned
        }}
      />

      {/* Wallet 2 */}
      <div
        ref={wallet2Ref}
        className="flex items-center justify-between gap-2
        text-gray-300 bg-indigo-400 px-4 py-2
        rounded-lg relative"
        id="wallet-2"
      >
        <span className="font-bold">Wallet 2</span>
      </div>
    </div>
  );
};
