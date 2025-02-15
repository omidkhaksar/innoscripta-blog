import React, { FC } from "react";
import Badge from "@/components/Badge/Badge";
import Link from "next/link";
import Avatar from "@/components/Avatar/Avatar";
import Image from 'next/image'

export interface CardProps {
  className?: string;
  post: any;
  ratio?: string;
  hiddenAuthor?: boolean;
}

const Card: FC<CardProps> = ({
  className = "h-full",
  post,
  ratio = "aspect-w-4 aspect-h-3",
}) => {
  return (
    <Link
    target="_blank" href={post?.url}
      className={`relative flex flex-col cursor-pointer group [ nc-box-has-hover ] ${className}`}
    >
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-xl overflow-hidden ${ratio}`}
      >
        <div className="w-full h-48">
          <Image
            src={post?.urlToImage || "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
            alt={post?.title}
            placeholder="empty"
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className=" object-cover"
          />
        </div>
      </div>
      <span className="absolute top-3 inset-x-3 z-10">
        <Badge
          name={post?.source?.api||'NewsAPI'}
          // href={item.href}
          // color={item.color as any}
        />
      </span>

      <div className="p-4 flex flex-col flex-grow space-y-3">
        <div className="flex items-center justify-between">
        <div
          className="relative flex items-center space-x-2"
        >
          <Avatar
            radius="rounded-full"
            sizeClass={"h-7 w-7 text-sm"}
            imgUrl={post?.avatar}
            userName={post?.author}
          />
          <div className="flex flex-col gap">
          <span className="block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-bold text-sm">
            {post?.author}
          </span>
          <span className="block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium text-[10px]">
            {post?.source?.name}
          </span>
          </div>
        </div>
        <span className="text-xs text-neutral-500">
          {new Date(post?.publishedAt).toLocaleDateString()}
        </span>
        </div>
        <h2 className="nc-card-title block text-xs font-semibold text-neutral-900 dark:text-neutral-100 ">
          {post?.title}
        </h2>
        <p className="text-gray-700 text-sm  mt-2">
          {post?.description
            ? post?.description.slice(0, 50) + "..."
            : "No description available"}
        </p>
      </div>
    </Link>
  );
};

export default Card;
