export type TimelineEvent = {
  id: string;
  name: string;
  stripeEvent: string;
  timestamp: string;
  objectType: string;
  description: string;
  payload: Record<string, unknown>;
};

export type ProrationPreview = {
  originalPlanPrice: number;
  upgradePlanPrice: number;
  daysRemaining: number;
  cycleDays: number;
  prorationCredit: number;
  prorationCharge: number;
};

export type SimulationScenario = {
  id: string;
  title: string;
  summary: string;
  category: string;
  timeline: TimelineEvent[];
  eventLog: string[];
  proration?: ProrationPreview;
};

function formatTimestamp(dayOffset: number, time: string) {
  return `2026-03-${String(10 + dayOffset).padStart(2, "0")} ${time} UTC`;
}

function createPayload(
  type: string,
  object: Record<string, unknown>,
): Record<string, unknown> {
  return {
    id: `evt_${type.replaceAll(".", "_")}`,
    object: "event",
    api_version: "2025-10-29.clover",
    created: 1773136800,
    livemode: false,
    pending_webhooks: 1,
    type,
    data: {
      object,
    },
  };
}

export const simulationScenarios: SimulationScenario[] = [
  {
    id: "trial-first-invoice",
    title: "Trial ends and first invoice is generated",
    summary:
      "Simulates the transition from trialing to active billing when Stripe closes the trial and opens the first invoice.",
    category: "Trial lifecycle",
    eventLog: [
      "customer.subscription.updated",
      "invoice.created",
      "invoice.finalized",
      "payment_intent.created",
      "invoice.payment_succeeded",
    ],
    timeline: [
      {
        id: "trial-started",
        name: "Trial Started",
        stripeEvent: "customer.subscription.created",
        timestamp: formatTimestamp(0, "09:00"),
        objectType: "Subscription",
        description:
          "The subscription is created in trialing status with a billing cycle anchor set for the trial end date.",
        payload: createPayload("customer.subscription.created", {
          id: "sub_trial001",
          status: "trialing",
          trial_start: 1773133200,
          trial_end: 1775725200,
        }),
      },
      {
        id: "trial-ended",
        name: "Trial Ended",
        stripeEvent: "customer.subscription.updated",
        timestamp: formatTimestamp(14, "09:00"),
        objectType: "Subscription",
        description:
          "Stripe moves the subscription out of trialing and prepares the initial billing cycle.",
        payload: createPayload("customer.subscription.updated", {
          id: "sub_trial001",
          status: "active",
          trial_end: 1775725200,
          billing_cycle_anchor: 1775725200,
        }),
      },
      {
        id: "invoice-created",
        name: "Invoice Created",
        stripeEvent: "invoice.created",
        timestamp: formatTimestamp(14, "09:00"),
        objectType: "Invoice",
        description:
          "Stripe generates an invoice for the first paid period immediately after the trial ends.",
        payload: createPayload("invoice.created", {
          id: "in_trial001",
          subscription: "sub_trial001",
          status: "draft",
          amount_due: 3000,
        }),
      },
      {
        id: "payment-intent-created",
        name: "PaymentIntent Created",
        stripeEvent: "payment_intent.created",
        timestamp: formatTimestamp(14, "09:01"),
        objectType: "PaymentIntent",
        description:
          "Finalizing the invoice creates the PaymentIntent that will attempt to collect the subscription charge.",
        payload: createPayload("payment_intent.created", {
          id: "pi_trial001",
          invoice: "in_trial001",
          amount: 3000,
          status: "requires_payment_method",
        }),
      },
      {
        id: "payment-succeeded",
        name: "Payment Succeeded",
        stripeEvent: "invoice.payment_succeeded",
        timestamp: formatTimestamp(14, "09:02"),
        objectType: "Invoice",
        description:
          "Payment succeeds and the invoice transitions to paid for the new billing period.",
        payload: createPayload("invoice.payment_succeeded", {
          id: "in_trial001",
          subscription: "sub_trial001",
          status: "paid",
          amount_paid: 3000,
        }),
      },
    ],
  },
  {
    id: "upgrade-mid-cycle",
    title: "Customer upgrades plan mid-cycle (proration applied)",
    summary:
      "Shows Stripe creating proration invoice items when a subscription is upgraded before the current period ends.",
    category: "Plan change",
    eventLog: [
      "customer.subscription.updated",
      "invoiceitem.created",
      "invoice.created",
      "invoice.finalized",
      "invoice.payment_succeeded",
    ],
    proration: {
      originalPlanPrice: 3000,
      upgradePlanPrice: 9000,
      daysRemaining: 18,
      cycleDays: 30,
      prorationCredit: 1800,
      prorationCharge: 5400,
    },
    timeline: [
      {
        id: "subscription-active",
        name: "Subscription Active",
        stripeEvent: "customer.subscription.created",
        timestamp: formatTimestamp(0, "08:00"),
        objectType: "Subscription",
        description:
          "The customer starts the cycle on the starter monthly plan with automatic collection enabled.",
        payload: createPayload("customer.subscription.created", {
          id: "sub_upgrade001",
          status: "active",
          items: [{ price: { id: "price_starter", unit_amount: 3000 } }],
        }),
      },
      {
        id: "plan-upgraded",
        name: "Plan Upgraded",
        stripeEvent: "customer.subscription.updated",
        timestamp: formatTimestamp(12, "13:24"),
        objectType: "Subscription",
        description:
          "The subscription item is swapped to the growth plan and Stripe marks the change for proration.",
        payload: createPayload("customer.subscription.updated", {
          id: "sub_upgrade001",
          items: [{ price: { id: "price_growth", unit_amount: 9000 } }],
          proration_behavior: "create_prorations",
        }),
      },
      {
        id: "proration-applied",
        name: "Proration Applied",
        stripeEvent: "invoiceitem.created",
        timestamp: formatTimestamp(12, "13:24"),
        objectType: "Invoice Item",
        description:
          "Stripe creates offsetting proration invoice items for unused starter time and newly owed growth time.",
        payload: createPayload("invoiceitem.created", {
          id: "ii_proration001",
          invoice: "in_upgrade001",
          proration: true,
          amount: 3600,
        }),
      },
      {
        id: "invoice-created-upgrade",
        name: "Invoice Created",
        stripeEvent: "invoice.created",
        timestamp: formatTimestamp(12, "13:25"),
        objectType: "Invoice",
        description:
          "The proration delta is placed on an invoice that Stripe can collect immediately.",
        payload: createPayload("invoice.created", {
          id: "in_upgrade001",
          subscription: "sub_upgrade001",
          amount_due: 3600,
          status: "open",
        }),
      },
      {
        id: "upgrade-payment-succeeded",
        name: "Payment Succeeded",
        stripeEvent: "invoice.payment_succeeded",
        timestamp: formatTimestamp(12, "13:26"),
        objectType: "Invoice",
        description:
          "Stripe collects the net proration charge and the subscription continues on the upgraded plan.",
        payload: createPayload("invoice.payment_succeeded", {
          id: "in_upgrade001",
          amount_paid: 3600,
          paid: true,
        }),
      },
    ],
  },
  {
    id: "downgrade-credit-balance",
    title: "Customer downgrades plan (credit balance created)",
    summary:
      "Demonstrates a downgrade that leaves unused value on the account and applies it as customer balance for later invoices.",
    category: "Plan change",
    eventLog: [
      "customer.subscription.updated",
      "invoiceitem.created",
      "customer.balance.updated",
      "invoice.upcoming",
    ],
    timeline: [
      {
        id: "premium-active",
        name: "Premium Plan Active",
        stripeEvent: "customer.subscription.created",
        timestamp: formatTimestamp(0, "08:00"),
        objectType: "Subscription",
        description:
          "The customer begins the cycle on a higher-priced premium plan.",
        payload: createPayload("customer.subscription.created", {
          id: "sub_downgrade001",
          status: "active",
          items: [{ price: { id: "price_premium", unit_amount: 12000 } }],
        }),
      },
      {
        id: "downgrade-requested",
        name: "Subscription Updated",
        stripeEvent: "customer.subscription.updated",
        timestamp: formatTimestamp(16, "11:10"),
        objectType: "Subscription",
        description:
          "The customer is moved to the starter tier with prorations enabled for the unused premium time.",
        payload: createPayload("customer.subscription.updated", {
          id: "sub_downgrade001",
          items: [{ price: { id: "price_starter", unit_amount: 4000 } }],
        }),
      },
      {
        id: "credit-created",
        name: "Credit Balance Created",
        stripeEvent: "customer.balance.updated",
        timestamp: formatTimestamp(16, "11:11"),
        objectType: "Customer Balance",
        description:
          "Because the downgrade reduces cost for the remaining days, Stripe leaves a credit that can offset future invoices.",
        payload: createPayload("customer.balance.updated", {
          customer: "cus_001",
          balance: -4267,
          type: "applied_to_invoice",
        }),
      },
      {
        id: "upcoming-invoice",
        name: "Upcoming Invoice Adjusted",
        stripeEvent: "invoice.upcoming",
        timestamp: formatTimestamp(30, "08:00"),
        objectType: "Invoice",
        description:
          "The next invoice preview reflects the lower plan price and applies the customer balance before collection.",
        payload: createPayload("invoice.upcoming", {
          customer: "cus_001",
          starting_balance: -4267,
          amount_due: 0,
        }),
      },
    ],
  },
  {
    id: "payment-failure-dunning",
    title: "Payment fails and dunning retry schedule begins",
    summary:
      "Models a failed renewal, failed invoice collection, and the retry cadence Stripe can follow before marking the subscription unpaid or canceled.",
    category: "Collections",
    eventLog: [
      "invoice.created",
      "payment_intent.payment_failed",
      "invoice.payment_failed",
      "customer.subscription.updated",
      "invoice.updated",
    ],
    timeline: [
      {
        id: "renewal-invoice-created",
        name: "Invoice Created",
        stripeEvent: "invoice.created",
        timestamp: formatTimestamp(30, "08:00"),
        objectType: "Invoice",
        description:
          "A renewal invoice is generated at the start of the next billing period.",
        payload: createPayload("invoice.created", {
          id: "in_retry001",
          status: "open",
          amount_due: 7500,
        }),
      },
      {
        id: "payment-failed",
        name: "Invoice Payment Failed",
        stripeEvent: "invoice.payment_failed",
        timestamp: formatTimestamp(30, "08:02"),
        objectType: "Invoice",
        description:
          "The initial payment attempt fails, leaving the invoice open and the subscription past_due.",
        payload: createPayload("invoice.payment_failed", {
          id: "in_retry001",
          attempt_count: 1,
          next_payment_attempt: 1775811720,
        }),
      },
      {
        id: "retry-scheduled",
        name: "Retry Attempt Scheduled",
        stripeEvent: "invoice.updated",
        timestamp: formatTimestamp(30, "08:03"),
        objectType: "Invoice",
        description:
          "Stripe records the next collection attempt according to the configured dunning schedule.",
        payload: createPayload("invoice.updated", {
          id: "in_retry001",
          next_payment_attempt: 1775811720,
          collection_method: "charge_automatically",
        }),
      },
      {
        id: "subscription-past-due",
        name: "Subscription Updated",
        stripeEvent: "customer.subscription.updated",
        timestamp: formatTimestamp(30, "08:03"),
        objectType: "Subscription",
        description:
          "The subscription status changes to past_due while Stripe continues retrying payment.",
        payload: createPayload("customer.subscription.updated", {
          id: "sub_retry001",
          status: "past_due",
          latest_invoice: "in_retry001",
        }),
      },
      {
        id: "second-failure",
        name: "Retry Attempt Failed",
        stripeEvent: "payment_intent.payment_failed",
        timestamp: formatTimestamp(33, "08:03"),
        objectType: "PaymentIntent",
        description:
          "A later retry also fails, extending dunning until the retry rules are exhausted.",
        payload: createPayload("payment_intent.payment_failed", {
          id: "pi_retry001",
          invoice: "in_retry001",
          last_payment_error: {
            code: "card_declined",
          },
        }),
      },
    ],
  },
  {
    id: "cancel-at-period-end",
    title: "Subscription cancelled at period end",
    summary:
      "Visualizes a scheduled cancellation where access remains active through the current billing cycle and Stripe stops renewal afterward.",
    category: "Cancellation",
    eventLog: [
      "customer.subscription.updated",
      "invoice.upcoming",
      "customer.subscription.deleted",
    ],
    timeline: [
      {
        id: "cancel-scheduled",
        name: "Cancellation Scheduled",
        stripeEvent: "customer.subscription.updated",
        timestamp: formatTimestamp(9, "16:40"),
        objectType: "Subscription",
        description:
          "The subscription is marked to cancel at period end, but remains active until the current anchor date.",
        payload: createPayload("customer.subscription.updated", {
          id: "sub_cancel001",
          cancel_at_period_end: true,
          current_period_end: 1775810400,
        }),
      },
      {
        id: "final-upcoming-invoice",
        name: "Final Billing Period Continues",
        stripeEvent: "invoice.upcoming",
        timestamp: formatTimestamp(25, "09:00"),
        objectType: "Invoice",
        description:
          "Stripe keeps the subscription active during the paid period and no immediate credit or refund is created.",
        payload: createPayload("invoice.upcoming", {
          subscription: "sub_cancel001",
          auto_advance: false,
        }),
      },
      {
        id: "subscription-deleted",
        name: "Subscription Cancelled",
        stripeEvent: "customer.subscription.deleted",
        timestamp: formatTimestamp(30, "08:00"),
        objectType: "Subscription",
        description:
          "At period end, Stripe cancels the subscription and stops future invoice generation.",
        payload: createPayload("customer.subscription.deleted", {
          id: "sub_cancel001",
          status: "canceled",
          canceled_at: 1775810400,
        }),
      },
    ],
  },
];

export const defaultScenario = simulationScenarios[1];
