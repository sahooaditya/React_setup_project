const crypto = require("crypto");
const http = require("http");
const path = require("path");
const fs = require("fs");

const loadEnvFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      return;
    }

    const separatorIndex = trimmedLine.indexOf("=");

    if (separatorIndex === -1) {
      return;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine.slice(separatorIndex + 1).trim();
    process.env[key] = process.env[key] || value;
  });
};

loadEnvFile(path.join(__dirname, "..", ".env.server.local"));

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;
const port = Number(process.env.RAZORPAY_SERVER_PORT || 5000);

const sendJson = (res, statusCode, data) => {
  res.writeHead(statusCode, {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(data));
};

const readBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", reject);
  });
};

const createOrder = async ({ amount, receipt }) => {
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
      currency: "INR",
      receipt,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.description || "Unable to create Razorpay order.");
  }

  return data;
};

const verifyPayment = ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
  const generatedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  return generatedSignature === razorpay_signature;
};

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    sendJson(res, 200, {});
    return;
  }

  if (!keyId || !keySecret) {
    sendJson(res, 500, {
      message: "Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env.server.local.",
    });
    return;
  }

  try {
    if (req.method === "GET" && req.url === "/api/razorpay/config") {
      sendJson(res, 200, {
        keyId,
      });
      return;
    }

    if (req.method === "POST" && req.url === "/api/razorpay/create-order") {
      const body = await readBody(req);
      const amount = Number(body.amount);

      if (!amount || amount < 100) {
        sendJson(res, 400, { message: "Amount must be at least 100 paise." });
        return;
      }

      const order = await createOrder({
        amount,
        receipt: `receipt_${Date.now()}`,
      });

      sendJson(res, 200, order);
      return;
    }

    if (req.method === "POST" && req.url === "/api/razorpay/verify-payment") {
      const body = await readBody(req);
      const isVerified = verifyPayment(body);

      sendJson(res, isVerified ? 200 : 400, {
        verified: isVerified,
        message: isVerified ? "Payment verified." : "Payment verification failed.",
      });
      return;
    }

    sendJson(res, 404, { message: "Route not found." });
  } catch (error) {
    sendJson(res, 500, {
      message: error instanceof Error ? error.message : "Payment server error.",
    });
  }
});

server.listen(port, () => {
  console.log(`Razorpay server running on http://localhost:${port}`);
});
