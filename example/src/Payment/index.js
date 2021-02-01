import React from "react";
import IMP from "iamport-react-native";

import Loading from "../Loading";

import { getUserCode } from "../utils";
import { Alert } from "react-native";

export default function Payment({ navigation }) {
  const params = navigation.getParam("params");
  const data = {
    ...params,
    app_scheme: "example",
  };

  return (
    <IMP.Payment
      userCode="imp12403246"
      loading={<Loading />}
      data={data}
      callback={(response) => {
        alert("결제완료");
        // navigation.replace("PaymentResult", { response });
      }}
    />
  );
}

// 앱 복귀시 콜백은 실행됨(imp_successe 값은 IOS의 경우 전달되지 않음)
// callBack에 네비게이팅 시키는 로직이 들어가는 순간 실 결제가 안됨
// example 프로젝트에서는 네비게이팅 되고 imp_success에 false값이 안오기때문에 결과페이지로 네비게이팅되고 결제완료라는
// 화면이 출력되지만, 실제 어드민에서 들어가서 확인해보면 결제완료되어있지 않음
// 네비게이팅 안시키고 "다음" 버튼이 있는 페이지에 유지시키면은 결제는 됨, 근데 네비게이팅이 안됨
// 최초 앱 복귀시 콜백이 실행되고, 그 뒤 결제완료 페이지에서 "다음" 버튼을 누를시 다시 콜백이 실행됨(Alert창 출력);
// 앱 복귀 시 "다음" 버튼이 있는 결제완료 화면이 표출되지 않는 경우 결제가 완료되지 않는 것으로 추측됨
