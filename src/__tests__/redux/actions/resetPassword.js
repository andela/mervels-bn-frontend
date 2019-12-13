/* eslint-disable no-console */
import {
  resetPasswordSent,
  passwordResetSuccess
} from "../../../redux/actions/resetPassword";

describe("Reset Password Actions", () => {
  it("Should call the action resetPasswordSent ", () => {
    const payload = {
      message: "value"
    };
    expect(resetPasswordSent(payload)).toStrictEqual({
      type: "RESET_PASSWORD_SENT",
      message: "value"
    });
  });
  it("Should call the action passwordResetSuccess", () => {
    const payload = {
      message: "value"
    };
    expect(passwordResetSuccess(payload)).toStrictEqual({
      type: "PASSWORD_RESET_SUCCESS",
      message: { message: "value" }
    });
  });
});

