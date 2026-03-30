import { describe, it, expect } from "vitest";

describe("Twilio credentials", () => {
  it("should have TWILIO_ACCOUNT_SID configured", () => {
    expect(process.env.TWILIO_ACCOUNT_SID).toBeTruthy();
  });
  it("should have TWILIO_AUTH_TOKEN configured", () => {
    expect(process.env.TWILIO_AUTH_TOKEN).toBeTruthy();
  });
  it("should have TWILIO_FROM_NUMBER configured", () => {
    expect(process.env.TWILIO_FROM_NUMBER).toBeTruthy();
  });
});
