// src/__tests__/SignUp.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import SignUp from './../pages/SignUp';

test("SignUp 컴포넌트가 렌더링된다", () => {
  render(<SignUp />);
  expect(screen.getByText("SIGN UP FORM")).toBeInTheDocument();
});

test("유효하지 않은 이메일 입력 시 경고 메시지가 표시된다", () => {
  render(<SignUp />);
  fireEvent.change(screen.getByPlaceholderText("email@domain.com"), {
    target: { value: "invalid-email" },
  });
  fireEvent.click(screen.getByText("SIGN IN"));
  expect(screen.getByText("올바른 이메일 주소를 입력하세요.")).toBeInTheDocument();
});

test("회원가입 시도 시 빈 칸이 있는 경우 경고가 표시된다", () => {
  render(<SignUp />);
  fireEvent.click(screen.getByText("SIGN IN"));
  expect(screen.getByText("빈 칸을 모두 입력해주세요!")).toBeInTheDocument();
});
