import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/utils/helper";

const ArticleCard = ({
  title,
  image_path,
  description,
  pollId,
  linkText = "বিস্তারিত দেখুন",
  linkHref = "/singleResult",
}) => {
  const [resolvedLinkText, setResolvedLinkText] = useState(linkText);
  const [resolvedLinkHref, setResolvedLinkHref] = useState(linkHref);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      if (
        currentPath === "/poll" ||
        currentPath === "/" ||
        currentPath === "/singlePoll"
      ) {
        setResolvedLinkText("মতামত দিন");
        setResolvedLinkHref("/singlePoll");
      }
    }
  }, []);

  const handleLinkClick = () => {
    if (pollId) {
      localStorage.setItem("pollId", pollId);
      if (
        currentPath === "/poll" ||
        currentPath === "/" ||
        currentPath === "/singlePoll"
      ) {
        window.location.href = "/singlePoll";
      } else {
        window.location.href = "/singleResult";
      }
    }
  };

  const imageUrl = image_path
    ? `${api.replace('/api', '/storage')}/${image_path}`
    : "/storage/images/default-fallback.png";

  return (
    <div className="flex flex-row items-center justify-center bg-[#f0f4ff] p-3 md:p-6 rounded-lg gap-4">
      <div className="w-1/2 md:w-1/2">
        <Image
          src={imageUrl}
          alt={title || "Illustration"}
          width={244}
          height={188}
          className="rounded w-full h-auto md:w-[244px] md:h-[188px]"
        />
      </div>
      <div className="flex-1">
        <h2 className="text-[11px] leading-[18px] md:text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h2>
        <p className="text-[8px] text-two-line-clamp leading-[13px] text-gray-700 mb-2 md:mb-4 text-sm md:text-base">
          {description}
        </p>
        <Link
          href={resolvedLinkHref}
          className="text-xs md:text-sm text-mainButtonColor font-bold"
          onClick={handleLinkClick}
        >
          {resolvedLinkText}
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
