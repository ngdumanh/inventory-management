import crypto from "crypto";

const generateSignature = (
  params: Record<string, string>,
  appSecret: string,
  path: string,
  body: string = ""
): string => {
  // Step 1: Extract and reorder query parameters
  const sortedParams = Object.keys(params)
    .filter((key) => key !== "sign" && key !== "access_token")
    .sort()
    .map((key) => `${key}${params[key]}`)
    .join("");

  // Step 2: Concatenate parameters and path
  let input = `${path}${sortedParams}`;

  // Step 3: Append body if content_type is not multipart/form-data
  if (body) {
    input += body;
  }

  // Step 4: Wrap with app_secret
  input = `${appSecret}${input}${appSecret}`;

  // Step 5: Encode using HMAC-SHA256
  return crypto.createHmac("sha256", appSecret).update(input).digest("hex");
};

export default generateSignature;
