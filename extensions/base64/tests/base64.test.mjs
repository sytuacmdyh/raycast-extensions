import assert from "node:assert/strict";
import { test } from "node:test";
import { convertBase64 } from "../src/base64.ts";

test("standard encoding vectors, including empty text and each padding length", () => {
  for (const [plain, encoded] of [
    ["", ""],
    ["f", "Zg=="],
    ["fo", "Zm8="],
    ["foo", "Zm9v"],
    ["foobar", "Zm9vYmFy"],
    ["你好", "5L2g5aW9"],
  ]) {
    assert.deepEqual(convertBase64(plain, "encode"), { value: encoded });
    assert.deepEqual(convertBase64(encoded, "decode"), { value: plain });
  }
});

test("Unicode, BOM, NUL, whitespace and line breaks round-trip without loss", () => {
  for (const format of ["base64", "base64url"]) {
    for (const plain of ["你好 🌍", "\uFEFFtext", "\0", "  first\r\nsecond\t\n ", " "]) {
      const encoded = convertBase64(plain, "encode", format);
      assert.deepEqual(convertBase64(encoded.value, "decode", format), { value: plain });
    }
  }
});

test("URL-safe alphabet and unpadded encoding", () => {
  assert.deepEqual(convertBase64("\uFFFF", "encode", "base64url"), { value: "77-_" });
  assert.deepEqual(convertBase64("77-_", "decode", "base64url"), { value: "\uFFFF" });
  assert.deepEqual(convertBase64("f", "encode", "base64url"), { value: "Zg" });
  assert.ok("error" in convertBase64("77+/", "decode", "base64url"));
  assert.ok("error" in convertBase64("77-_", "decode"));
});

test("decoding accepts optional padding and ASCII wrapping whitespace", () => {
  for (const format of ["base64", "base64url"]) {
    for (const input of ["Zg", "Zg==", " Z\tg=\r\n= "]) {
      assert.deepEqual(convertBase64(input, "decode", format), { value: "f" });
    }
    assert.deepEqual(convertBase64("Zm8", "decode", format), { value: "fo" });
  }
});

test("malformed input and noncanonical trailing bits are rejected", () => {
  for (const input of [
    "a",
    "abcde",
    "=",
    "====",
    "Z=g=",
    "Zg=",
    "Zg===",
    "Zm9v=",
    "Zm8==",
    "Z!g==",
    "Zh==",
    "Zm9=",
    "Zh",
    "Zm9",
    "Zg==\u00a0",
  ]) {
    assert.ok("error" in convertBase64(input, "decode"), input);
  }
});

test("invalid UTF-8 is rejected instead of replaced with a replacement character", () => {
  for (const input of ["/w==", "wK8=", "7aCA", "4g=="]) {
    assert.match(convertBase64(input, "decode").error, /UTF-8/);
  }
  assert.deepEqual(convertBase64("77+9", "decode"), { value: "\uFFFD" });
});
