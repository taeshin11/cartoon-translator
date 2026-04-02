import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  const STRIPE_PRICE_MONTHLY = process.env.STRIPE_PRICE_MONTHLY;
  const STRIPE_PRICE_YEARLY = process.env.STRIPE_PRICE_YEARLY;

  if (!STRIPE_SECRET_KEY) {
    return Response.json(
      { error: "Payment system not configured" },
      { status: 503 }
    );
  }

  try {
    const { plan } = await request.json();
    const priceId =
      plan === "yearly" ? STRIPE_PRICE_YEARLY : STRIPE_PRICE_MONTHLY;

    if (!priceId) {
      return Response.json(
        { error: "Price not configured" },
        { status: 503 }
      );
    }

    const origin = request.headers.get("origin") || "https://cartoon-translator.vercel.app";

    // Create Stripe Checkout Session via API (no SDK needed)
    const response = await fetch(
      "https://api.stripe.com/v1/checkout/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          "payment_method_types[0]": "card",
          mode: "subscription",
          "line_items[0][price]": priceId,
          "line_items[0][quantity]": "1",
          success_url: `${origin}/pricing?success=true&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${origin}/pricing?canceled=true`,
          allow_promotion_codes: "true",
        }),
      }
    );

    if (!response.ok) {
      const err = await response.json();
      console.error("Stripe error:", err);
      return Response.json(
        { error: "Failed to create checkout session" },
        { status: 500 }
      );
    }

    const session = await response.json();
    return Response.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
