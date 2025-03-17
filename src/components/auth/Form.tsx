interface FormProps {
  children: React.ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  className?: string;
  id?: string;
}

const Form: React.FC<FormProps> = ({ children, onSubmit, className, id }) => {
  const onSubmitDefault = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (onSubmit) {
      await onSubmit(event);
    }
  };
  return (
    <form className={className} id={id} onSubmit={onSubmitDefault}>
      {children}
    </form>
  );
};

export default Form;
