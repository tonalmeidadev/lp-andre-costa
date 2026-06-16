declare function gtag(...args: unknown[]): void;
declare function fbq(...args: unknown[]): void;

type EventName =
  | "scroll_depth"
  | "time_on_page"
  | "rage_click"
  | "page_return"
  | "click_cta"
  | "exit_intent_open"
  | "exit_intent_close"
  | "carousel_slide"
  | "accordion_open"
  | "countdown_expired"
  | "vsl_ready"
  | "vsl_first_play"
  | "vsl_progress"
  | "vsl_pause"
  | "vsl_completed";

type EventParams = {
  button_name?: string;
  location?: string;
  label?: string;
  [key: string]: unknown;
};

function getCookie(name: string): string | undefined {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
}

async function sendCapi(eventName: string, eventId: string) {
  try {
    await fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
        event_id: eventId,
        event_source_url: window.location.href,
        user_data: {
          fbc: getCookie("_fbc"),
          fbp: getCookie("_fbp"),
        },
      }),
    });
  } catch {
    // non-blocking
  }
}

export function trackEvent(name: EventName, params?: EventParams) {
  if (typeof gtag !== "undefined") {
    gtag("event", name, {
      ...params,
      transport_type: "beacon",
    });
  }

  if (name === "click_cta") {
    const eventId = `cta_${Date.now()}_${Math.random().toString(36).slice(2)}`;

    if (typeof fbq !== "undefined") {
      fbq("track", "InitiateCheckout", {}, { eventID: eventId });
    }

    sendCapi("InitiateCheckout", eventId);
  }
}
