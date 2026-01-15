interface VMInfoToBeCreatedItemProps {
  title: string;
  content: number | string;
  className?: string;
}

const VMInfoToBeCreatedItem = ({
  title,
  content,
  className,
  ...props
}: VMInfoToBeCreatedItemProps) => {
  const defaultClassName =
    "flex flex-col justify-between px-[32px] py-[24px] h-[108px] rounded-[10px] border-[1px] border-line";
  return (
    <div className={defaultClassName + " " + className} {...props}>
      <p className="typo-pr-r-16">{title}</p>
      <p className="typo-pr-r-16 text-grey1">{content}</p>
    </div>
  );
};

export default VMInfoToBeCreatedItem;
