import { addSeconds, format, isBefore } from "date-fns";
import * as OneSignal from "onesignal-node";

const client = new OneSignal.Client(
  process.env.ONESIGNAL_APP_ID,
  process.env.ONESIGNAL_KEY,
);

export default async function sendNotification({
  title,
  message,
  usersId,
  url,
  send_at,
  isAdmin,
  large_icon,
}) {
  try {
    const scheduledDate = isBefore(send_at, new Date()) ? new Date() : send_at;
    const send_after = format(scheduledDate, "yyyy-MM-dd HH:mm:ss 'GMT-0300'");
    await client.createNotification({
      headings: {
        en: title,
        pt: title,
      },
      contents: {
        en: message,
        pt: message,
      },
      data: {
        url: url,
      },
      included_segments: isAdmin ? ["Total Subscriptions"] : [],
      include_external_user_ids: isAdmin ? [] : usersId,
      send_after: send_after,
      large_icon: large_icon,
    });
  } catch (error) {
    console.error("Erro OneSignal:", error);
  }
}
