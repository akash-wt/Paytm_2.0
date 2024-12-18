import express from "express";
import db from "@repo/db/client";
const app = express();

app.post("/hdfcWebhok", async (req, res) => {
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.userId,
    amount: req.body.amount,
  };
  //TODO: Add zod validation here?
  //TODO: HDFC bank should ideally send us a secret so we know this is sent by them

  const currentTime = new Date();

  try {
    db.$transaction([
      db.balance.update({
        where: {
          userId: paymentInformation.userId,
        },
        data: {
          amount: {
            increment: paymentInformation.amount,
          },
        },
      }),

      db.onRampTransaction.update({
        where:{
          token:paymentInformation.token
        },
        data:{
          status: "Success",
          startTime:  currentTime
        }
      })
    ]);

    res.status(200).json({ message: "Transaction successful" });
  } catch (e) {
    console.log(e);
    res.status(411).json({
      message: "Error while processing webhook"
  })
  }
});

app.listen(3000, () => {
  console.log("app is listing on port ", 3000);
});
