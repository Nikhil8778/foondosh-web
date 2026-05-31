import { PrismaClient, PartnerType, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const customer = await prisma.user.create({
    data: {
      name: "Test Customer",
      phone: "9999999999",
      email: "customer@foondosh.com",
      role: UserRole.CUSTOMER,
    },
  });

  const restaurant = await prisma.partner.create({
    data: {
      name: "Village Tandoori",
      type: PartnerType.RESTAURANT,
      phone: "8888888888",
      email: "restaurant@foondosh.com",
      address: "Main Market Road",
      city: "Hoshiarpur",
      latitude: 31.5322,
      longitude: 75.9170,
    },
  });

  const pharmacy = await prisma.partner.create({
    data: {
      name: "Foondosh Medical Store",
      type: PartnerType.PHARMACY,
      phone: "7777777777",
      email: "pharmacy@foondosh.com",
      address: "Hospital Road",
      city: "Hoshiarpur",
    },
  });

  await prisma.product.createMany({
    data: [
      {
        partnerId: restaurant.id,
        name: "Butter Chicken",
        category: "Non-Veg",
        description: "Creamy Punjabi butter chicken",
        priceCents: 24900,
      },
      {
        partnerId: restaurant.id,
        name: "Paneer Tikka",
        category: "Veg",
        description: "Fresh paneer tikka with chutney",
        priceCents: 17900,
      },
      {
        partnerId: restaurant.id,
        name: "Masala Dosa",
        category: "South Indian",
        description: "Crispy dosa with sambar",
        priceCents: 9900,
      },
      {
        partnerId: pharmacy.id,
        name: "Paracetamol 500mg",
        category: "Medicine",
        description: "Common fever and pain relief tablet",
        priceCents: 3000,
      },
    ],
  });

  await prisma.driver.create({
    data: {
      name: "Ravi Delivery",
      phone: "6666666666",
      vehicleType: "Bike",
      isAvailable: true,
    },
  });

  console.log("Seed data inserted successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });