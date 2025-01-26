import { Button } from "@mui/material";
import { useEffect, useState } from "react";

import Form from "../../../components/auth/Form";
import AuthTextField from "../../../components/auth/textField/AuthTextField";
import Selector from "../../../components/auth/Selector";

import { UserInfo } from "../../../types/auth";

import { ID_REGEX } from "../../../constants/regex";

interface SignUp1Props {
  onNext: () => void;
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const SignUp1: React.FC<SignUp1Props> = ({ onNext, userInfo, setUserInfo }) => {
  const [id, setId] = useState(userInfo.id);
  const [idChecker, setIdChecker] = useState({
    show: false,
    format: false,
    length: false,
  });
  const [idDuplicated, setIdDuplicated] = useState(false);
  // enter 키 입력 시 중복 체크를 위한 flag: 중복 체크를 했는지 여부
  const [hasIdDuplicateChecked, setHasIdDuplicateChecked] = useState(false);

  useEffect(() => {
    setIdChecker((prevIdChecker) => ({
      // 기존 show가 true면 그대로 유지
      ...prevIdChecker,
      format: ID_REGEX.test(id),
      length: ID_REGEX.test(id),
    }));
  }, [id]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const checkIdDuplicated = async (id: string) => {
    if (!idChecker.format || !idChecker.length) {
      return;
    }

    // initialize
    setHasIdDuplicateChecked(false);

    // try {
    //   const response = await axios.post(`${SERVER_URL}auth/checkUserId`, {
    //     userId: id,
    //     check: true,
    //   });
    //   if (response.data === true) {
    //     setIdDuplicated(false);
    //   }
    // } catch (error) {
    //   setIdDuplicated(true);
    // } finally {
    setHasIdDuplicateChecked(true);
    // }
    setIdDuplicated(false);
  };

  const onClickNext = async () => {
    // await checkIdDuplicated(id); // 중복 체크 실행
    setHasIdDuplicateChecked(true);

    if (hasIdDuplicateChecked && idChecker.format && idChecker.length && !idDuplicated) {
      setUserInfo({ ...userInfo, id: id });
      onNext();
    }
  };

  return (
    <Form onSubmit={onClickNext} className="f-dir-column f-center">
      <Selector index={1} />

      <AuthTextField
        label="아이디(학번)"
        value={id}
        placeholder="학번"
        onBlur={() => {
          checkIdDuplicated(id);
          setIdChecker({ ...idChecker, show: true });
        }}
        onChange={(event) => setId(event.target.value)}
        error={idChecker.show && (!idChecker.format || !idChecker.length || idDuplicated)}
        helperText={
          idChecker.show
            ? !idChecker.format || !idChecker.length
              ? "학번 형식과 맞지 않습니다."
              : idDuplicated
              ? "중복된 아이디입니다."
              : "\u00A0"
            : "\u00A0"
        }
      />

      <div className="button-wrap j-content-end">
        <Button
          variant="contained"
          onClick={onClickNext}
          style={{ borderRadius: 20 }}
          disabled={!(idChecker.format && idChecker.length && !idDuplicated)}
        >
          다음
        </Button>
      </div>
    </Form>
  );
};

export default SignUp1;
