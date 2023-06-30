import Image from "next/image";

type TagsWrapper = {
  tags: string[];
  handleDelete: (index: number) => void;
};

const TagsWrapper = ({tags, handleDelete}: TagsWrapper) => {
  return (
    <div className="w-full flex flex-wrap gap-2 items-center mt-3">
      {tags && tags.length
        ? tags.map((tag: string, index: number) => (
            <div
              className="badge badge-primary border-base-300 gap-2 py-4 pr-1 text-sm sm:text-base"
              key={tag}
            >
              {tag}
              <Image
                src="/assets/icons/cancel.svg"
                width={14}
                height={14}
                alt={tag}
                className="cursor-pointer btn btn-xs btn-circle bg-white hover:bg-error border-none p-1"
                onClick={() => handleDelete(index)}
              />
            </div>
          ))
        : null}
    </div>
  );
};

export {TagsWrapper};
