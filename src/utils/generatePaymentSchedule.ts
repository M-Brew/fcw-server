import scheduler from "node-schedule";

import Client from "../models/client.model";
import Invoice from "../models/invoice.model";

const generateInvoice = async () => {
  const clients = await Client.find({ suspended: { $ne: true } });
  console.log(clients);

  clients.map(async (client) => {
    const invoice = new Invoice({
      client: client.id,
      amount: client.type === "individual" ? 50 : 60,
      dueDate: new Date().toISOString(),
    });

    await invoice.save();
    console.log("New invoice generated.");
  });
};

const job = () => scheduler.scheduleJob("*/1 * * * *", generateInvoice);

export { job };
