import Membership from "@/models/Membership";

export async function expireOldMemberships(gymId) {
  const now = new Date();

  const expiredMemberships = await Membership.find({
    gymId,
    status: "active",
    endDate: { $lt: now },
    whatsappSent: false,
  }).populate("userId");

  for (const m of expiredMemberships) {
    // 1️⃣ Mark expired
    m.status = "expired";
    m.whatsappSent = true;
    await m.save();

    // 2️⃣ Send WhatsApp
    const phone = m.userId.phone;
    const name = m.userId.name;

    const message = `Hi ${name}, your gym membership has expired. Please renew to continue your fitness journey 💪`;

    // WhatsApp deep link (safe, simple)
    console.log(`https://wa.me/91${phone}?text=${encodeURIComponent(message)}`);
  }
}
