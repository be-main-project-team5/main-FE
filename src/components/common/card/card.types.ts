export interface AnimationCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
}

export interface IdolCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc?: string;
  title: string;
  details: { idolGroup: string; position: string };
}
