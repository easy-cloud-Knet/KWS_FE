import { useEffect, useState } from "react";

interface UseOutsideClickProps {
  ref: React.RefObject<HTMLDivElement>;
}

const useOutsideClick = ({ ref }: UseOutsideClickProps) => {
  const [isOutside, setIsOutside] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOutside(true);
    } else {
      setIsOutside(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return { ref, isOutside };
};

export default useOutsideClick;
