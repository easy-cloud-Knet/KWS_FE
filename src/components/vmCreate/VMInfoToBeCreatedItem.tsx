interface VMInfoToBeCreatedItemProps {
  title: string;
  content: string;
  className?: string;
}

const VMInfoToBeCreatedItem: React.FC<VMInfoToBeCreatedItemProps> = ({
  title,
  content,
  className,
  ...props
}) => {
  const defaultClassName =
    "flex flex-col justify-between px-[32px] py-[24px] h-[108px] rounded-[10px] border-[1px] border-(--Line)";
  return (
    <div className={defaultClassName + " " + className} {...props}>
      <p className="p-16-400">{title}</p>
      <p className="p-16-400 text-(--Grey1)">{content}</p>
    </div>
  );
};

export default VMInfoToBeCreatedItem;
