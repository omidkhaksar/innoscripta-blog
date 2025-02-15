import React from "react";
import { FC } from "react";
import Badge from "@/components/Badge/Badge";
import Avatar from "@/components/Avatar/Avatar";

interface CardSkeletonProps {
  ratio?: string;
}

const CardSkeleton: FC<CardSkeletonProps> = ({ ratio = "aspect-w-4 aspect-h-3" }) => {
  return (
    <div className={`relative flex flex-col group [ nc-box-has-hover ]  ${ratio} animate-pulse`}>
      <div className={`block flex-shrink-0 relative w-full rounded-t-xl overflow-hidden ${ratio}`}>
        <div className="w-full h-48 bg-gray-300"></div>
      </div>
      <span className="absolute top-3 inset-x-3 z-10">
        <Badge name="Loading..." />
      </span>

      <div className="p-4 flex flex-col flex-grow space-y-3">
        <div className="flex items-center justify-between">
          <div className="relative flex items-center space-x-2">
            <Avatar radius="rounded-full" sizeClass="h-7 w-7 text-sm" imgUrl="" userName="" />
            <div className="flex flex-col gap-2">
              <span className="block bg-gray-300 h-4 w-24 rounded"></span>
              <span className="block bg-gray-300 h-3 w-16 rounded"></span>
            </div>
          </div>
          <span className="bg-gray-300 h-3 w-12 rounded"></span>
        </div>
        <h2 className="bg-gray-300 h-5 w-3/4 rounded"></h2>
        <p className="bg-gray-300 h-3 w-full rounded mt-2"></p>
      </div>
    </div>
  );
};

export default CardSkeleton;
