import Image from "next/image";

type Props = {
  contentType: string;
  filename: string;
};

const ChatInlineMedia = ({contentType, filename}: Props) => {
  // Image Source
  const imageSrc = contentType.startsWith("image")
    ? "/assets/icons/image.svg"
    : contentType.startsWith("video")
    ? "/assets/icons/video.svg"
    : "/assets/icons/document.svg";

  // Return Image
  return <Image src={imageSrc} alt={filename} width={24} height={24} />;
};

export {ChatInlineMedia};
