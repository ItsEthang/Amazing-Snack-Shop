import Image from "next/image";

interface Props {
  url: string;
  alt: string;
}

const SnackImage = ({ url, alt }: Props) => {
  return <Image src={url} alt={alt} fill={true} className="object-contain" />;
};

export default SnackImage;
