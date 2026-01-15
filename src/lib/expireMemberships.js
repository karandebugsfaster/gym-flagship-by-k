import Membership from "@/models/Membership";

export async function expireOldMemberships(gymId) {
  const now = new Date();

  await Membership.updateMany(
    {
      gymId,
      endDate: { $lt: now },
      status: "active",
    },
    {
      $set: { status: "expired" },
    }
  );
}
